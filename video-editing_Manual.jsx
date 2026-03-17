

import { useState, useEffect, useRef, useMemo, useCallback } from "react";

const PARTS = [
    {
        id: "quickstart",
        num: "1",
        title: "Quick Start",
        icon: "🚀",
        sections: [
            {
                title: "Launch and Import",
                platform: "both",
                steps: [
                    "**Launch**: Find Kdenlive in your application menu or run `kdenlive` from the terminal.",
                    "**Import**: Drag and drop your downloaded videos from `~/Videos/Downloads/` into the \"Project Bin\".",
                    "**Timeline**: Drag clips from the Project Bin to the timeline at the bottom to start editing."
                ]
            }
        ]
    },
    {
        id: "workflows",
        num: "2",
        title: "Common Workflows",
        icon: "✂️",
        sections: [
            {
                title: "Trimming and Merging",
                platform: "both",
                steps: [
                    "Use the **Razor Tool** (hit `X` on your keyboard) to cut clips.",
                    "Use the **Selection Tool** (hit `S`) to move clips or delete unwanted sections.",
                    "Clips placed side-by-side on the same track will play sequentially (merged)."
                ]
            },
            {
                title: "Visual Enhancements",
                platform: "both",
                steps: [
                    "**Color Correction**: Go to the \"Effects\" tab and search for \"White Balance\", \"Brightness\", or \"Lift/Gamma/Gain\".",
                    "**Denoising**: Search for \"Hqdn3d\" or \"Denoise\" in the effects tab for cleaner visuals.",
                    "**Sharpening**: Use the \"Unsharp Mask\" effect to bring out details."
                ]
            }
        ]
    },
    {
        id: "rendering",
        num: "3",
        title: "Rendering (Output)",
        icon: "📤",
        sections: [
            {
                title: "Render Process",
                platform: "both",
                steps: [
                    "Click the **Render** button (top toolbar).",
                    "Choose a profile (e.g., **MP4 / H264/AAC** is recommended for high quality and compatibility).",
                    "Select your output path (e.g., `~/Videos/Finished_Projects/`).",
                    "Click **Render to File**."
                ]
            }
        ]
    },
    {
        id: "integration",
        num: "4",
        title: "Integration with Downloader",
        icon: "🔗",
        sections: [
            {
                title: "Metadata",
                platform: "both",
                content: "The `video-batch-dl.sh` script saves files with titles and metadata, which Kdenlive uses to help you identify clips in the Project Bin."
            }
        ]
    }
];

// FULL RENDERER LOGIC HERE
export default function VideoEditingManual() {
    // ...
}
