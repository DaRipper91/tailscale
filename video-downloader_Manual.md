# Skill Manual: Video Batch Downloader (T5)

This tool provides a reliable way to download videos in the highest possible quality from various platforms using a simple list of URLs.

## 1. Quick Start

1. Create a text file (e.g., `links.txt`) and paste your URLs, one per line.
2. Run the script:
   ```bash
   ~/ops/video-tools/video-batch-dl.sh ~/path/to/links.txt
   ```
3. Videos will be saved to `~/Videos/Downloads/` by default.

## 2. Advanced Usage

### Custom Output Directory
You can specify a custom folder as the second argument:
```bash
~/ops/video-tools/video-batch-dl.sh links.txt ~/Pictures/Videos/
```

### Script Features
- **Highest Quality**: Automatically merges the best video and audio streams.
- **Metadata**: Embeds titles, descriptions, and thumbnails into the file.
- **Cookies**: Automatically uses Firefox cookies for sites that require age verification or logins.
- **Resumption**: Safely continues interrupted downloads.

## 3. Configuration & Logic (Tier 3)
The script uses `yt-dlp` with the following core flags:
- `-f "bestvideo+bestaudio/best"`: Ensures maximum resolution.
- `--merge-output-format mp4`: Standardizes to high-compatibility MP4 container.
- `--cookies-from-browser firefox`: Handles sites like PH without manual cookie exporting.

## 4. Troubleshooting
- **Permission Denied**: Run `chmod +x ~/ops/video-tools/video-batch-dl.sh`.
- **Download Fails**: Ensure `yt-dlp` is updated (`pip install -U yt-dlp` or via system package manager).
- **Age Verification**: Open Firefox and visit the site once to ensure cookies are fresh.

## 5. Next Steps: Editing
Once your downloads are complete, refer to the [Video Editing Manual](./video-editing_Manual.md) to start trimming, merging, and enhancing your videos using **Kdenlive**.

---
*Created: 2026-02-15*
