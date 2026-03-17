# 🎮 Xbox One Dev Mode & RetroArch: The Definitive Manual (v2.0)
*Updated: February 15, 2026*

---

## 📖 Chapter 1: The Gateway - Enabling Developer Mode
**Objective:** Transition your Xbox One from a retail console to a development-ready workstation.

### Section 1.1: Partner Center Registration
- **Pre-reqs:** A Microsoft Account (MSA).
- **Steps:**
    1. Navigate to `partner.microsoft.com` on your PC.
    2. Register as an **Individual** developer. 
    3. **Cost Update:** As of mid-2025, Individual registration is **FREE**.
- **Expected Outcome:** Access to the Microsoft Partner Center dashboard.

### Section 1.2: Troubleshooting Activation (Error 0x8015DC01)
- **Problem:** The activation app hangs or returns an error.
- **Secret Fix:** Simultaneously press **LB + RB + LT + RT** on your controller while in the dashboard to force open the "Hidden Developer Settings" menu.
- **Pro-Tip:** If you are in the "Xbox Update Preview" (Insider), you MUST leave it before activation will succeed.

---

## 🎮 Chapter 2: Deployment & Performance
**Objective:** Deploying RetroArch and unlocking the full console hardware.

### Section 2.1: REST API Automation (PC Side)
- **Pre-reqs:** PC with `curl` or PowerShell.
- **Steps:**
    1. Deploy RetroArch remotely without a browser using this `curl` command:
       ```bash
       curl -X POST "https://<XBOX_IP>:11443/api/app/packagemanager/package?package=RetroArch.msixbundle" \
            -H "Content-Type: application/x-appxbundle" \
            --data-binary "@RetroArch.msixbundle" \
            --user "admin:password" --insecure
       ```
- **Expected Outcome:** Silent installation of the app from your dev environment.

### Section 2.2: Unlocking "Game Mode"
- **App Mode:** 4 shared CPU cores, 1GB RAM (Emulation will stutter).
- **Game Mode:** 6 exclusive CPU cores, 5GB RAM (Full Speed PS2/Wii).
- **Procedure:** Highlight RetroArch in Dev Home > Press **View Button** > Change "App Type" to **Game**.

---

## 💾 Chapter 3: Storage & VFS (The NTFS Fix)
**Objective:** Making your USB drive visible to RetroArch.

### Section 3.1: The Permission Script
- **Problem:** RetroArch sees the USB drive but cannot read the files.
- **Fix:** On your Windows PC, run this command in an **Admin PowerShell** (Replace `D:` with your drive letter):
  ```powershell
  icacls "D:" /grant *S-1-15-2-1:(OI)(CI)F /t /c
  ```
- **Explanation:** `S-1-15-2-1` is the SID for **ALL APPLICATION PACKAGES**. UWP apps like RetroArch cannot "see" files unless this permission is explicitly granted.

---

## 🧩 Chapter 4: BIOS Verification (MD5 Hashes)
**Objective:** Ensure your emulator cores actually boot.

### Section 4.1: Critical BIOS Hashes
Verify your files in `LocalState/system/` match these MD5s:
| System | File Name | MD5 Checksum |
| :--- | :--- | :--- |
| **Sega Saturn** | `sega_101.bin` | `85ec9ca47d8f6807718151cbcca8b964` |
| **Dreamcast** | `dc_boot.bin` | `e10c53c2f8b90bab96ead2d368858623` |
| **PS2 (Slim)** | `scph70012.bin` | `5e975586121408892795c602a83f345c` |

---
*Manual generated for daripper on Sunday, February 15, 2026. Data grounded in technical deep research.*
