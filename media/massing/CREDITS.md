# Three.js coastal presentation assets

Local rendering stack: Three.js **0.186.0** (r186), installed from the official npm package. Runtime rendering does not contact external hosts. The model uses the existing locally authored procedural placeholder geometry; it is not approved BIM or a replica of the reference site's assets.

## Implementations

- `MeshPhysicalMaterial`, `MeshStandardMaterial`, `PMREMGenerator`, ACES filmic tone mapping and real-time directional shadow mapping: https://github.com/mrdoob/three.js/tree/r186/src
- Unmodified official `HDRLoader` addon for the local photographic environment: https://github.com/mrdoob/three.js/blob/r186/examples/jsm/loaders/HDRLoader.js
- Architectural reflection panels follow the ordinary bright-mesh/PMREM environment technique used by Three.js `RoomEnvironment` (itself based on Google's model-viewer EnvironmentScene): https://github.com/mrdoob/three.js/blob/r186/examples/jsm/environments/RoomEnvironment.js . Four fixed standard-material planes are captured over the photographic HDRI for the architecture's reflection maps; no custom shader is introduced. Landscape and water keep the original coastal environment.
- Unmodified official `Water` addon, with local normal texture and application-level options: https://github.com/mrdoob/three.js/blob/r186/examples/jsm/objects/Water.js
- Water's upstream source preserves its mirror and water implementation references. The application supplies the HDR sky only while Water renders its reflection; the main stage remains transparent.

These files are provided by the Three.js project under the MIT license. The upstream license is preserved in `THREE-LICENSE.txt`. Application code imports the maintained addons instead of copying or authoring GLSL.

## Local texture

- File: `waternormals.jpg`
- Retrieved: 21 September 2026
- Source: https://raw.githubusercontent.com/mrdoob/three.js/r186/examples/textures/waternormals.jpg
- Repository source: https://github.com/mrdoob/three.js/blob/r186/examples/textures/waternormals.jpg
- Distribution license: Three.js repository MIT license, preserved alongside this file.
- SHA-256: `add9912b158a4fe9c12421745babe68c44c8af75631ac4837236cb2a03bc373f`

## Rendering limits

The environment is an offline photographic HDRI, not a live reflection of the background film. Facade glass is an opaque reflective architectural approximation and balustrades use blended transparency; neither traces interior transmission. Water uses the official planar reflection/ripple implementation. The sun and environment remain fixed in world space. Dragging, automatic rotation and damped pointer attraction rotate the model beneath them; the shadow map is rendered again each frame so cast shadows move across the rotating ground. No shadow textures or baked AO are used. Placeholder geometry still determines the architectural silhouette and level of detail.

The presentation deliberately gives the blue facade glass a polished metallic response (metalness 0.85, roughness 0.055), with champagne-metal fascia (0.96 / 0.095) and polished warm trim (1 / 0.06). Brighter base reflectance and stronger per-material HDR reflections create moving highlights through the standard physical materials. These are art-directed architectural approximations rather than measured material specifications. Sand, planting and landscape stone remain non-metallic.

The landscape is a locally authored interpretation of the supplied Aedas project renders `coastal/gallery/P3_114.jpg` (waterfront), `P3_064.jpg` (garden courtyard) and `P3_066.jpg` (planted arrival terraces). It uses a broad beach, palm promenade, planted terraces and beach seating; it is not a surveyed reconstruction. Palm and planting geometry are locally authored and add no third-party model licensing dependencies. The photographic sand is colour-calibrated in the material toward the pale waterfront reference; original texture files remain preserved. Surface normal/roughness maps are not scene-lighting or shadow bakes.

## Added CC0 environment and material sources

Retrieved 21 September 2026 from the official Poly Haven asset pages. Poly Haven assets are released under the [CC0 license](https://polyhaven.com/license); the individual pages provide the creator attribution and map provenance.

### Environment

- Local file: `secluded-beach-1k.hdr`
- Exact path: `public/media/massing/secluded-beach-1k.hdr`
- Asset: [Secluded Beach HDRI](https://polyhaven.com/a/secluded_beach), by Greg Zaal and Rico Cilliers (backplates not included)
- Direct source: `https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/secluded_beach_1k.hdr`
- Format: Radiance RGBE HDR, 1024 × 512; loaded as linear HDR data with `HDRLoader` and processed through `PMREMGenerator`.
- SHA-256: `6DABC57DC42770AC20F87402D11246098CAACC3DE9A5FEFD8444A229DBB70425`

### Sand material

- Asset: [Sand 03](https://polyhaven.com/a/sand_03), by Charlotte Baglioni
- Resolution: 2048 × 2048 JPG maps; no AO, displacement, or shadow map downloaded.
- `public/media/massing/sand-03-albedo-2k.jpg` — Poly Haven Diffuse map, use as sRGB color data; source `https://dl.polyhaven.org/file/ph-assets/Textures/jpg/2k/sand_03/sand_03_diff_2k.jpg`; SHA-256 `538453033D28A64C671B89389A6EE904184AF18D365ADB5A15D5EA9E1EB5705B`
- `public/media/massing/sand-03-normal-gl-2k.jpg` — Poly Haven Normal (GL) map, use as linear normal data; source `https://dl.polyhaven.org/file/ph-assets/Textures/jpg/2k/sand_03/sand_03_nor_gl_2k.jpg`; SHA-256 `CE870EF363010E0B96FAA47F3FAC47982CDBB40E3A59C0FE23FA64F587F54C7F`
- `public/media/massing/sand-03-roughness-2k.jpg` — Poly Haven Rough map, use as linear roughness data; source `https://dl.polyhaven.org/file/ph-assets/Textures/jpg/2k/sand_03/sand_03_rough_2k.jpg`; SHA-256 `F42030A395CF54FEE47E8D2F36C9C0D3600A61564C12F728497DA3E21B17A381`

### Neutral stone material

- Asset: [Rock 01](https://polyhaven.com/a/rock_01), by Rob Tuytel
- Resolution: 2048 × 2048 JPG maps; no AO, displacement, specular, or shadow map downloaded.
- `public/media/massing/rock-01-albedo-2k.jpg` — Poly Haven Diffuse map, use as sRGB color data; source `https://dl.polyhaven.org/file/ph-assets/Textures/jpg/2k/rock_01/rock_01_diff_2k.jpg`; SHA-256 `FE9013368539B5604602E64BFA48BEF1A2A4C452FCB6894868FB556D0B14501C`
- `public/media/massing/rock-01-normal-gl-2k.jpg` — Poly Haven Normal (GL) map, use as linear normal data; source `https://dl.polyhaven.org/file/ph-assets/Textures/jpg/2k/rock_01/rock_01_nor_gl_2k.jpg`; SHA-256 `70427A2C81F85C0E1EE4A147E273D028C3D0188BAD2583F2509D6DF9A3D55B89`
- `public/media/massing/rock-01-roughness-2k.jpg` — Poly Haven Rough map, use as linear roughness data; source `https://dl.polyhaven.org/file/ph-assets/Textures/jpg/2k/rock_01/rock_01_rough_2k.jpg`; SHA-256 `FAD2E7353B9AF032A36D394D33B23154EC7BCE3371F9E9436CF318C5F863D64D`
