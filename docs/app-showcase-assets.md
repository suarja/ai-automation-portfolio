# Mobile app showcase assets

Assets are copied into `public/apps` so the portfolio does not depend on the source repositories at runtime. Screenshots and icons were opened and checked against their named products before selection. Because `next.config.mjs` serves `next/image` sources without optimization, screenshots use pre-encoded WebP derivatives capped at 720 pixels wide, preserving the source aspect ratio. The 1024×1024 source icons are reduced to 256×256, then encoded losslessly as WebP; they render at 64–80 CSS pixels.

Screenshot conversion: `cwebp -preset text -q 90 -alpha_q 100 -m 6 -sharp_yuv -resize_mode down_only -resize 720 0 -metadata none`. The six resulting images are 720×1566 px (Presi and Bandaa) or 720×1561 px (Be Viral AI). Icon conversion: `cwebp -preset icon -lossless -exact -m 6 -resize 256 256 -metadata none`. The three resulting icons are 256×256 WebP, retaining the source transparency and artwork while reducing the served dimensions.

| Portfolio file | Source | Selection rationale |
| --- | --- | --- |
| `public/apps/presi/icon.webp` | `/Users/mata/App/26k/levels/docs/assets/presi/app-store-generator/public/app-icon.png` | Presi's current cream icon with its three-color ribbon mark, reduced to 256×256, then encoded losslessly as WebP. |
| `public/apps/presi/political-video.webp` | `/Users/mata/App/26k/levels/docs/captures/t-n-le-nom/geste-presi-3-video.png` | Shows a political speech in Presi's vertical video experience. |
| `public/apps/presi/analysis-card.webp` | `/Users/mata/App/26k/levels/docs/captures/t-n-le-nom/geste-presi-5-carte.png` | Shows a political quote with Presi's contextual analysis card. |
| `public/apps/bandaa/icon.webp` | `/Users/mata/App/26k/panoptik/docs/assets/bandaa-mobile/app-store-generator/public/app-icon.png` | Current Bandaa camera mark, reduced to 256×256, then encoded losslessly as WebP. |
| `public/apps/bandaa/guest-feed.webp` | `/Users/mata/App/26k/panoptik/docs/assets/bandaa-mobile/app-store-generator/public/screenshots/apple/iphone/en/vertical-feed.png` | Real guest photo feed from the Bandaa iPhone app. |
| `public/apps/bandaa/shared-album.webp` | `/Users/mata/App/26k/panoptik/docs/assets/bandaa-mobile/app-store-generator/public/screenshots/apple/iphone/en/book-moments.png` | Real Bandaa shared album view showing contributions from guests. |
| `public/apps/be-viral-ai/icon.webp` | `/Users/mata/App/26k/editia/mobile/assets/icons/ios-light.png` | Configured light iOS icon; `mobile/app.json` selects it for the light appearance and `ios-dark.png` for dark appearance. Reduced to 256×256, then encoded losslessly as WebP from this PNG source. |
| `public/apps/be-viral-ai/performance-coach.webp` | `/Users/mata/App/26k/editia/docs/assets/be-viral-mobile/app-store-generator/public/screenshots/fr/coach-score.png` | Real Be Viral AI video performance and coaching screen. |
| `public/apps/be-viral-ai/script-editor.webp` | `/Users/mata/App/26k/editia/docs/assets/be-viral-mobile/app-store-generator/public/screenshots/fr/script.png` | Real Be Viral AI script editor with hook and body sections. |

## Language shown in screenshots

The Presi captures show a French interface, the Bandaa captures show an English interface, and the Be Viral AI captures show a French interface. Captions and alt text are localized, but the screenshots remain in their source language. The current Be Viral AI App Store listing reports English under Languages while the selected source captures show French UI; neither screenshot language nor listing metadata is used to claim broader interface-language support.

## Store status checked for this catalog on 26 September 2026

- Presi is upcoming, with launch planned for early October 2026. It has no store links in the catalog.
- Bandaa is published. The catalog links to its [Apple App Store listing](https://apps.apple.com/us/app/bandaa-event-photo-missions/id6798290227) and [Google Play listing](https://play.google.com/store/apps/details?id=com.swarecito.bandaa).
- Be Viral AI is published with its [French Apple App Store listing](https://apps.apple.com/fr/app/be-viral-ai-analyse-contenu/id6746679101). No Google Play listing is included.

## Rejected files

- The source generator's `public/app-icon.png` and the alternative Apple artwork export are not used as the Be Viral AI portfolio icon. The source is the configured light iOS icon at `mobile/assets/icons/ios-light.png`; `mobile/app.json` selects it for the light appearance and `ios-dark.png` for dark appearance.
- The Bandaa “Creator Coach” capture is mislabeled and was not copied.
- Presi's `video-rail.png` is stale and shows a cooking app, so it was not copied.
