(function() {
  // 1. Nếu mở trong SharePoint (iframe): Cho qua ngay lập tức
  var inIframe = false;
  try {
    inIframe = (window.self !== window.top);
  } catch(e) {
    inIframe = true;
  }
  if (inIframe) return;

  var TENANT_ID = "7a69309d-b4fc-454f-a903-873fff81d501";
  var CLIENT_ID = "4ebb9b59-99e4-4521-afc2-2b04f9f0bfca";
  var ALLOWED_DOMAIN = "@cpgcorp.com.sg";
  var REDIRECT_URI = "https://cpg-portal.github.io/";

  function parseJwt(token) {
    try {
      var base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join('')));
    } catch(e) {
      return null;
    }
  }

  // 2. Xử lý Token khi Microsoft trả về
  var hash = window.location.hash;
  if (hash && hash.indexOf('id_token=') !== -1) {
    try {
      var params = new URLSearchParams(hash.substring(1));
      var token = params.get('id_token');
      var payload = parseJwt(token);
      var email = (payload.preferred_username || payload.email || payload.upn || "").toLowerCase().trim();
      var tid = payload.tid || "";
      var idp = payload.idp || "";

      var isDomainOk = email.endsWith(ALLOWED_DOMAIN);
      var isTenantOk = (tid === TENANT_ID);
      var isNotPersonal = (idp !== "live.com" && tid !== "9188040d-6c67-4c5b-b112-36a304b66dad");

      if (isDomainOk && isTenantOk && isNotPersonal) {
        sessionStorage.setItem('cpg_auth_passed', 'true');
      } else {
        sessionStorage.removeItem('cpg_auth_passed');
        alert("TRUY CẬP BỊ TỪ CHỐI!\nTài khoản '" + (email || "cá nhân") + "' không thuộc quyền truy cập. Chỉ chấp nhận tài khoản có đuôi " + ALLOWED_DOMAIN);
      }
    } catch(err) {}
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
  }

  // 3. Nếu chưa đăng nhập: Hiện khung chặn và nút đăng nhập
  if (sessionStorage.getItem('cpg_auth_passed') !== 'true') {
    var overlay = document.createElement('div');
    overlay.id = 'cpg-auth-guard';
    overlay.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;background:#0b1120;z-index:2147483647;display:flex;align-items:center;justify-content:center;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;';
    overlay.innerHTML = '<div style="background:#1e293b;border:1px solid #334155;border-radius:12px;padding:36px 28px;max-width:420px;width:90%;text-align:center;box-shadow:0 25px 50px rgba(0,0,0,0.8);">' +
      '<h2 style="color:#ffffff;font-size:22px;font-weight:700;margin:0 0 10px;">CPGV PRESENTATION</h2>' +
      '<p style="color:#94a3b8;font-size:14px;line-height:1.6;margin:0 0 24px;">Vui lòng đăng nhập bằng tài khoản Microsoft 365 tổ chức (@cpgcorp.com.sg) để mở bài trình chiếu.</p>' +
      '<button id="btn-login-cpg" type="button" style="background:#0284c7;color:#ffffff;border:none;border-radius:6px;padding:12px 20px;font-size:15px;font-weight:600;cursor:pointer;width:100%;">🔑 Đăng nhập với Microsoft</button>' +
      '</div>';

    document.addEventListener('DOMContentLoaded', function() {
      document.body.appendChild(overlay);
      var btn = document.getElementById('btn-login-cpg');
      if (btn) {
        btn.onclick = function() {
          var authUrl = "https://login.microsoftonline.com/" + TENANT_ID + "/oauth2/v2.0/authorize?" +
            "client_id=" + encodeURIComponent(CLIENT_ID) +
            "&response_type=id_token" +
            "&redirect_uri=" + encodeURIComponent(REDIRECT_URI) +
            "&scope=" + encodeURIComponent("openid profile email") +
            "&response_mode=fragment" +
            "&domain_hint=" + encodeURIComponent("cpgcorp.com.sg") +
            "&prompt=login" +
            "&nonce=" + Math.random().toString(36).substring(7);

          window.location.href = authUrl;
        };
      }
    });
  }
})();