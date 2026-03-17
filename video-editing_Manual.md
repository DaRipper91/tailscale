# Skill Manual: Video Editing with Kdenlive (T5)

Kdenlive is your primary tool for trimming, merging, and enhancing downloaded videos. It is a professional-grade editor that integrates perfectly with your KDE environment.

## 1. Quick Start

1. **Launch**: Find Kdenlive in your application menu or run `kdenlive` from the terminal.
2. **Import**: Drag and drop your downloaded videos from `~/Videos/Downloads/` into the "Project Bin".
3. **Timeline**: Drag clips from the Project Bin to the timeline at the bottom to start editing.

## 2. Common Workflows

### Trimming and Merging
- Use the **Razor Tool** (hit `X` on your keyboard) to cut clips.
- Use the **Selection Tool** (hit `S`) to move clips or delete unwanted sections.
- Clips placed side-by-side on the same track will play sequentially (merged).

### Visual Enhancements
- **Color Correction**: Go to the "Effects" tab and search for "White Balance", "Brightness", or "Lift/Gamma/Gain".
- **Denoising**: Search for "Hqdn3d" or "Denoise" in the effects tab for cleaner visuals.
- **Sharpening**: Use the "Unsharp Mask" effect to bring out details.

## 3. Rendering (Output)
1. Click the **Render** button (top toolbar).
2. Choose a profile (e.g., **MP4 / H264/AAC** is recommended for high quality and compatibility).
3. Select your output path (e.g., `~/Videos/Finished_Projects/`).
4. Click **Render to File**.

## 4. Integration with Downloader
The `video-batch-dl.sh` script saves files with titles and metadata, which Kdenlive uses to help you identify clips in the Project Bin.

---
*Created: 2026-02-15*
