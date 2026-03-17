

import { useState, useEffect, useRef, useMemo, useCallback } from "react";

const PARTS = [
  {
    id: "chapter1",
    num: "1",
    title: "The Gateway - Enabling Developer Mode",
    icon: "📖",
    sections: [
      {
        title: "Partner Center Registration",
        steps: [
          "Navigate to `partner.microsoft.com` on your PC.",
          "Register as an **Individual** developer.",
          "**Cost Update:** As of mid-2025, Individual registration is **FREE**."
        ],
        callout: { type: "info", text: "Requires a Microsoft Account (MSA)." }
      },
      {
          title: "Troubleshooting Activation (Error 0x8015DC01)",
          content: "If the activation app hangs or returns an error, simultaneously press **LB + RB + LT + RT** on your controller while in the dashboard to force open the 'Hidden Developer Settings' menu.",
          callout: { type: "warning", text: "If you are in the 'Xbox Update Preview' (Insider), you MUST leave it before activation will succeed." }
      }
    ],
  },
  {
    id: "chapter2",
    num: "2",
    title: "Deployment & Performance",
    icon: "🎮",
    sections: [
      {
        title: "REST API Automation (PC Side)",
        content: "Deploy RetroArch remotely without a browser using this `curl` command:",
        code: {
            title: "Bash",
            body: `curl -X POST "https://<XBOX_IP>:11443/api/app/packagemanager/package?package=RetroArch.msixbundle" \
     -H "Content-Type: application/x-appxbundle" \
     --data-binary "@RetroArch.msixbundle" \
     --user "admin:password" --insecure`
        }
      },
      {
          title: "Unlocking 'Game Mode'",
          content: "Highlight RetroArch in Dev Home > Press **View Button** > Change 'App Type' to **Game**.",
          table: {
              headers: ["Mode", "CPU", "RAM", "Performance"],
              rows: [
                  ["App Mode", "4 shared cores", "1GB", "Emulation will stutter"],
                  ["Game Mode", "6 exclusive cores", "5GB", "Full Speed PS2/Wii"]
              ]
          }
      }
    ],
  },
  {
      id: "chapter3",
      num: "3",
      title: "Storage & VFS (The NTFS Fix)",
      icon: "💾",
      sections: [
          {
              title: "The Permission Script",
              content: "If RetroArch sees the USB drive but cannot read the files, run this command in an **Admin PowerShell** on your Windows PC (Replace `D:` with your drive letter):",
              code: {
                  title: "PowerShell",
                  body: `icacls "D:" /grant *S-1-15-2-1:(OI)(CI)F /t /c`
              },
              callout: {type: "info", text: "`S-1-15-2-1` is the SID for **ALL APPLICATION PACKAGES**. UWP apps like RetroArch cannot 'see' files unless this permission is explicitly granted."}
          }
      ]
  },
  {
      id: "chapter4",
      num: "4",
      title: "BIOS Verification (MD5 Hashes)",
      icon: "🧩",
      sections: [
          {
              title: "Critical BIOS Hashes",
              content: "Verify your files in `LocalState/system/` match these MD5s:",
              table: {
                  headers: ["System", "File Name", "MD5 Checksum"],
                  rows: [
                      ["**Sega Saturn**", "`sega_101.bin`", "`85ec9ca47d8f6807718151cbcca8b964`"],
                      ["**Dreamcast**", "`dc_boot.bin`", "`e10c53c2f8b90bab96ead2d368858623`"],
                      ["**PS2 (Slim)**", "`scph70012.bin`", "`5e975586121408892795c602a83f345c`"]
                  ]
              }
          }
      ]
  }
];

// FULL RENDERER LOGIC HERE
export default function XboxRetroArchMasterManual() {
    // ...
}
