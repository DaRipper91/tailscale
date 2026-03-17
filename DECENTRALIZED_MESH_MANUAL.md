# THE DECENTRALIZED MESH: IMPLEMENTATION MANUAL
Version: 1.0.0
Architect: Cody Evan Johnson
Objective: Establish a secure, zero-trust synchronization mesh across x86_64, ARM64, and Android architectures using Tailscale and Syncthing.

## INDEX
1. Hardware Register & Roles
2. Network Architecture (Tailscale)
3. The Anchor Node: HP EliteDesk (CachyOS)
    - Kernel Tuning
    - Service Optimization
    - Directory Structure
    - Versioning (Syncthing & Btrfs)
4. The Mobile Controller: Pixel 9 (Android)
    - Native App Config
    - Battery & Data Policies
5. The Developer Bridge: Termux & PRoot
    - Native Shell Config
    - Virtual Container Linking
6. The Test Bench: PinePhone (SD & eMMC)
    - Hardware Limitation Configs
    - Service Throttling
7. Global Logic & Reference
    - The Master Ignore List (.stignore)
    - Network Port Grid

---

## 1. HARDWARE REGISTER & ROLES

| Device | OS | Architecture | Role | Key Constraint |
| :--- | :--- | :--- | :--- | :--- |
| **HP EliteDesk 800 G1** | CachyOS (Arch) | x86_64 (Haswell) | The Anchor: "Source of Truth" for all data. | Must handle high throughput encryption. |
| **Pixel 9 (Native)** | Android 15 | ARM64 | The Controller: Media & Notes consumption. | Cannot root. Restricted background process. |
| **Termux (Pixel)** | Android/Linux | ARM64 | The Dev Environment: CLI & Git management. | No root. Cannot bind low ports (<1024). |
| **PRoot (Termux)** | Arch Linux | Virtual | The Container: Compilation & Testing. | Shared Network Namespace with Termux. |
| **PinePhone (SD)** | Arch ARM | ARM64 | Test Node: Distro hopping/Testing. | Very slow I/O (SD Card). Low RAM. |
| **PinePhone (eMMC)** | Arch ARM | ARM64 | Mobile Driver: Daily Linux phone usage. | Limited write cycles (Flash storage). |

---

## 2. NETWORK ARCHITECTURE (TAILSCALE)

- **Topology:** Hub-and-Spoke Mesh.
- **Protocol:** WireGuard (UDP).
- **Addressing:** Static 100.x.y.z subnet.
- **General Rule:** All Syncthing traffic is forced over the Tailscale interface (`tailscale0`). Global Discovery and Relaying are disabled to prevent leakage to the public internet.

---

## 3. THE ANCHOR NODE: HP ELITEDESK (CACHYOS)

### 3.1 Kernel Tuning
**File:** `/etc/sysctl.d/99-tailscale.conf`
**Purpose:** Optimize the Haswell CPU for high-bandwidth UDP (WireGuard) traffic.

```ini
net.core.rmem_max = 2500000
net.core.wmem_max = 2500000
net.ipv4.tcp_keepalive_time = 600
```
*Apply with:* `sudo sysctl -p /etc/sysctl.d/99-tailscale.conf`

### 3.2 Service Optimization
**File:** `~/.config/systemd/user/syncthing.service.d/override.conf`
**Purpose:** Grant Syncthing high priority on the Anchor.

```ini
[Service]
Nice=-10
MemoryHigh=infinity
```

### 3.3 Directory Structure & Permissions
**Script:** `setup-anchor.sh`

```bash
#!/bin/bash
mkdir -p ~/Sync/00-Inbox     # Quick drops
mkdir -p ~/Sync/10-Code      # GitHub Repos
mkdir -p ~/Sync/20-Notes     # Obsidian
mkdir -p ~/Sync/30-Media     # Images
chmod -R 750 ~/Sync
```

### 3.4 Defense in Depth: Versioning
- **Layer A: Syncthing (User Error)**
  - *Config:* In `config.xml` for all folders.
  ```xml
  <versioning type="staggered">
      <param key="cleanInterval" value="3600" />
      <param key="maxAge" value="2592000" />
      <param key="versionsPath" value=".stversions" />
  </versioning>
  ```
- **Layer B: Btrfs Snapshots (System Failure)**
  - *Tool:* `Snapper`
  - *Install:* `sudo pacman -S snapper`
  - *Config:* `sudo snapper -c home_backup create-config /home`
  - *Retention Policy* (`/etc/snapper/configs/home_backup`):
    - `TIMELINE_LIMIT_HOURLY="5"`
    - `TIMELINE_LIMIT_DAILY="7"`
    - `TIMELINE_LIMIT_WEEKLY="0"`

---

## 4. THE MOBILE CONTROLLER: PIXEL 9 (ANDROID)

### 4.1 Native App Settings
- **App:** Syncthing-Fork (F-Droid) or Official.
- **Run Conditions:**
  - "Run on Wi-Fi": OFF (Allow mobile data via Tailscale).
  - "Run on Mobile Data": ON.
- **Battery:** Set to "Unrestricted" in Android App Settings.

### 4.2 Mapping Strategy
- `00-Inbox` -> `/storage/emulated/0/Download`
- `20-Notes` -> `/storage/emulated/0/Sync/Notes`
- `30-Media` -> `/storage/emulated/0/Pictures/Sync`
- `10-Code` -> **DO NOT MAP HERE.** (See Section 5).

---

## 5. THE DEVELOPER BRIDGE: TERMUX & PROOT

### 5.1 Termux Native Config
**File:** `~/.bashrc`
**Purpose:** Auto-start Syncthing on shell launch without root.

```bash
if ! pgrep -x "syncthing" > /dev/null; then
    echo "Starting Syncthing..."
    syncthing --no-browser --logfile=$HOME/syncthing.log &
fi
```

**File:** `~/.config/syncthing/config.xml`
**Purpose:** Shift port to avoid conflict with standard ports.

```xml
<listenAddress>tcp://127.0.0.1:22001</listenAddress>
<globalAnnounceEnabled>false</globalAnnounceEnabled>
```

### 5.2 PRoot Container Binding
**Purpose:** Share the Code folder from Termux to Arch without running a second sync instance.
**Launch Command:**

```bash
proot-distro login archlinux --bind $HOME/Sync/10-Code:/root/Code
```

---

## 6. THE TEST BENCH: PINEPHONE (SD & eMMC)

### 6.1 Resource Throttling
**File:** `~/.config/systemd/user/syncthing.service.d/lowmem.conf`
**Purpose:** Prevent UI freeze on Allwinner chips.

```ini
[Service]
Nice=10
IOSchedulingClass=3
MemoryHigh=400M
MemoryMax=700M
```

### 6.2 Network Dependency
**File:** `/etc/systemd/system/syncthing-wait.service`
**Purpose:** Ensure Tailscale is up before Syncthing starts.

```ini
[Unit]
After=tailscaled.service

[Service]
ExecStart=/usr/bin/tailscale ping -c 1 100.100.100.100
```

### 6.3 Storage Strategy
- **SD Card OS:** Disable `<fsWatcherEnabled>`. Set `<rescanIntervalS>` to `3600` (1 hour). High I/O latency.
- **eMMC OS:** Enable `<fsWatcherEnabled>`. Set `<rescanIntervalS>` to `84600` (Daily). Save write cycles.

---

## 7. GLOBAL LOGIC & REFERENCE

### 7.1 The Master Ignore List
**File:** `.stignore`
**Location:** Inside `~/Sync/10-Code/` on all devices.
**Purpose:** Prevents massive `node_modules/` or build folders from killing mobile battery.

```plaintext
# Artifacts
node_modules
target
build
dist
venv
__pycache__
.git
.svn

# OS Junk
.DS_Store
Thumbs.db
*~
*.swp
```

### 7.2 Port & IP Reference Grid

| Node | Interface | Tailscale IP | Syncthing Port | GUI Port |
| :--- | :--- | :--- | :--- | :--- |
| **HP Anchor** | `tailscale0` | `100.x.y.1` | `:22000` | `127.0.0.1:8384` |
| **Pixel (App)** | `vpn0` | `100.x.y.2` | `Dynamic` | `Local Only` |
| **Termux** | `(Shared)` | `(Shared)` | `:22001` | `127.0.0.1:8384` |
| **PinePhone** | `tailscale0` | `100.x.y.3` | `:22000` | `127.0.0.1:8384` |

### 7.3 Operational Commands
- **Check Tailscale:** `tailscale status`
- **Check Syncthing (HP):** `systemctl --user status syncthing`
- **Check Syncthing (Termux):** `pgrep -a syncthing`
- **Restore Btrfs Snapshot:** `sudo snapper -c home_backup list` -> `cp -a ...`
