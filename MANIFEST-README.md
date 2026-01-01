# Project Content Manifests

## What are manifest files?

Each project folder now contains a `manifest.json` file that lists all the media files (images, videos, PDFs, audio) available in that project. This eliminates the need for the website to make 50+ sequential HTTP requests to check if files exist.

## Performance Impact

**Before manifests:**
- Loading a project took 10+ seconds (50+ sequential file existence checks)
- Each check: 200-500ms on mobile networks
- Total: Up to 25 seconds on slow connections

**After manifests:**
- Loading a project takes <1 second (1 manifest fetch + parallel image loads)
- Single JSON file fetch: ~100-200ms
- Instant content display

## How to update manifests

When you add new images/videos/files to a project:

1. Run the manifest generator script:
   ```bash
   node generate-manifests.js
   ```

2. This will automatically update all `manifest.json` files with the new content

## Manifest structure

Each `manifest.json` contains:
```json
{
  "images": ["1.jpg", "2.jpg", ...],
  "videos": ["media1.mp4", ...],
  "pdfs": ["document.pdf", ...],
  "audio": ["audio1.mp3", ...]
}
```

## Files to upload to GitHub

Make sure to upload:
- All `manifest.json` files in each project folder
- The `content/Photography/manifest.json` file
- The `generate-manifests.js` script (for future updates)
