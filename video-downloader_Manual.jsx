
import { useState, useEffect, useRef, useMemo, useCallback } from "react";

const PARTS = [
    {
        id: "quickstart",
        num: "1",
        title: "Quick Start",
        icon: "🚀",
        sections: [
            {
                title: "Download Videos",
                platform: "both",
                steps: [
                    "Create a text file (e.g., `links.txt`) and paste your URLs, one per line.",
                    "Run the script: `~/ops/video-tools/video-batch-dl.sh ~/path/to/links.txt`",
                    "Videos will be saved to `~/Videos/Downloads/` by default."
                ]
            }
        ]
    },
    {
        id: "advanced",
        num: "2",
        title: "Advanced Usage",
        icon: "⚙️",
        sections: [
            {
                title: "Custom Output Directory",
                platform: "both",
                content: "You can specify a custom folder as the second argument:",
                code: { title: "Bash", body: "~/ops/video-tools/video-batch-dl.sh links.txt ~/Pictures/Videos/" }
            },
            {
                title: "Script Features",
                platform: "both",
                steps: [
                    "**Highest Quality**: Automatically merges the best video and audio streams.",
                    "**Metadata**: Embeds titles, descriptions, and thumbnails into the file.",
                    "**Cookies**: Automatically uses Firefox cookies for sites that require age verification or logins.",
                    "**Resumption**: Safely continues interrupted downloads."
                ]
            }
        ]
    },
    {
        id: "config",
        num: "3",
        title: "Configuration & Logic (Tier 3)",
        icon: "🔧",
        sections: [
            {
                title: "Core Flags",
                platform: "both",
                content: "The script uses `yt-dlp` with the following core flags:",
                steps: [
                    "`-f \"bestvideo+bestaudio/best\"`: Ensures maximum resolution.",
                    "`--merge-output-format mp4`: Standardizes to high-compatibility MP4 container.",
                    "`--cookies-from-browser firefox`: Handles sites like PH without manual cookie exporting."
                ]
            }
        ]
    },
    {
        id: "troubleshooting",
        num: "4",
        title: "Troubleshooting",
        icon: "🛠️",
        sections: [
            {
                title: "Common Issues",
                platform: "both",
                steps: [
                    "**Permission Denied**: Run `chmod +x ~/ops/video-tools/video-batch-dl.sh`.",
                    "**Download Fails**: Ensure `yt-dlp` is updated (`pip install -U yt-dlp` or via system package manager).",
                    "**Age Verification**: Open Firefox and visit the site once to ensure cookies are fresh."
                ]
            }
        ]
    },
    {
        id: "next-steps",
        num: "5",
        title: "Next Steps: Editing",
        icon: "✂️",
        sections: [
            {
                title: "Editing Manual",
                platform: "both",
                content: "Once your downloads are complete, refer to the [Video Editing Manual](./video-editing_Manual.md) to start trimming, merging, and enhancing your videos using **Kdenlive**."
            }
        ]
    }
];

// FULL RENDERER LOGIC HERE
export default function VideoDownloaderManual() {
    // ...
}
