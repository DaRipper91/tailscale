import { useState, useMemo, useCallback, useRef, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════
// TERMUX COMMAND REFERENCE HANDBOOK — Complete Interactive Manual
// 1,635 commands from Cody's Pixel 9 Termux environment
// Fish Shell · Android · Development · AI · System Tools
// ═══════════════════════════════════════════════════════════════

const CATEGORIES = {
  "Shell Builtins": { icon: "⚙️", color: "#22d3ee", desc: "Fish shell built-in commands — the foundation of your shell" },
  "Fish Functions": { icon: "🐟", color: "#a78bfa", desc: "Custom and default Fish shell functions" },
  "Android & Termux": { icon: "🤖", color: "#34d399", desc: "Android platform tools, Termux utilities, and device management" },
  "AI & ML Tools": { icon: "🧠", color: "#f472b6", desc: "AI agents, LLM interfaces, and machine learning utilities" },
  "Development Tools": { icon: "🔧", color: "#fb923c", desc: "Compilers, debuggers, linkers, and development utilities" },
  "Build Systems": { icon: "🏗️", color: "#fbbf24", desc: "Make, CMake, Autotools, Ninja, and build automation" },
  "Git & VCS": { icon: "📦", color: "#f87171", desc: "Git, GitHub CLI, and version control" },
  "Package Management": { icon: "📋", color: "#4ade80", desc: "apt, dpkg, npm, pnpm, and package managers" },
  "Python Ecosystem": { icon: "🐍", color: "#fde047", desc: "Python interpreters, pip, Jupyter, and Python tools" },
  "Rust Ecosystem": { icon: "🦀", color: "#fb923c", desc: "Cargo, rustc, rustfmt, and Rust toolchain" },
  "Java & JVM": { icon: "☕", color: "#a3e635", desc: "Java compiler, runtime, debugging, and JVM tools" },
  "Perl & Ruby & PHP": { icon: "💎", color: "#e879f9", desc: "Perl, Ruby, PHP interpreters and package tools" },
  "LLVM & Clang": { icon: "⚡", color: "#38bdf8", desc: "LLVM compiler infrastructure and Clang toolchain" },
  "Network & SSH": { icon: "🌐", color: "#2dd4bf", desc: "curl, wget, ssh, rsync, and network utilities" },
  "Crypto & Security": { icon: "🔐", color: "#c084fc", desc: "GPG, OpenSSL, Kerberos, hashing, and security tools" },
  "Compression & Archive": { icon: "🗜️", color: "#86efac", desc: "zip, tar, gzip, zstd, xz, and archive utilities" },
  "Graphics & Media": { icon: "🎨", color: "#fb7185", desc: "FFmpeg, ImageMagick, WebP, and media processing" },
  "Desktop & GUI": { icon: "🖥️", color: "#818cf8", desc: "XFCE, GTK, VNC, i3, and desktop environment tools" },
  "Text Processing": { icon: "📝", color: "#fca5a5", desc: "awk, sed, grep, vim, jq, and text manipulation" },
  "File Operations": { icon: "📁", color: "#bef264", desc: "ls, cp, mv, find, chmod, and filesystem tools" },
  "System Administration": { icon: "🖧", color: "#67e8f9", desc: "ps, top, kill, mount, and system management" },
  "Graphviz": { icon: "📊", color: "#d8b4fe", desc: "Graph visualization: dot, neato, fdp, and layout engines" },
  "Miscellaneous": { icon: "📎", color: "#94a3b8", desc: "Additional utilities and uncategorized tools" },
};

// ═══════════════════════════════════════════════════════════════
// COMPREHENSIVE MAN PAGE DATABASE
// Deep-dive documentation for key commands across all categories
// ═══════════════════════════════════════════════════════════════

const MAN_PAGES = {
  // ── SHELL BUILTINS ──────────────────────────────────────────
  "!": { syn: "! COMMAND", desc: "Negate the exit status of a command. Returns 0 if the command returns non-zero, and vice versa.", ex: "if ! test -f config.fish\n  echo 'Config not found'\nend", see: ["not", "and", "or"], tags: ["control flow", "logic"] },
  ":": { syn: ":", desc: "No-op command. Always returns true (exit status 0). Useful as a placeholder.", ex: "while :\n  sleep 1\nend", see: ["true"], tags: ["control flow"] },
  "abbr": { syn: "abbr [--add NAME EXPANSION]\nabbr --erase NAME\nabbr --list", desc: "Manage command abbreviations. When you type the abbreviation and press Space, it auto-expands to the full command. Persisted across sessions in Fish universal variables.", ex: "abbr --add gst 'git status'\nabbr --add gc 'git commit -m'\nabbr --add ll 'ls -la'\nabbr --list\nabbr --erase gst", see: ["alias"], tags: ["productivity", "shortcuts"] },
  "and": { syn: "COMMAND1; and COMMAND2", desc: "Execute COMMAND2 only if COMMAND1 succeeded (exit status 0). Short-circuit logical AND operator.", ex: "test -f build.gradle; and echo 'Gradle project'\ncd /data; and ls", see: ["or", "not", "!"], tags: ["control flow", "logic"] },
  "argparse": { syn: "argparse [OPTIONS] -- $argv", desc: "Parse command-line arguments in Fish functions. Supports short (-h) and long (--help) flags, required values (=), and boolean flags. Creates $_flag_NAME variables.", ex: "function deploy\n  argparse 'h/help' 'e/env=' 'v/verbose' 'f/force' -- $argv\n  or return\n  if set -q _flag_help\n    echo 'Usage: deploy [-e ENV] [-v] [-f]'\n    return 0\n  end\n  set -l environment ($_flag_env)\n  echo \"Deploying to $environment\"\nend", see: ["function", "set"], tags: ["scripting", "arguments"] },
  "begin": { syn: "begin; COMMANDS...; end", desc: "Execute a block of commands as a group. Creates a local variable scope. Useful for grouping commands for I/O redirection.", ex: "begin\n  set -l tmp (mktemp)\n  curl -sL $url > $tmp\n  jq '.data' $tmp\n  rm $tmp\nend 2>/dev/null", see: ["end", "if", "for"], tags: ["scope", "grouping"] },
  "bg": { syn: "bg [PID...]", desc: "Resume a suspended job in the background. Without arguments, resumes the most recently suspended job.", ex: "# Press Ctrl+Z to suspend a job, then:\nbg\n# Or target a specific job:\nbg %2", see: ["fg", "jobs", "disown"], tags: ["job control"] },
  "bind": { syn: "bind KEY COMMAND\nbind --erase KEY\nbind --list", desc: "Manage keyboard shortcuts in Fish shell. Bind key sequences to commands or functions. Key sequences use escape notation (\\e for Escape, \\c for Ctrl).", ex: "bind \\cf forward-char\nbind \\cb backward-char\nbind \\e\\[A up-or-search\nbind \\cg 'commandline -i (date +%Y-%m-%d)'\nbind --list | grep ctrl", see: ["fish_key_reader", "commandline"], tags: ["keybindings", "input"] },
  "break": { syn: "break", desc: "Exit the innermost for or while loop immediately, continuing execution after the loop's end.", ex: "for f in *.log\n  if test (wc -l < $f) -gt 1000\n    echo \"Large: $f\"\n    break\n  end\nend", see: ["continue", "for", "while"], tags: ["control flow", "loops"] },
  "builtin": { syn: "builtin COMMAND [ARGS...]", desc: "Execute the builtin version of a command, bypassing any function or external command with the same name.", ex: "# If you have a function named 'cd':\nbuiltin cd /home\n# Force builtin echo:\nbuiltin echo 'hello'", see: ["command", "type"], tags: ["execution", "disambiguation"] },
  "case": { syn: "switch VALUE\n  case PATTERN\n    COMMANDS\nend", desc: "Define a pattern branch inside a switch statement. Supports glob wildcards (* and ?) and multiple patterns separated by spaces.", ex: "switch $argv[1]\n  case start\n    start_service\n  case stop\n    stop_service\n  case '*.log' '*.txt'\n    process_file $argv[1]\n  case '*'\n    echo 'Unknown command'\nend", see: ["switch", "if"], tags: ["control flow", "pattern matching"] },
  "cd": { syn: "cd [DIR]", desc: "Change the current working directory. Without arguments, goes to $HOME. Use - for previous directory. Triggers any --on-variable PWD event handlers.", ex: "cd /sdcard/Download\ncd -          # previous directory\ncd ~          # home\ncd ..         # parent\ncd /data/data # Android app data", see: ["pushd", "popd", "cdh"], tags: ["navigation"] },
  "command": { syn: "command [OPTIONS] COMMAND [ARGS...]", desc: "Execute the external command version, bypassing Fish functions. Use -s to silently check if a command exists. Use -v to print the command path.", ex: "command ls -la       # bypass ls function\ncommand -sq python3  # check existence\ncommand -v git       # print path\nif command -sq ollama\n  ollama list\nend", see: ["builtin", "type", "which"], tags: ["execution"] },
  "commandline": { syn: "commandline [OPTIONS] [STRING]", desc: "Read and manipulate the current command line buffer. Used primarily in key bindings and interactive completions. Options: -r (replace), -i (insert at cursor), -f (tokenize), -C (cursor position).", ex: "# In a key binding function:\ncommandline -i '| less'\n# Get current buffer:\nset cmd (commandline)\n# Replace entire line:\ncommandline -r 'git status'", see: ["bind", "complete"], tags: ["input", "interactive"] },
  "complete": { syn: "complete -c COMMAND [OPTIONS]", desc: "Define tab-completion rules for commands. Fish's completion system supports short/long options, descriptions, dynamic completions, file type filtering, and subcommands.", ex: "complete -c myapp -s h -l help -d 'Show help'\ncomplete -c myapp -s v -l verbose -d 'Verbose'\ncomplete -c myapp -l format -xa 'json yaml toml'\ncomplete -c myapp -a '(ls *.conf)' -d 'Config'\ncomplete -c myapp -n '__fish_seen_subcommand_from deploy' \\\n  -l target -xa 'prod staging dev'", see: ["function", "argparse"], tags: ["completion", "productivity"] },
  "contains": { syn: "contains [OPTIONS] KEY VALUES...", desc: "Check if a value exists in a list. Returns 0 if found. With -i, also prints the 1-based index of the match.", ex: "if contains -- $argv[1] start stop restart\n  echo 'Valid action'\nend\nset idx (contains -i -- fish $shells)\necho \"Fish is at position $idx\"", see: ["test", "string match"], tags: ["data", "lists"] },
  "count": { syn: "count ARGS...", desc: "Print the number of arguments. Essential for counting list elements and checking argument counts in functions.", ex: "count $PATH              # PATH entry count\nset n (count $argv)\nif test (count $files) -eq 0\n  echo 'No files found'\nend", see: ["math", "string length"], tags: ["data", "counting"] },
  "echo": { syn: "echo [OPTIONS] [STRING...]", desc: "Output arguments to stdout separated by spaces, followed by a newline. Options: -n (no newline), -s (no spaces between args), -e (interpret escapes like \\t \\n).", ex: "echo 'Hello World'\necho -n 'no newline'\necho -e '\\tTabbed\\nNewline'\necho -s one two three  # onetwothree\necho $status", see: ["printf", "set_color"], tags: ["output"] },
  "eval": { syn: "eval STRING...", desc: "Execute a string as Fish commands in the current shell context. Use sparingly — direct execution is preferred. Variables and functions defined in eval persist.", ex: "set cmd 'echo hello'\neval $cmd\neval set -gx PATH $PATH /new/dir", see: ["exec", "source"], tags: ["execution", "dynamic"] },
  "exec": { syn: "exec COMMAND [ARGS...]", desc: "Replace the current shell process with the given command. Fish exits and the new command takes over the process. No return.", ex: "exec bash              # switch to bash\nexec python3 server.py # replace shell", see: ["eval", "command"], tags: ["execution", "process"] },
  "exit": { syn: "exit [STATUS]", desc: "Exit the current shell with an optional status code (default 0). In scripts, terminates the script. In interactive shells, closes the session.", ex: "exit      # success\nexit 1    # error\nexit $status  # propagate", see: ["return"], tags: ["control flow"] },
  "for": { syn: "for VAR in VALUES...\n  COMMANDS\nend", desc: "Iterate over a list of values. The loop variable is local to the for block. Supports command substitution for dynamic lists.", ex: "for pkg in git curl wget ffmpeg\n  apt install -y $pkg\nend\n\nfor f in *.apk\n  echo \"APK: $f\"\nend\n\nfor i in (seq 1 10)\n  echo \"Count: $i\"\nend", see: ["while", "break", "continue"], tags: ["control flow", "loops"] },
  "function": { syn: "function NAME [OPTIONS]\n  COMMANDS\nend", desc: "Define a named function in Fish. Key options: --description DESC, --argument-names NAMES, --on-event EVENT, --on-variable VAR, --on-signal SIG, --wraps CMD (inherits completions).", ex: "function mkcd -d 'Create and enter directory' -a dir\n  mkdir -p $dir; and cd $dir\nend\n\nfunction on_pwd_change --on-variable PWD\n  echo \"Now in: $PWD\"\nend\n\nfunction cleanup --on-event fish_exit\n  rm -f /tmp/my_temp_*\nend", see: ["functions", "funced", "funcsave", "argparse"], tags: ["scripting", "defining"] },
  "functions": { syn: "functions [OPTIONS] [NAME...]", desc: "List, describe, or erase Fish functions. Shows the complete source definition of named functions.", ex: "functions              # list all\nfunctions -n           # names only\nfunctions grep         # show 'grep' source\nfunctions -e old_func  # erase\nfunctions -D scout     # show file path", see: ["function", "type"], tags: ["introspection"] },
  "history": { syn: "history [SUBCOMMAND] [OPTIONS]", desc: "Manage command history. Subcommands: search (pattern match), delete (remove entries), merge (sync sessions), clear (wipe all). History is stored in ~/.local/share/fish/fish_history.", ex: "history search git       # find git commands\nhistory search -p 'apt'  # prefix match\nhistory delete --exact 'rm -rf /'\nhistory merge            # sync other sessions\nhistory clear", see: ["commandline"], tags: ["history", "productivity"] },
  "if": { syn: "if CONDITION\n  COMMANDS\n[else if CONDITION\n  COMMANDS]\n[else\n  COMMANDS]\nend", desc: "Conditional execution block. CONDITION is any command — the block runs if the command returns exit status 0. Chain with else if for multiple conditions.", ex: "if test -d .git\n  echo 'Git repo'\nelse if test -f Cargo.toml\n  echo 'Rust project'\nelse\n  echo 'Unknown project'\nend\n\nif command -sq ollama\n  ollama list\nend", see: ["else", "test", "switch"], tags: ["control flow", "conditionals"] },
  "math": { syn: "math [OPTIONS] EXPRESSION", desc: "Evaluate math expressions. Supports: +, -, *, /, % (modulo), ^ (power), and functions: abs, ceil, floor, round, sqrt, sin, cos, tan, log, log2, exp. Use -s for scale (decimal places).", ex: "math 2 + 2              # 4\nmath '(5 * 3) / 2'      # 7.5\nmath -s0 7 / 2           # 3 (integer)\nmath 'ceil(3.14)'        # 4\nmath 'sqrt(144)'         # 12\nmath '2^10'              # 1024", see: ["count", "test"], tags: ["arithmetic", "calculation"] },
  "not": { syn: "not COMMAND", desc: "Negate exit status. Returns 0 if command fails, 1 if it succeeds. Unlike !, can be used as a command in pipelines.", ex: "if not test -f .env\n  echo '.env missing'\nend\nnot grep -q error log.txt\nand echo 'Clean log'", see: ["and", "or", "!"], tags: ["control flow", "logic"] },
  "or": { syn: "COMMAND1; or COMMAND2", desc: "Execute COMMAND2 only if COMMAND1 failed (non-zero exit). Short-circuit logical OR.", ex: "test -f config.yaml; or echo 'Missing!'\ncommand -sq nvim; or set EDITOR vim", see: ["and", "not"], tags: ["control flow", "logic"] },
  "path": { syn: "path SUBCOMMAND [OPTIONS] [PATHS...]", desc: "Manipulate filesystem paths without spawning external commands. Subcommands: filter, basename, dirname, extension, change-extension, resolve, normalize, sort.", ex: "path filter -t file *.txt  # only files\npath extension report.tar.gz  # .gz\npath change-extension .bak file.txt\npath resolve ./relative\npath basename /usr/bin/fish  # fish\npath dirname /usr/bin/fish   # /usr/bin", see: ["string", "test"], tags: ["data", "paths"] },
  "printf": { syn: "printf FORMAT [ARGS...]", desc: "Formatted output following C printf conventions. Format specifiers: %s (string), %d (integer), %f (float), %x (hex), %o (octal). Escape sequences: \\n, \\t, \\\\.", ex: "printf '%s\\t%d\\n' 'items' 42\nprintf '%04d\\n' 7     # 0007\nprintf '%x\\n' 255     # ff\nprintf '%.2f\\n' 3.14159  # 3.14\nprintf '%20s\\n' 'right-aligned'", see: ["echo", "string"], tags: ["output", "formatting"] },
  "random": { syn: "random [START [END]]\nrandom choice ITEMS...", desc: "Generate random numbers or pick random items. Default range: 0-32767. Use 'random choice' to pick from a list.", ex: "random              # 0-32767\nrandom 1 6          # dice roll\nrandom 0 1          # coin flip\nrandom choice red green blue", see: ["math"], tags: ["utility", "random"] },
  "read": { syn: "read [OPTIONS] [VARIABLE...]", desc: "Read a line of input into variable(s). Key options: -P (prompt), -l (local scope), -s (silent/password), -d DELIM (split delimiter), -n NUM (max chars), -t SECS (timeout), -a (read into array).", ex: "read -P 'Name: ' name\nread -l -s -P 'Password: ' pass\necho 'a:b:c' | read -d : x y z\nread -n 1 -P 'Continue? [y/n] ' ans\ncat data.csv | while read -l line\n  echo $line\nend", see: ["commandline", "string split"], tags: ["input", "interactive"] },
  "set": { syn: "set [SCOPE] NAME [VALUES...]\nset -e NAME\nset -q NAME", desc: "Set, query, or erase shell variables. Scope flags: -l (local), -g (global), -U (universal/persistent), -x (export to child processes). Modifiers: -a (append), -p (prepend), --show (details).", ex: "set -gx EDITOR nvim       # global + exported\nset -l tmp (mktemp)       # local scope\nset -Ux LANG en_US.UTF-8  # universal + exported\nset -a PATH ~/.local/bin  # append to PATH\nset -p PATH /usr/local/bin  # prepend\nset -e TEMP_VAR           # erase\nif set -q DISPLAY; echo 'GUI'; end\nset --show PATH", see: ["status", "function"], tags: ["variables", "environment"] },
  "set_color": { syn: "set_color [OPTIONS] COLOR", desc: "Set terminal text color and style for subsequent echo/printf output. Colors: black, red, green, yellow, blue, magenta, cyan, white (prefix 'br' for bright). Options: --bold, --underline, --italics, --dim, -b (background).", ex: "set_color red; echo 'ERROR'; set_color normal\nset_color --bold brgreen; echo 'SUCCESS'\nset_color -b blue white; echo ' BADGE '\nset_color --underline cyan\necho 'Link text'\nset_color normal", see: ["echo", "printf"], tags: ["output", "terminal"] },
  "source": { syn: "source FILE [ARGS...]", desc: "Execute commands from a file in the current shell context. Unlike exec, the shell continues after sourcing. Variables and functions defined in the file become available.", ex: "source ~/.config/fish/env.fish\nsource secrets.fish\necho 'set x 42' | source", see: ["eval", "exec"], tags: ["execution", "loading"] },
  "status": { syn: "status [SUBCOMMAND]", desc: "Query Fish shell runtime status. Subcommands: is-interactive, is-login, is-command-substitution, filename, line-number, current-command, fish-path, features, stack-trace.", ex: "status is-interactive\nand echo 'Interactive mode'\necho (status filename)\necho (status line-number)\nstatus features  # list enabled features\nstatus stack-trace", see: ["set", "test"], tags: ["introspection", "debugging"] },
  "string": { syn: "string SUBCOMMAND [OPTIONS] [STRINGS...]", desc: "Swiss-army knife for string manipulation. Subcommands: match (-r for regex), replace (-a for all), split, join, trim, sub (substring), length, lower, upper, repeat, pad, collect, escape, unescape. Reads from stdin or arguments.", ex: "string match -r '\\d+' 'file42.txt'  # 42\nstring replace -a '/' '-' 'a/b/c'   # a-b-c\nstring split ':' 'a:b:c'            # a\\nb\\nc\nstring join ', ' a b c               # a, b, c\nstring trim '  spaces  '             # spaces\nstring lower 'HELLO'                 # hello\nstring sub -s 2 -l 3 'hello'        # ell\nstring pad -w 10 hello               #      hello\nstring length hello                  # 5", see: ["test", "math", "path"], tags: ["data", "text", "regex"] },
  "switch": { syn: "switch VALUE\n  case PATTERN\n    COMMANDS\nend", desc: "Pattern matching control structure. Each case supports glob patterns (* and ?), character classes ([abc]), and multiple patterns separated by spaces. No fallthrough between cases.", ex: "switch (uname -m)\n  case aarch64 arm64\n    echo 'ARM 64-bit'\n  case x86_64\n    echo 'x86 64-bit'\n  case '*'\n    echo 'Unknown'\nend\n\nswitch $argv[1]\n  case '*.fish'\n    source $argv[1]\n  case '*.sh'\n    bash $argv[1]\nend", see: ["case", "if"], tags: ["control flow", "pattern matching"] },
  "test": { syn: "test EXPRESSION\n[ EXPRESSION ]", desc: "Evaluate conditional expressions. File tests: -f (regular file), -d (directory), -e (exists), -r (readable), -w (writable), -x (executable), -s (non-empty), -L (symlink). String: -z (empty), -n (non-empty), = , !=. Numeric: -eq, -ne, -lt, -gt, -le, -ge. Logic: ! (not), -a (and), -o (or).", ex: "test -f ~/.config/fish/config.fish\ntest -d /data/data\ntest -n \"$TERM\"\ntest $count -gt 0\ntest -x (which fish)\n[ -s output.log ]  # non-empty file\ntest -L /usr/bin/python  # symlink", see: ["if", "string", "["], tags: ["conditionals", "file testing"] },
  "type": { syn: "type [OPTIONS] NAME...", desc: "Identify what a command name resolves to. Reports whether it's a builtin, function, or external command. Options: -t (type only), -p (path only), -a (all matches), -f (suppress function definitions).", ex: "type ls       # ls is a function\ntype -t git   # file\ntype -p python3  # /usr/bin/python3\ntype -a cd    # all definitions\ntype abbr     # abbr is a builtin", see: ["command", "builtin", "which"], tags: ["introspection", "debugging"] },
  "while": { syn: "while CONDITION\n  COMMANDS\nend", desc: "Loop while CONDITION returns 0. Commonly used with 'read' for line-by-line processing and with 'true' for infinite loops.", ex: "while read -l line\n  echo \">> $line\"\nend < input.txt\n\nset i 0\nwhile test $i -lt 10\n  echo $i\n  set i (math $i + 1)\nend\n\nwhile true\n  check_status; or break\n  sleep 5\nend", see: ["for", "break", "continue"], tags: ["control flow", "loops"] },

  // ── ANDROID & TERMUX ────────────────────────────────────────
  "adb": { syn: "adb [OPTIONS] COMMAND", desc: "Android Debug Bridge — communicate with a connected Android device or emulator. Core tool for Android development, debugging, file transfer, and shell access. In Termux, commonly used for self-connection and Shizuku.", ex: "adb devices                 # list connected\nadb shell                   # interactive shell\nadb push local.txt /sdcard/ # upload file\nadb pull /sdcard/pic.jpg .  # download file\nadb install app.apk         # install APK\nadb logcat                  # live system log\nadb shell pm list packages  # all packages\nadb shell settings get global development_settings_enabled", see: ["fastboot", "logcat", "rish"], tags: ["android", "debugging", "device"] },
  "fastboot": { syn: "fastboot [OPTIONS] COMMAND", desc: "Flash firmware images and manage Android bootloader state. Device must be in fastboot/bootloader mode. Essential for flashing factory images, custom recoveries, and boot images.", ex: "fastboot devices               # list devices\nfastboot flash boot boot.img   # flash boot\nfastboot flash system system.img\nfastboot reboot                # reboot device\nfastboot oem unlock            # unlock bootloader\nfastboot getvar all            # device info\nfastboot boot recovery.img     # temp boot image", see: ["adb", "avbtool", "mkbootimg"], tags: ["android", "firmware", "bootloader"] },
  "logcat": { syn: "logcat [OPTIONS] [FILTERSPECS...]", desc: "Display the Android system log in real-time. Filter by tag, priority (V/D/I/W/E/F), PID, or regex. Essential for debugging Android apps and system issues.", ex: "logcat                           # full log stream\nlogcat -s 'MyApp:D'              # tag filter\nlogcat *:W                       # warnings+ only\nlogcat --pid=1234                # specific process\nlogcat -d > log.txt              # dump and exit\nlogcat -c                        # clear log buffer\nlogcat -v time *:E               # errors with timestamps\nlogcat | grep -i 'crash'", see: ["adb"], tags: ["android", "debugging", "logging"] },
  "rish": { syn: "rish [COMMAND]", desc: "Shizuku remote shell — execute commands with elevated privileges (shell UID) without root. Requires Shizuku app running. Bridges the gap between unprivileged Termux and root access on non-rooted devices.", ex: "rish                            # interactive shell\nrish -c 'pm grant com.app android.permission.READ_LOGS'\nrish -c 'settings put global ...' \nrish -c 'dumpsys battery'\nrish -c 'appops set com.app RUN_IN_BACKGROUND allow'", see: ["adb", "shizuku", "pm", "am"], tags: ["android", "privilege", "shizuku"] },
  "shizuku": { syn: "shizuku", desc: "Shizuku service management for Termux. Provides elevated API access without root via a local binder service. Foundation for rish and many Android automation tools.", ex: "# Start Shizuku (usually via app)\n# Then in Termux:\nrish  # connects through Shizuku", see: ["rish", "adb"], tags: ["android", "privilege"] },
  "am": { syn: "am [SUBCOMMAND] [OPTIONS]", desc: "Android Activity Manager — start activities, services, send broadcasts, and manage app components from the command line.", ex: "am start -n com.app/.MainActivity\nam start -a android.intent.action.VIEW -d https://url\nam broadcast -a android.intent.action.BOOT_COMPLETED\nam force-stop com.app\nam startservice com.app/.MyService\nam kill-all", see: ["pm", "settings", "adb"], tags: ["android", "intent", "activity"] },
  "pm": { syn: "pm [SUBCOMMAND] [OPTIONS]", desc: "Android Package Manager — install, uninstall, query, and manage app packages. List permissions, clear data, enable/disable components.", ex: "pm list packages                    # all packages\npm list packages -3                 # third-party only\npm list packages | grep google\npm install /sdcard/app.apk\npm uninstall com.bloatware.app\npm clear com.app                    # clear app data\npm grant com.app android.permission.CAMERA\npm disable-user --user 0 com.bloat  # disable", see: ["am", "settings", "adb"], tags: ["android", "packages", "management"] },
  "settings": { syn: "settings [get|put|delete|list] [system|secure|global] KEY [VALUE]", desc: "Read and write Android system settings. Three namespaces: system (user prefs), secure (security-related), global (device-wide). Requires appropriate permissions (Shizuku/rish for many).", ex: "settings get global airplane_mode_on\nsettings put system screen_brightness 128\nsettings put global development_settings_enabled 1\nsettings put secure enabled_notification_listeners ...\nsettings list global | grep adb\nsettings delete global my_custom_key", see: ["am", "pm", "rish"], tags: ["android", "configuration"] },
  "getprop": { syn: "getprop [PROPERTY]", desc: "Read Android system properties. Without args, lists all properties. Properties include build info, hardware details, and runtime configuration.", ex: "getprop                            # list all\ngetprop ro.build.version.release   # Android version\ngetprop ro.product.model           # device model\ngetprop ro.hardware.chipname       # SoC name\ngetprop persist.sys.timezone\ngetprop dalvik.vm.heapsize", see: ["settings"], tags: ["android", "system info"] },
  "termux-setup-storage": { syn: "termux-setup-storage", desc: "Set up access to Android shared storage directories from Termux. Creates symlinks in ~/storage/ pointing to /sdcard/Download, DCIM, Music, etc. Must grant storage permission first.", ex: "termux-setup-storage\n# Creates:\n# ~/storage/shared    → /sdcard\n# ~/storage/downloads → /sdcard/Download\n# ~/storage/dcim      → /sdcard/DCIM\n# ~/storage/music     → /sdcard/Music\n# ~/storage/movies    → /sdcard/Movies", see: ["termux-open", "termux-share"], tags: ["termux", "storage", "setup"] },
  "termux-notification": { syn: "termux-notification [OPTIONS]", desc: "Create Android notifications from Termux. Supports title, content, actions (button callbacks), vibration, LED, sound, ongoing/persistent, and notification channels.", ex: "termux-notification -t 'Build Done' -c 'Project compiled'\ntermux-notification --title 'Alert' \\\n  --content 'Disk space low' \\\n  --vibrate 200,100,200 \\\n  --priority max \\\n  --led-color ff0000\ntermux-notification --ongoing -t 'Server' -c 'Running on :8080'", see: ["termux-toast", "termux-vibrate"], tags: ["termux", "notification", "android"] },
  "termux-clipboard-set": { syn: "termux-clipboard-set [TEXT]", desc: "Copy text to the Android system clipboard. Reads from stdin if no argument given.", ex: "echo 'copied text' | termux-clipboard-set\ntermux-clipboard-set 'Hello from Termux'\ncat file.txt | termux-clipboard-set\npwd | termux-clipboard-set", see: ["termux-clipboard-get"], tags: ["termux", "clipboard"] },
  "termux-clipboard-get": { syn: "termux-clipboard-get", desc: "Read the current contents of the Android system clipboard to stdout.", ex: "termux-clipboard-get\nset clip (termux-clipboard-get)\ntermux-clipboard-get | jq .  # if JSON", see: ["termux-clipboard-set"], tags: ["termux", "clipboard"] },
  "termux-open": { syn: "termux-open [OPTIONS] PATH_OR_URL", desc: "Open a file or URL with the appropriate Android app. Uses Android's intent system to find the right handler.", ex: "termux-open https://github.com\ntermux-open photo.jpg\ntermux-open document.pdf\ntermux-open --send file.txt  # share intent\ntermux-open --chooser file.apk", see: ["termux-share", "xdg-open"], tags: ["termux", "android", "intents"] },
  "termux-toast": { syn: "termux-toast [OPTIONS] [TEXT]", desc: "Show an Android toast message (brief overlay notification). Options for position, background color, and text color.", ex: "termux-toast 'Build complete!'\ntermux-toast -b white -c black 'Hello'\ntermux-toast -g top 'Alert'\necho 'message' | termux-toast", see: ["termux-notification"], tags: ["termux", "ui"] },
  "termux-battery-status": { syn: "termux-battery-status", desc: "Get current battery information as JSON: level, status (charging/discharging), temperature, and health.", ex: "termux-battery-status\n# Output: {\"health\":\"GOOD\",\"percentage\":87,\n#  \"plugged\":\"UNPLUGGED\",\"status\":\"DISCHARGING\",\n#  \"temperature\":28.5}\ntermux-battery-status | jq '.percentage'", see: ["termux-wifi-connectioninfo"], tags: ["termux", "device info"] },
  "termux-wake-lock": { syn: "termux-wake-lock", desc: "Acquire a wake lock to prevent the device from sleeping. Essential for long-running tasks in Termux (builds, servers, downloads).", ex: "termux-wake-lock\n# ... long running task ...\ntermux-wake-unlock", see: ["termux-wake-unlock"], tags: ["termux", "power"] },
  "proot": { syn: "proot [OPTIONS] [COMMAND]", desc: "Run programs in a virtual chroot environment without root. Translates filesystem paths and system calls. Used by proot-distro to run full Linux distributions in Termux.", ex: "proot -0 -w /root -b /dev -b /proc ls /\nproot --link2symlink bash", see: ["proot-distro"], tags: ["termux", "container", "linux"] },
  "proot-distro": { syn: "proot-distro [COMMAND] [DISTRO]", desc: "Manage proot-based Linux distributions in Termux. Install, login to, and manage full Linux distros (Arch, Ubuntu, Debian, Fedora, etc.) running inside proot containers.", ex: "proot-distro list                  # available distros\nproot-distro install archlinux      # install Arch\nproot-distro login archlinux        # enter distro\nproot-distro login archlinux -- pacman -Syu\nproot-distro backup archlinux       # backup\nproot-distro remove debian          # remove distro\nproot-distro reset archlinux        # factory reset", see: ["proot"], tags: ["termux", "linux", "container"] },
  "aapt2": { syn: "aapt2 [compile|link|dump|...] [OPTIONS]", desc: "Android Asset Packaging Tool 2 — compile and link Android resources. Used in the Android build pipeline to process XML resources, generate R.java, and package APKs.", ex: "aapt2 compile -o compiled/ res/values/strings.xml\naapt2 link -o output.apk -I android.jar compiled/\naapt2 dump badging app.apk  # APK info\naapt2 dump permissions app.apk", see: ["aapt", "apksigner", "zipalign"], tags: ["android", "build", "resources"] },
  "apksigner": { syn: "apksigner [sign|verify] [OPTIONS] APK", desc: "Sign and verify Android APK files. Part of the Android SDK build tools. Required for installing APKs on devices.", ex: "apksigner sign --ks release.jks --out signed.apk unsigned.apk\napksigner verify --verbose signed.apk\napksigner verify --print-certs app.apk", see: ["zipalign", "aapt2"], tags: ["android", "signing", "security"] },
  "zipalign": { syn: "zipalign [-v] ALIGNMENT INPUT.apk OUTPUT.apk", desc: "Optimize APK file alignment for better runtime performance. Should be run BEFORE signing with apksigner.", ex: "zipalign -v 4 unaligned.apk aligned.apk\nzipalign -c -v 4 app.apk  # check alignment", see: ["apksigner", "aapt2"], tags: ["android", "optimization"] },
  "mkbootimg": { syn: "mkbootimg [OPTIONS]", desc: "Create Android boot images from kernel, ramdisk, and DTB components. Used for custom kernel flashing and recovery image creation.", ex: "mkbootimg --kernel Image \\\n  --ramdisk ramdisk.cpio.gz \\\n  --dtb dtb.img \\\n  --cmdline 'console=ttyMSM0' \\\n  --base 0x00000000 \\\n  --os_version 14.0.0 \\\n  --os_patch_level 2024-01 \\\n  -o boot.img", see: ["unpack_bootimg", "repack_bootimg", "avbtool"], tags: ["android", "kernel", "boot"] },
  "avbtool": { syn: "avbtool [COMMAND] [OPTIONS]", desc: "Android Verified Boot tool — manage AVB metadata, vbmeta images, and boot verification. Critical for signed boot chain operations.", ex: "avbtool info_image --image vbmeta.img\navbtool verify_image --image boot.img\navbtool extract_public_key --key rsa4096.pem --output pub.bin\navbtool make_vbmeta_image --output vbmeta.img \\\n  --chain_partition boot:1:pub.bin", see: ["mkbootimg", "fastboot"], tags: ["android", "security", "boot"] },

  // ── AI & ML TOOLS ───────────────────────────────────────────
  "ollama": { syn: "ollama [COMMAND] [OPTIONS]", desc: "Run large language models locally. Manage model downloads, run inference, serve an API endpoint. Supports Llama, Mistral, Phi, Gemma, and many open models. Runs as a systemd daemon on CachyOS.", ex: "ollama list                     # installed models\nollama pull llama3.2            # download model\nollama run llama3.2             # interactive chat\nollama run mistral 'Explain TCP'\nollama serve                    # start API server\nollama show llama3.2            # model details\nollama rm old-model             # remove\nollama cp llama3.2 my-custom    # copy/rename\ncurl localhost:11434/api/generate -d '{\n  \"model\": \"llama3.2\",\n  \"prompt\": \"Hello\"\n}'", see: ["aichat", "litellm"], tags: ["ai", "llm", "local", "inference"] },
  "aichat": { syn: "aichat [OPTIONS] [TEXT]", desc: "AI-powered chat CLI supporting multiple backends (OpenAI, Claude, Ollama, etc.). Supports roles, sessions, streaming, and function calling.", ex: "aichat 'Explain monads'\naichat -m ollama:llama3.2 'Hello'\naichat --role coder 'write fizzbuzz'\naichat -s        # start session\naichat -l        # list sessions", see: ["ollama", "openai"], tags: ["ai", "chat", "cli"] },
  "gemini": { syn: "gemini [OPTIONS] [PROMPT]", desc: "Google Gemini CLI — interact with Gemini models from the terminal. Supports multimodal input, file analysis, and code generation. Installed via npm globally.", ex: "gemini 'Explain this error'\ngemini -f image.png 'Describe this'\ngemini --model gemini-2.5-pro 'Optimize this code'", see: ["ollama", "aichat", "copilot"], tags: ["ai", "google", "cli"] },
  "copilot": { syn: "copilot [SUBCOMMAND]", desc: "GitHub Copilot CLI — AI-powered command suggestions and explanations. Translates natural language to shell commands.", ex: "copilot suggest 'find large files'\ncopilot explain 'find / -name \"*.log\" -mtime +30 -delete'", see: ["gh", "gemini", "aichat"], tags: ["ai", "github", "cli"] },
  "openai": { syn: "openai [OPTIONS]", desc: "OpenAI CLI tool for interacting with GPT models, DALL-E, and other OpenAI APIs from the terminal.", ex: "openai api chat_completions.create \\\n  -m gpt-4 \\\n  -g user 'Hello!'", see: ["aichat", "ollama"], tags: ["ai", "openai", "api"] },
  "litellm": { syn: "litellm [OPTIONS]", desc: "LiteLLM — unified API proxy for 100+ LLM providers. Route requests to OpenAI, Anthropic, Ollama, and more through a single interface.", ex: "litellm --model ollama/llama3.2\nlitellm --config config.yaml\nlitellm-proxy --port 8000", see: ["ollama", "aichat"], tags: ["ai", "proxy", "api"] },

  // ── GIT & VCS ───────────────────────────────────────────────
  "git": { syn: "git [OPTIONS] COMMAND [ARGS]", desc: "Distributed version control system. The foundational tool for source code management, collaboration, and project history.", ex: "git init\ngit clone https://github.com/user/repo.git\ngit add -A\ngit commit -m 'feat: add feature'\ngit push origin main\ngit pull --rebase\ngit log --oneline --graph -20\ngit branch feature/new-thing\ngit checkout -b fix/bug-123\ngit stash; git stash pop\ngit diff --staged\ngit rebase -i HEAD~5\ngit cherry-pick abc123", see: ["gh", "scalar"], tags: ["vcs", "collaboration"] },
  "gh": { syn: "gh [COMMAND] [SUBCOMMAND] [OPTIONS]", desc: "GitHub CLI — manage repos, PRs, issues, releases, and workflows from the terminal. Authenticate with gh auth login.", ex: "gh auth login\ngh repo clone user/repo\ngh pr create --fill\ngh pr list\ngh pr checkout 42\ngh issue create -t 'Bug' -b 'Details'\ngh release create v1.0.0\ngh workflow run build.yml\ngh repo view --web\ngh api /user", see: ["git", "copilot"], tags: ["github", "cli", "collaboration"] },

  // ── NETWORK & SSH ───────────────────────────────────────────
  "curl": { syn: "curl [OPTIONS] URL", desc: "Transfer data to/from servers. Supports HTTP(S), FTP, SFTP, SCP, and many more protocols. The Swiss army knife of network requests.", ex: "curl https://api.github.com/user\ncurl -o file.zip https://example.com/file.zip\ncurl -X POST -H 'Content-Type: application/json' \\\n  -d '{\"key\":\"value\"}' https://api.example.com\ncurl -sL https://raw.githubusercontent.com/user/repo/main/install.sh | bash\ncurl -I https://example.com  # headers only\ncurl -u user:pass https://api.example.com\ncurl --upload-file data.json https://api.example.com", see: ["wget", "httpx"], tags: ["network", "http", "api"] },
  "wget": { syn: "wget [OPTIONS] URL", desc: "Non-interactive network downloader. Best for recursive downloads, mirroring sites, and resumable transfers.", ex: "wget https://example.com/file.tar.gz\nwget -c file.tar.gz  # resume download\nwget -r -np https://site.com/docs/  # recursive\nwget -i urls.txt     # download from list\nwget --mirror https://site.com\nwget -q -O - https://api.example.com | jq .", see: ["curl", "yt-dlp"], tags: ["network", "download"] },
  "ssh": { syn: "ssh [OPTIONS] [USER@]HOST [COMMAND]", desc: "Secure Shell — encrypted remote login and command execution. Supports tunneling, key auth, agent forwarding, and config files.", ex: "ssh user@host.com\nssh -i ~/.ssh/key user@host\nssh -p 2222 user@host\nssh -L 8080:localhost:80 user@host  # tunnel\nssh -D 1080 user@host              # SOCKS proxy\nssh -t user@host 'tmux attach'\nssh-keygen -t ed25519 -C 'termux'", see: ["scp", "sftp", "rsync"], tags: ["network", "remote", "security"] },
  "rsync": { syn: "rsync [OPTIONS] SRC DEST", desc: "Fast, versatile remote (and local) file copying tool. Only transfers differences between source and destination. Supports compression, SSH transport, and partial transfers.", ex: "rsync -avz src/ dest/\nrsync -avz -e ssh local/ user@host:remote/\nrsync -avz --delete src/ dest/  # mirror\nrsync -avzP large.iso user@host:  # progress\nrsync --exclude='node_modules' src/ dest/", see: ["scp", "rclone"], tags: ["network", "sync", "backup"] },
  "rclone": { syn: "rclone [COMMAND] [OPTIONS] SOURCE DEST", desc: "Cloud storage Swiss army knife. Sync files to/from Google Drive, S3, OneDrive, Dropbox, SFTP, and 40+ storage backends.", ex: "rclone config              # setup wizard\nrclone ls gdrive:          # list files\nrclone copy file.txt gdrive:backup/\nrclone sync local/ gdrive:backup/\nrclone mount gdrive: ~/gdrive --daemon\nrclone serve webdav gdrive:", see: ["rsync", "syncthing"], tags: ["cloud", "storage", "sync"] },
  "yt-dlp": { syn: "yt-dlp [OPTIONS] URL", desc: "Download videos and audio from YouTube and 1000+ sites. Fork of youtube-dl with active development and many improvements.", ex: "yt-dlp 'https://youtube.com/watch?v=ID'\nyt-dlp -x --audio-format mp3 URL  # audio only\nyt-dlp -f 'bestvideo+bestaudio' URL\nyt-dlp --list-formats URL\nyt-dlp -o '%(title)s.%(ext)s' URL\nyt-dlp --sponsorblock-remove all URL\nyt-dlp --playlist-items 1-5 PLAYLIST_URL", see: ["ffmpeg", "curl"], tags: ["download", "media", "video"] },

  // ── TEXT PROCESSING ─────────────────────────────────────────
  "jq": { syn: "jq [OPTIONS] FILTER [FILE]", desc: "Command-line JSON processor. Parse, filter, transform, and construct JSON data. Essential for working with APIs and config files.", ex: "cat data.json | jq '.'\necho '{\"a\":1}' | jq '.a'          # 1\ncurl -s api.com | jq '.data[]'\njq '.[] | select(.age > 30)' data.json\njq -r '.name' data.json           # raw strings\njq '.items | length' data.json    # count\njq '{name: .first, age}' data.json  # reshape\njq -s '.' file1.json file2.json   # merge array\njq '.[] | .key = \"new\"' data.json  # update", see: ["sed", "awk"], tags: ["json", "data", "parsing"] },
  "sed": { syn: "sed [OPTIONS] SCRIPT [FILE]", desc: "Stream editor for filtering and transforming text. Applies editing commands to each line of input. Non-interactive batch text processing.", ex: "sed 's/old/new/' file.txt          # first per line\nsed 's/old/new/g' file.txt         # all occurrences\nsed -i 's/foo/bar/g' file.txt      # in-place edit\nsed -n '5,10p' file.txt            # lines 5-10\nsed '/pattern/d' file.txt          # delete matching\nsed '3a\\new line' file.txt         # insert after line 3\nsed -E 's/([0-9]+)/[\\1]/g' file   # regex groups", see: ["awk", "grep", "tr"], tags: ["text", "editing", "regex"] },
  "awk": { syn: "awk [OPTIONS] 'PROGRAM' [FILE...]", desc: "Pattern scanning and text processing language. Processes input line-by-line, splitting fields automatically. Powerful for columnar data, statistics, and report generation.", ex: "awk '{print $1}' file.txt          # first column\nawk -F: '{print $1, $3}' /etc/passwd\nawk '/error/ {count++} END {print count}' log\nawk '{sum+=$2} END {print sum/NR}' data  # average\nawk 'NR==5,NR==10' file.txt        # lines 5-10\nawk '{printf \"%-20s %s\\n\", $1, $2}' data\nawk '!seen[$0]++' file.txt         # unique lines", see: ["sed", "grep", "cut"], tags: ["text", "columns", "data"] },
  "grep": { syn: "grep [OPTIONS] PATTERN [FILE...]", desc: "Search text for pattern matches. Supports basic regex, extended regex (-E), Perl regex (-P), fixed strings (-F). Returns matching lines.", ex: "grep 'error' log.txt\ngrep -r 'TODO' src/                 # recursive\ngrep -i 'warning' *.log            # case-insensitive\ngrep -c 'pattern' file              # count matches\ngrep -l 'import' *.py              # filenames only\ngrep -n 'function' script.fish     # line numbers\ngrep -v '^#' config.txt            # exclude comments\ngrep -E '\\b[0-9]{1,3}(\\.[0-9]{1,3}){3}\\b' log  # IPs\ngrep -A 3 -B 1 'ERROR' log.txt    # context lines", see: ["sed", "awk", "find"], tags: ["search", "regex", "text"] },
  "vim": { syn: "vim [OPTIONS] [FILE...]", desc: "Vi IMproved — powerful modal text editor. Modes: Normal (navigation/commands), Insert (typing), Visual (selection), Command (:). Extensible with plugins and vimscript.", ex: "vim file.txt\nvim +42 file.txt        # open at line 42\nvim -d file1 file2      # diff mode\nvim -p *.py             # tabs\nvim -o *.conf           # split horizontal\nvim -R file.txt         # read-only\n# Inside vim:\n# i → insert mode\n# :w → save  :q → quit  :wq → save+quit\n# /pattern → search  n/N → next/prev\n# dd → delete line  yy → copy line  p → paste", see: ["vi", "nano"], tags: ["editor", "text"] },
  "tmux": { syn: "tmux [COMMAND] [OPTIONS]", desc: "Terminal multiplexer — run multiple terminal sessions in one window. Sessions persist when disconnected. Essential for remote work and Termux multitasking.", ex: "tmux                        # new session\ntmux new -s work            # named session\ntmux attach -t work         # reattach\ntmux ls                     # list sessions\ntmux kill-session -t work\n# Inside tmux (Ctrl+b prefix):\n# c → new window  n/p → next/prev\n# \" → split horizontal  % → split vertical\n# d → detach  [ → scroll mode\n# , → rename window", see: ["zellij"], tags: ["terminal", "multiplexer", "session"] },
  "pandoc": { syn: "pandoc [OPTIONS] INPUT -o OUTPUT", desc: "Universal document converter. Converts between Markdown, HTML, LaTeX, DOCX, PDF, EPUB, and dozens of other formats.", ex: "pandoc README.md -o readme.html\npandoc doc.md -o doc.pdf\npandoc doc.md -o doc.docx\npandoc input.docx -t markdown -o output.md\npandoc --list-input-formats\npandoc --list-output-formats\npandoc -f gfm -t html5 --standalone doc.md -o doc.html", see: ["tidy", "markdown-it"], tags: ["document", "conversion"] },

  // ── PACKAGE MANAGEMENT ──────────────────────────────────────
  "apt": { syn: "apt [COMMAND] [PACKAGE...]", desc: "Advanced Package Tool — install, remove, update, and manage Debian/Termux packages. Front-end to dpkg with dependency resolution.", ex: "apt update                  # refresh package lists\napt upgrade                 # upgrade all packages\napt install git curl        # install packages\napt remove package-name     # remove\napt autoremove              # clean unused deps\napt search keyword          # find packages\napt show package            # package info\napt list --installed        # all installed\napt list --upgradable", see: ["apt-get", "dpkg", "nala", "pkg"], tags: ["packages", "install"] },
  "pkg": { syn: "pkg [COMMAND] [PACKAGE...]", desc: "Termux package manager — wrapper around apt optimized for Termux. The primary way to install software in Termux.", ex: "pkg update\npkg upgrade\npkg install python nodejs rust\npkg uninstall package\npkg search editor\npkg show neovim\npkg list-installed\npkg files package  # list package files", see: ["apt", "dpkg"], tags: ["termux", "packages"] },
  "npm": { syn: "npm [COMMAND] [ARGS]", desc: "Node.js package manager. Install, manage, and publish JavaScript packages. Global installs go to ~/.npm-global in Termux.", ex: "npm install package         # local\nnpm install -g package      # global\nnpm init -y                 # new project\nnpm run build               # run script\nnpm list -g --depth=0       # global packages\nnpm update                  # update all\nnpm audit                   # security check\nnpm search keyword\nnpm uninstall -g package", see: ["npx", "pnpm", "node"], tags: ["nodejs", "packages", "javascript"] },
  "pnpm": { syn: "pnpm [COMMAND] [ARGS]", desc: "Fast, disk-efficient Node.js package manager. Content-addressable storage means packages are stored once on disk and hard-linked into projects.", ex: "pnpm install\npnpm add react\npnpm add -D typescript      # dev dependency\npnpm run build\npnpm -g add package         # global\npnpm store prune            # clean store\npnpm update --latest", see: ["npm", "npx"], tags: ["nodejs", "packages"] },

  // ── PYTHON ──────────────────────────────────────────────────
  "python3": { syn: "python3 [OPTIONS] [FILE] [ARGS]", desc: "Python 3 interpreter. Execute scripts, start interactive REPL, or run one-liners. The standard scripting language for data science, automation, and development.", ex: "python3 script.py\npython3 -c \"print('hello')\"\npython3 -m http.server 8080     # quick web server\npython3 -m venv .venv           # virtual env\npython3 -i script.py            # interactive after run\npython3 -m json.tool data.json  # pretty-print JSON\npython3 -m pip install package", see: ["pip", "ipython", "jupyter"], tags: ["python", "scripting", "repl"] },
  "pip": { syn: "pip [COMMAND] [OPTIONS] [PACKAGES]", desc: "Python package installer. Install packages from PyPI. In Termux, always use --break-system-packages flag.", ex: "pip install requests --break-system-packages\npip install -r requirements.txt --break-system-packages\npip list                         # installed\npip show package                 # info\npip uninstall package\npip install --upgrade package\npip freeze > requirements.txt", see: ["python3"], tags: ["python", "packages"] },
  "ipython": { syn: "ipython [OPTIONS]", desc: "Enhanced interactive Python shell with syntax highlighting, auto-completion, magic commands, and rich output.", ex: "ipython\n# Inside ipython:\n# %timeit expression    # benchmark\n# %run script.py        # run file\n# %paste                # paste code block\n# %history              # command history\n# ?object               # help\n# !shell_command        # run shell", see: ["python3", "jupyter"], tags: ["python", "repl", "interactive"] },

  // ── COMPRESSION ─────────────────────────────────────────────
  "tar": { syn: "tar [OPTIONS] [FILE...]", desc: "Archive utility — create, extract, and manage tar archives. Supports gzip, bzip2, xz, and zstd compression transparently.", ex: "tar czf archive.tar.gz dir/       # create gzip\ntar xzf archive.tar.gz            # extract gzip\ntar cjf archive.tar.bz2 dir/      # create bzip2\ntar xjf archive.tar.bz2\ntar cJf archive.tar.xz dir/       # create xz\ntar xJf archive.tar.xz\ntar tf archive.tar.gz             # list contents\ntar czf backup.tar.gz --exclude='node_modules' .", see: ["gzip", "bzip2", "xz", "zstd"], tags: ["archive", "compression"] },
  "zstd": { syn: "zstd [OPTIONS] [FILE...]", desc: "Zstandard compression. Very fast compression and decompression with excellent ratios. Supports levels 1-19 (and --ultra up to 22).", ex: "zstd file.txt                  # compress → file.txt.zst\nzstd -d file.txt.zst           # decompress\nzstd -19 file.txt              # max compression\nzstd --rm file.txt             # remove source\nzstd -T0 file.txt              # use all cores\ntar cf - dir/ | zstd > archive.tar.zst", see: ["gzip", "xz", "lz4"], tags: ["compression", "fast"] },

  // ── GRAPHICS & MEDIA ────────────────────────────────────────
  "ffmpeg": { syn: "ffmpeg [OPTIONS] -i INPUT [OPTIONS] OUTPUT", desc: "The ultimate multimedia processing tool. Convert, record, stream, and manipulate audio/video. Supports virtually every format.", ex: "ffmpeg -i input.mp4 output.webm\nffmpeg -i video.mp4 -vn audio.mp3      # extract audio\nffmpeg -i input.mp4 -ss 00:01:00 -t 30 clip.mp4  # trim\nffmpeg -i input.mp4 -vf scale=1280:720 output.mp4\nffmpeg -i input.mp4 -c:v libx265 -crf 28 compressed.mp4\nffmpeg -i input.mp4 -r 1 frames/%04d.png  # extract frames\nffmpeg -f concat -i list.txt -c copy merged.mp4", see: ["ffprobe", "yt-dlp"], tags: ["media", "video", "audio", "conversion"] },
  "ffprobe": { syn: "ffprobe [OPTIONS] FILE", desc: "Multimedia stream analyzer. Get detailed information about audio, video, and container formats without processing.", ex: "ffprobe video.mp4\nffprobe -v quiet -print_format json -show_streams video.mp4\nffprobe -show_entries format=duration video.mp4\nffprobe -show_entries stream=codec_name,width,height video.mp4", see: ["ffmpeg"], tags: ["media", "analysis"] },
  "magick": { syn: "magick [COMMAND] [OPTIONS] INPUT OUTPUT", desc: "ImageMagick 7 command-line tool. Create, edit, compose, and convert images. Supports 200+ formats.", ex: "magick input.png -resize 800x600 output.jpg\nmagick input.png -quality 80 output.jpg\nmagick -size 100x100 xc:red square.png\nmagick input.png -rotate 90 rotated.png\nmagick composite overlay.png base.png result.png\nmagick input.png -colorspace Gray gray.png\nmagick identify image.png  # dimensions, format", see: ["convert", "identify"], tags: ["images", "conversion", "editing"] },

  // ── FILE OPERATIONS ─────────────────────────────────────────
  "find": { syn: "find [PATH] [EXPRESSION]", desc: "Search for files in a directory hierarchy. Supports name patterns, type filters, size, time, permissions, and executing commands on results.", ex: "find . -name '*.py'\nfind /sdcard -name '*.apk' -size +10M\nfind . -type f -mtime -7        # modified last week\nfind . -name '*.log' -delete\nfind . -type f -exec chmod 644 {} \\;\nfind . -empty -type d           # empty dirs\nfind . -name 'node_modules' -prune -o -name '*.js' -print\nfind . -newer reference.txt", see: ["ls", "tree", "fd"], tags: ["search", "files"] },
  "tree": { syn: "tree [OPTIONS] [DIR]", desc: "Display directory structure as an indented tree. Useful for visualizing project layouts and documenting file structures.", ex: "tree\ntree -L 2               # max depth 2\ntree -I 'node_modules|.git'  # exclude patterns\ntree -a                 # show hidden\ntree -d                 # directories only\ntree -h                 # human-readable sizes\ntree --gitignore        # respect .gitignore\ntree -J                 # JSON output", see: ["find", "ls"], tags: ["files", "visualization"] },
  "lsd": { syn: "lsd [OPTIONS] [PATH...]", desc: "LSDeluxe — modern replacement for ls with colors, icons, and tree view. Rust-based, fast, and visually rich.", ex: "lsd\nlsd -la\nlsd --tree --depth 2\nlsd -lS                 # sort by size\nlsd --icon always\nlsd --group-dirs first\nlsd --total-size        # directory sizes", see: ["ls", "tree"], tags: ["files", "listing", "modern"] },

  // ── SYSTEM ──────────────────────────────────────────────────
  "top": { syn: "top [OPTIONS]", desc: "Real-time system monitor showing process activity, CPU usage, memory consumption, and system load.", ex: "top\ntop -o %MEM             # sort by memory\ntop -p 1234             # specific PID\ntop -n 1 -b             # batch mode (one snapshot)", see: ["ps", "free", "vmstat"], tags: ["monitoring", "processes"] },
  "ps": { syn: "ps [OPTIONS]", desc: "Report a snapshot of current processes. Shows PID, TTY, CPU time, and command for running processes.", ex: "ps aux                  # all processes\nps -ef                  # full format\nps aux | grep python\nps -o pid,ppid,cmd,%mem,%cpu\nps --forest             # process tree", see: ["top", "kill", "pgrep"], tags: ["processes", "monitoring"] },
  "kill": { syn: "kill [SIGNAL] PID...", desc: "Send signals to processes. Default signal is SIGTERM (15). Use -9 for SIGKILL (force kill), -HUP for reload.", ex: "kill 1234               # graceful terminate\nkill -9 1234            # force kill\nkill -HUP 1234          # reload config\nkill -STOP 1234         # suspend\nkill -CONT 1234         # resume\nkill -l                 # list all signals", see: ["killall", "pkill", "ps"], tags: ["processes", "signals"] },

  // ── RUST ────────────────────────────────────────────────────
  "cargo": { syn: "cargo [COMMAND] [OPTIONS]", desc: "Rust package manager and build tool. Manages dependencies, builds projects, runs tests, and publishes crates.", ex: "cargo new my-project\ncargo build\ncargo build --release\ncargo run\ncargo test\ncargo add serde\ncargo update\ncargo fmt\ncargo clippy  # lint\ncargo doc --open\ncargo install ripgrep", see: ["rustc", "rustfmt", "clippy-driver"], tags: ["rust", "build", "packages"] },
  "rustc": { syn: "rustc [OPTIONS] INPUT", desc: "The Rust compiler. Usually invoked through Cargo, but can compile individual .rs files directly.", ex: "rustc main.rs\nrustc -O main.rs        # optimized\nrustc --edition 2021 main.rs\nrustc --explain E0308   # explain error code", see: ["cargo"], tags: ["rust", "compiler"] },

  // ── BUILD SYSTEMS ───────────────────────────────────────────
  "make": { syn: "make [OPTIONS] [TARGET]", desc: "Build automation tool. Reads Makefile rules to compile, link, and build projects. The classic Unix build system.", ex: "make\nmake -j$(nproc)         # parallel build\nmake install\nmake clean\nmake DESTDIR=/usr/local install\nmake -n                 # dry run\nmake -B                 # force rebuild all", see: ["cmake", "ninja"], tags: ["build", "automation"] },
  "cmake": { syn: "cmake [OPTIONS] SOURCE_DIR", desc: "Cross-platform build system generator. Generates Makefiles, Ninja files, or IDE project files from CMakeLists.txt.", ex: "cmake -B build -G Ninja\ncmake --build build\ncmake --build build --target install\ncmake -B build -DCMAKE_BUILD_TYPE=Release\ncmake -B build -DCMAKE_INSTALL_PREFIX=/usr/local", see: ["make", "ninja", "ctest", "cpack"], tags: ["build", "cross-platform"] },
  "ninja": { syn: "ninja [OPTIONS] [TARGET...]", desc: "Small, fast build system focused on speed. Designed to have its input files generated by a higher-level build system (CMake, Meson).", ex: "ninja\nninja -j 8              # 8 parallel jobs\nninja clean\nninja -v                # verbose commands\nninja -n                # dry run\nninja -t targets        # list all targets", see: ["cmake", "make"], tags: ["build", "fast"] },

  // ── DESKTOP & GUI ───────────────────────────────────────────
  "startxfce4": { syn: "startxfce4", desc: "Launch the XFCE4 desktop environment. In Termux/proot, typically used with VNC for a full Linux desktop experience.", ex: "# Start VNC server first:\nvncserver :1\n# Then in the VNC session:\nstartxfce4", see: ["xfce4-session", "vncserver"], tags: ["desktop", "xfce", "gui"] },
  "vncserver": { syn: "vncserver [:DISPLAY] [OPTIONS]", desc: "Start a TigerVNC server providing remote desktop access. Creates a virtual X display for running GUI applications.", ex: "vncserver :1\nvncserver :1 -geometry 1920x1080\nvncserver -kill :1      # stop server\nvncserver -list         # list sessions\nvncpasswd               # set password", see: ["Xvnc", "startxfce4"], tags: ["vnc", "remote", "display"] },

  // ── CRYPTO ──────────────────────────────────────────────────
  "gpg": { syn: "gpg [OPTIONS] [FILES]", desc: "GNU Privacy Guard — encrypt, decrypt, sign, and verify files and messages. Manage PGP keys for secure communication.", ex: "gpg --gen-key                       # create key pair\ngpg --list-keys\ngpg -e -r recipient file.txt        # encrypt\ngpg -d file.txt.gpg                 # decrypt\ngpg --sign file.txt                 # sign\ngpg --verify file.txt.sig           # verify\ngpg --export -a 'Name' > pub.asc    # export public\ngpg --import key.asc                # import key", see: ["openssl", "ssh-keygen"], tags: ["encryption", "signing", "keys"] },
  "openssl": { syn: "openssl COMMAND [OPTIONS]", desc: "Cryptographic toolkit. Generate keys, certificates, hashes, encrypt/decrypt files, test TLS connections. The foundation of internet security.", ex: "openssl genrsa -out key.pem 4096    # RSA key\nopenssl req -new -x509 -key key.pem -out cert.pem\nopenssl s_client -connect host:443   # TLS test\nopenssl dgst -sha256 file.bin        # hash\nopenssl enc -aes-256-cbc -in plain -out encrypted\nopenssl rand -hex 32                 # random bytes\nopenssl x509 -in cert.pem -text      # inspect cert", see: ["gpg", "ssh-keygen"], tags: ["tls", "certificates", "encryption"] },

  // ── JAVA & JVM ──────────────────────────────────────────────
  "java": { syn: "java [OPTIONS] CLASS [ARGS]\njava [OPTIONS] -jar FILE [ARGS]", desc: "Java runtime — execute Java applications and JAR files. Manages JVM memory, classpath, and runtime options.", ex: "java -jar app.jar\njava -cp classes/ com.example.Main\njava -Xmx512m -jar server.jar\njava --version\njava -XX:+PrintFlagsFinal  # all JVM flags", see: ["javac", "jar"], tags: ["java", "runtime"] },
  "javac": { syn: "javac [OPTIONS] SOURCE_FILES", desc: "Java compiler — compile .java source files to .class bytecode files.", ex: "javac Main.java\njavac -d out/ src/*.java\njavac -cp lib/* src/Main.java\njavac --release 17 Main.java", see: ["java", "jar"], tags: ["java", "compiler"] },

  // ── STARSHIP & SHELL CUSTOMIZATION ──────────────────────────
  "starship": { syn: "starship [COMMAND]", desc: "Cross-shell prompt customizer. Fast, minimal, and infinitely customizable. Written in Rust. Configured via starship.toml.", ex: "starship init fish | source  # add to config.fish\nstarship preset nerd-font-symbols  # apply preset\nstarship explain             # show current config\nstarship module git_status   # test single module\nstarship timings             # module render times", see: ["fish_prompt"], tags: ["shell", "prompt", "customization"] },
  "fastfetch": { syn: "fastfetch [OPTIONS]", desc: "Fast system information tool (neofetch replacement). Shows OS, kernel, CPU, GPU, memory, and more with ASCII art. Written in C for speed.", ex: "fastfetch\nfastfetch --logo none\nfastfetch --structure Title:OS:Kernel:CPU:Memory:Disk\nfastfetch -c /path/to/config.jsonc", see: ["uname", "lscpu"], tags: ["system info", "display"] },
  "zellij": { syn: "zellij [OPTIONS] [COMMAND]", desc: "Modern terminal multiplexer with a user-friendly interface. Supports tabs, panes, floating windows, and session management. Written in Rust.", ex: "zellij\nzellij -s session-name       # named session\nzellij attach session-name\nzellij list-sessions\nzellij -l compact            # minimal UI\n# Inside: Alt+n (new pane), Alt+[ (move), Ctrl+p (pane mode)", see: ["tmux"], tags: ["terminal", "multiplexer", "modern"] },
};

// Build command list from PDF data
const ALL_COMMANDS = [
  // Shell Builtins
  ...["!", ":", "[", "_", "abbr", "and", "argparse", "begin", "bg", "bind", "block", "break", "breakpoint", "builtin", "case", "cd", "command", "commandline", "complete", "contains", "continue", "count", "disown", "echo", "else", "emit", "end", "eval", "exec", "exit", "false", "fg", "fish_indent", "fish_key_reader", "for", "function", "functions", "history", "if", "jobs", "math", "not", "or", "path", "printf", "pwd", "random", "read", "realpath", "return", "set", "set_color", "source", "status", "string", "switch", "test", "time", "true", "type", "ulimit", "wait", "while"].map(n => ({ name: n, type: "builtin", category: "Shell Builtins" })),
  // Fish Functions
  ...["N_", "ai_auto_repo", "alias", "ascan", "cdh", "claude", "contains_seq", "crawl", "da-arch", "daily_report", "diff", "dirh", "dirs", "disable_transience", "dl-batch", "down-or-search", "edit_command_buffer", "enable_transience", "export", "fish_add_path", "fish_breakpoint_prompt", "fish_clipboard_copy", "fish_clipboard_paste", "fish_command_not_found", "fish_commandline_append", "fish_commandline_prepend", "fish_config", "fish_default_key_bindings", "fish_default_mode_prompt", "fish_delta", "fish_fossil_prompt", "fish_git_prompt", "fish_greeting", "fish_hg_prompt", "fish_hybrid_key_bindings", "fish_in_macos_terminal", "fish_is_root_user", "fish_jj_prompt", "fish_job_summary", "fish_mode_prompt", "fish_opt", "fish_postexec", "fish_print_git_action", "fish_print_hg_root", "fish_prompt", "fish_right_prompt", "fish_sigtrap_handler", "fish_status_to_signal", "fish_svn_prompt", "fish_title", "fish_update_completions", "fish_vcs_prompt", "fish_vi_cursor", "fish_vi_key_bindings", "funced", "funcsave", "g", "gemini-cli-termux", "gemini-non-int", "gfind", "gpull", "gpush", "grep", "gswitch", "help", "isatty", "kde", "kill", "killx", "la", "ll", "ls", "man", "mount_gdrive", "nextd", "nextd-or-forward-token", "open", "pickle", "popd", "prevd", "prevd-or-backward-token", "prompt_hostname", "prompt_login", "prompt_pwd", "psub", "pushd", "research", "scout", "scout-tui", "seq", "setenv", "sparkle_burst", "suspend", "trap", "umask", "unmount_gdrive", "up-or-search", "vared", "xfce"].map(n => ({ name: n, type: "function", category: "Fish Functions" })),
  // AI & ML
  ...["ollama", "aichat", "gemini", "copilot", "openai", "litellm", "tiny-agents"].map(n => ({ name: n, type: "external", category: "AI & ML Tools" })),
  // Git & VCS
  ...["git", "git-clang-format", "git-cvsserver", "git-receive-pack", "git-shell", "git-upload-archive", "git-upload-pack", "gh", "scalar"].map(n => ({ name: n, type: "external", category: "Git & VCS" })),
  // Android & Termux
  ...["adb", "am", "apksigner", "aapt", "aapt2", "avbtool", "append2simg", "d8", "dalvikvm", "e2fsdroid", "ext2simg", "fastboot", "getprop", "img2simg", "logcat", "lpadd", "lpdump", "lpflash", "lpmake", "lpunpack", "make_f2fs", "mkbootimg", "mkdtboimg", "mke2fs.android", "pm", "proot", "proot-distro", "r8", "repack_bootimg", "rish", "settings", "shizuku", "simg2img", "sload_f2fs", "unpack_bootimg", "virgl_test_server_android", "zipalign",
    "termux-am", "termux-am-socket", "termux-api-start", "termux-api-stop", "termux-apps-info-app-version-name", "termux-audio-info", "termux-backup", "termux-battery-status", "termux-brightness", "termux-call-log", "termux-camera-info", "termux-camera-photo", "termux-change-repo", "termux-chroot", "termux-clipboard-get", "termux-clipboard-set", "termux-contact-list", "termux-dialog", "termux-download", "termux-fingerprint", "termux-fix-shebang", "termux-info", "termux-infrared-frequencies", "termux-infrared-transmit", "termux-job-scheduler", "termux-keystore", "termux-location", "termux-media-player", "termux-media-scan", "termux-microphone-record", "termux-nfc", "termux-notification", "termux-notification-channel", "termux-notification-list", "termux-notification-remove", "termux-open", "termux-open-url", "termux-reload-settings", "termux-reset", "termux-restore", "termux-saf-create", "termux-saf-dirs", "termux-saf-ls", "termux-saf-managedir", "termux-saf-mkdir", "termux-saf-read", "termux-saf-rm", "termux-saf-stat", "termux-saf-write", "termux-sensor", "termux-setup-package-manager", "termux-setup-storage", "termux-share", "termux-sms-inbox", "termux-sms-list", "termux-sms-send", "termux-speech-to-text", "termux-storage-get", "termux-telephony-call", "termux-telephony-cellinfo", "termux-telephony-deviceinfo", "termux-toast", "termux-torch", "termux-tts-engines", "termux-tts-speak", "termux-usb", "termux-vibrate", "termux-volume", "termux-wake-lock", "termux-wake-unlock", "termux-wallpaper", "termux-wifi-connectioninfo", "termux-wifi-enable", "termux-wifi-scaninfo", "termux-x11", "termux-x11-preference"
  ].map(n => ({ name: n, type: "external", category: "Android & Termux" })),
  // Network
  ...["curl", "wget", "ssh", "scp", "sftp", "rsync", "rclone", "syncthing", "yt-dlp", "httpx", "wcurl", "whois", "drill", "gdown", "ftp", "tftp", "telnet", "netstat", "ifconfig", "arp", "route", "ping", "ping6", "hostname", "dnsdomainname", "ipmaddr", "iptunnel", "mii-tool", "slattach", "rarp", "nameif", "plipconfig"].map(n => ({ name: n, type: "external", category: "Network & SSH" })),
  // Text Processing
  ...["awk", "gawk", "sed", "grep", "egrep", "fgrep", "tr", "cut", "sort", "uniq", "wc", "head", "tail", "tac", "rev", "nl", "fold", "fmt", "pr", "column", "colrm", "col", "expand", "unexpand", "paste", "join", "comm", "diff3", "sdiff", "patch", "ed", "red", "ex", "vi", "vim", "vimdiff", "nano", "less", "more", "cat", "jq", "pandoc", "tidy", "html2text", "dos2unix", "unix2dos", "mac2unix", "unix2mac", "markdown-it", "markdown2", "aspell", "hunspell", "enchant-2", "mandoc", "demandoc", "soelim", "pandoc-server"].map(n => ({ name: n, type: "external", category: "Text Processing" })),
  // File Operations
  ...["find", "tree", "lsd", "ls", "cp", "mv", "rm", "mkdir", "rmdir", "ln", "chmod", "chown", "chgrp", "touch", "stat", "file", "du", "df", "dd", "install", "mkfifo", "mknod", "shred", "link", "unlink", "readlink", "basename", "dirname", "mktemp", "namei", "flock", "hardlink", "lsof", "fadvise", "fincore", "fallocate", "truncate"].map(n => ({ name: n, type: "external", category: "File Operations" })),
  // System Admin
  ...["ps", "top", "kill", "killall", "pgrep", "pkill", "nice", "renice", "ionice", "taskset", "timeout", "nohup", "free", "uptime", "uname", "whoami", "id", "groups", "su", "sudo", "chroot", "env", "printenv", "date", "cal", "sleep", "yes", "tty", "stty", "reset", "clear", "tput", "dmesg", "sysctl", "lscpu", "vmstat", "watch", "script", "logger", "login", "passwd", "chsh", "fakeroot", "nsenter", "unshare"].map(n => ({ name: n, type: "external", category: "System Administration" })),
  // Package Management
  ...["apt", "apt-get", "apt-cache", "apt-config", "apt-key", "apt-mark", "dpkg", "dpkg-deb", "dpkg-query", "dpkg-divert", "dpkg-split", "dpkg-trigger", "dpkg-buildapi", "dpkg-buildtree", "dpkg-fsys-usrunmess", "dpkg-realpath", "nala", "pkg", "npm", "npx", "pnpm", "pnpx", "node"].map(n => ({ name: n, type: "external", category: "Package Management" })),
  // Python
  ...["python3", "python", "python-config", "python3-config", "python3.13", "python3.13-config", "pip", "pip3", "pip3.13", "ipython", "ipython3", "jupyter", "jupyter-kernel", "jupyter-kernelspec", "jupyter-migrate", "jupyter-run", "jupyter-troubleshoot", "f2py", "pydoc", "pydoc3", "pydoc3.13", "pytest", "py.test", "py3clean", "py3compile", "debugpy", "debugpy-adapter", "pyftmerge", "pyftsubset", "pygmentize", "pyrsa-decrypt", "pyrsa-encrypt", "pyrsa-keygen", "pyrsa-priv2pub", "pyrsa-sign", "pyrsa-verify", "nltk", "numpy-config", "tqdm", "setuptools-scm"].map(n => ({ name: n, type: "external", category: "Python Ecosystem" })),
  // Rust
  ...["cargo", "cargo-clippy", "cargo-fmt", "rustc", "rustdoc", "rustfmt", "clippy-driver", "rust-gdb", "rust-gdbgui", "rust-lld", "rust-lldb"].map(n => ({ name: n, type: "external", category: "Rust Ecosystem" })),
  // Build Systems
  ...["make", "cmake", "ctest", "cpack", "ninja", "autoconf", "autoheader", "autom4te", "automake", "automake-1.18", "autoreconf", "autoscan", "autoupdate", "aclocal", "aclocal-1.18", "bison", "yacc", "flex", "flex++", "m4", "gperf", "libtool", "libtoolize", "ifnames"].map(n => ({ name: n, type: "external", category: "Build Systems" })),
  // Java
  ...["java", "javac", "javadoc", "javap", "jar", "jarsigner", "keytool", "jcmd", "jconsole", "jdb", "jdeprscan", "jdeps", "jfr", "jhsdb", "jimage", "jinfo", "jlink", "jmap", "jmod", "jpackage", "jps", "jrunscript", "jshell", "jstack", "jstat", "jstatd", "jwebserver", "rmiregistry", "serialver", "ecj", "ecj-24"].map(n => ({ name: n, type: "external", category: "Java & JVM" })),
  // Graphics/Media
  ...["ffmpeg", "ffprobe", "magick", "magick-script", "convert", "identify", "composite", "mogrify", "montage", "display", "conjure", "stream", "animate", "compare", "import", "rsvg-convert", "cwebp", "dwebp", "gif2webp", "img2webp", "webpinfo", "webpmux", "webpng", "avifenc", "avifdec", "avifgainmaputil", "SvtAv1EncApp", "dav1d", "dec265", "jbig2dec", "vmaf", "rubberband", "rubberband-r3", "figlet", "figlist", "showfigfonts", "toilet"].map(n => ({ name: n, type: "external", category: "Graphics & Media" })),
  // Compression
  ...["tar", "gzip", "gunzip", "zcat", "bzip2", "bunzip2", "bzcat", "xz", "unxz", "xzcat", "lz4", "unlz4", "lz4cat", "zstd", "unzstd", "zstdcat", "zstdmt", "lzip", "lzop", "lzma", "unlzma", "lzmadec", "lzmainfo", "brotli", "zip", "unzip", "funzip", "unzipsfx", "7z", "7za", "arj", "cpio", "bsdtar", "bsdcpio", "bsdcat", "bsdunzip", "patool"].map(n => ({ name: n, type: "external", category: "Compression & Archive" })),
  // Crypto
  ...["gpg", "gpg2", "gpg-agent", "gpg-card", "gpg-connect-agent", "gpg-error", "gpg-mail-tube", "gpg-wks-client", "gpgconf", "gpgparsemail", "gpgsm", "gpgsplit", "gpgtar", "gpgv", "openssl", "ssh-keygen", "ssh-keyscan", "ssh-agent", "ssh-add", "ssh-copy-id", "pinentry", "pinentry-curses", "pinentry-tty", "secret-tool", "gnome-keyring", "gnome-keyring-3", "gnome-keyring-daemon", "kbxutil", "dirmngr", "dirmngr-client", "watchgnupg", "hmac256", "p11-kit", "trust", "sha1sum", "sha224sum", "sha256sum", "sha384sum", "sha512sum", "md5sum", "b2sum", "rhash", "cksum", "xxhsum", "xxh128sum", "xxh32sum", "xxh3sum", "xxh64sum", "shasum"].map(n => ({ name: n, type: "external", category: "Crypto & Security" })),
  // Desktop
  ...["startxfce4", "xfce4-session", "xfce4-panel", "xfce4-terminal", "xfce4-about", "xfce4-settings-manager", "xfce4-settings-editor", "xfce4-appearance-settings", "xfce4-display-settings", "xfce4-keyboard-settings", "xfce4-mouse-settings", "xfce4-accessibility-settings", "xfce4-session-settings", "xfce4-session-logout", "xfce4-notifyd-config", "xfce4-mime-settings", "xfce4-mime-helper", "xfce4-find-cursor", "xfce4-kiosk-query", "xfce4-popup-applicationsmenu", "xfce4-popup-directorymenu", "xfce4-popup-windowmenu", "xfwm4", "xfwm4-settings", "xfwm4-tweaks-settings", "xfwm4-workspace-settings", "xfdesktop", "xfdesktop-settings", "xfconf-query", "xfsettingsd", "xflock4", "Thunar", "thunar", "thunar-settings", "Xvnc", "vncserver", "vncconfig", "vncpasswd", "x0vncserver", "i3", "i3bar", "i3status", "i3-config-wizard", "i3-dmenu-desktop", "i3-dump-log", "i3-input", "i3-msg", "i3-nagbar", "i3-save-tree", "i3-sensible-editor", "i3-sensible-pager", "i3-sensible-terminal", "i3-with-shmlog", "i3-migrate-config-to-v4", "zenity", "notify-send", "dconf", "gsettings", "xdg-open", "starship", "fastfetch", "tmux", "zellij", "dialog"].map(n => ({ name: n, type: "external", category: "Desktop & GUI" })),
  // Graphviz
  ...["dot", "neato", "fdp", "sfdp", "twopi", "circo", "osage", "patchwork", "acyclic", "bcomps", "ccomps", "cluster", "dijkstra", "gc", "gml2gv", "graphml2gv", "gv2gml", "gv2gxl", "gvcolor", "gvgen", "gvmap", "gvmap.sh", "gvpack", "gvpack_static", "gvpr", "gvpr_static", "gxl2dot", "gxl2gv", "mm2gv", "nop", "prune", "sccmap", "tred", "unflatten", "edgepaint", "delaunay", "dot2gxl", "dot_sandbox", "dot_static", "diffimg", "xtractprotos"].map(n => ({ name: n, type: "external", category: "Graphviz" })),
].filter((cmd, idx, arr) => arr.findIndex(c => c.name === cmd.name) === idx);

// ═══════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════

const TypeBadge = ({ type }) => {
  const styles = {
    builtin: { bg: "#1e3a5f", color: "#22d3ee", label: "BUILTIN" },
    function: { bg: "#3b1f5e", color: "#a78bfa", label: "FUNCTION" },
    external: { bg: "#1a3329", color: "#34d399", label: "EXTERNAL" },
  };
  const s = styles[type] || styles.external;
  return (
    <span style={{ background: s.bg, color: s.color, padding: "2px 8px", borderRadius: 4, fontSize: 10, fontWeight: 700, letterSpacing: "0.05em", fontFamily: "monospace" }}>
      {s.label}
    </span>
  );
};

const ManPage = ({ cmd, onClose, onNavigate }) => {
  const data = MAN_PAGES[cmd.name];
  if (!data) {
    return (
      <div style={{ padding: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <button onClick={onClose} style={{ background: "#1e293b", border: "1px solid #334155", color: "#94a3b8", padding: "6px 14px", borderRadius: 6, cursor: "pointer", fontSize: 13 }}>← Back</button>
          <h2 style={{ margin: 0, fontFamily: "'JetBrains Mono', 'Fira Code', monospace", color: "#f1f5f9", fontSize: 22 }}>{cmd.name}</h2>
          <TypeBadge type={cmd.type} />
        </div>
        <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 8, padding: 24 }}>
          <p style={{ color: "#94a3b8", fontFamily: "monospace", fontSize: 14, margin: 0 }}>
            {cmd.type === "builtin" ? "Fish shell builtin command." : cmd.type === "function" ? "Fish shell function. Use `functions " + cmd.name + "` to view source." : "External command / executable. Use `man " + cmd.name + "` or `" + cmd.name + " --help` for full documentation."}
          </p>
          <div style={{ marginTop: 16, padding: 12, background: "#020617", borderRadius: 6, fontFamily: "monospace", fontSize: 13 }}>
            <span style={{ color: "#475569" }}>$ </span>
            <span style={{ color: "#e2e8f0" }}>
              {cmd.type === "function" ? `functions ${cmd.name}` : cmd.type === "builtin" ? `help ${cmd.name}` : `${cmd.name} --help`}
            </span>
          </div>
          <p style={{ color: "#64748b", fontSize: 12, marginTop: 16, fontStyle: "italic" }}>
            Category: {cmd.category}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "24px 32px", maxWidth: 820 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <button onClick={onClose} style={{ background: "#1e293b", border: "1px solid #334155", color: "#94a3b8", padding: "6px 14px", borderRadius: 6, cursor: "pointer", fontSize: 13, transition: "all 0.15s" }} onMouseOver={e => e.target.style.borderColor = "#22d3ee"} onMouseOut={e => e.target.style.borderColor = "#334155"}>← Back</button>
        <TypeBadge type={cmd.type} />
        <span style={{ color: "#475569", fontFamily: "monospace", fontSize: 12 }}>{cmd.category}</span>
      </div>
      
      <h1 style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace", color: "#f1f5f9", fontSize: 28, margin: "16px 0 8px", letterSpacing: "-0.02em" }}>{cmd.name}</h1>
      
      {data.tags && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
          {data.tags.map(t => (
            <span key={t} style={{ background: "#0f172a", color: "#64748b", padding: "2px 10px", borderRadius: 12, fontSize: 11, border: "1px solid #1e293b", fontFamily: "monospace" }}>#{t}</span>
          ))}
        </div>
      )}

      {/* NAME section */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ color: "#22d3ee", fontFamily: "monospace", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 6 }}>NAME</div>
        <p style={{ color: "#cbd5e1", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{cmd.name} — {data.desc.split('.')[0]}.</p>
      </div>

      {/* SYNOPSIS */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ color: "#22d3ee", fontFamily: "monospace", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 6 }}>SYNOPSIS</div>
        <pre style={{ background: "#020617", border: "1px solid #1e293b", borderRadius: 8, padding: 16, margin: 0, fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontSize: 13, lineHeight: 1.6, color: "#e2e8f0", overflowX: "auto", whiteSpace: "pre-wrap" }}>{data.syn}</pre>
      </div>

      {/* DESCRIPTION */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ color: "#22d3ee", fontFamily: "monospace", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 6 }}>DESCRIPTION</div>
        <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.8, margin: 0 }}>{data.desc}</p>
      </div>

      {/* EXAMPLES */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ color: "#22d3ee", fontFamily: "monospace", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 6 }}>EXAMPLES</div>
        <pre style={{ background: "#020617", border: "1px solid #1e293b", borderRadius: 8, padding: 16, margin: 0, fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontSize: 13, lineHeight: 1.7, overflowX: "auto", whiteSpace: "pre-wrap" }}>
          {data.ex.split('\n').map((line, i) => (
            <div key={i}>
              {line.startsWith('#') ? (
                <span style={{ color: "#475569" }}>{line}</span>
              ) : line.trim() === '' ? (
                <br />
              ) : (
                <span style={{ color: "#e2e8f0" }}>{line}</span>
              )}
            </div>
          ))}
        </pre>
      </div>

      {/* SEE ALSO */}
      {data.see && data.see.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <div style={{ color: "#22d3ee", fontFamily: "monospace", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 8 }}>SEE ALSO</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {data.see.map(ref => {
              const refCmd = ALL_COMMANDS.find(c => c.name === ref);
              return (
                <button key={ref} onClick={() => refCmd && onNavigate(refCmd)} style={{ background: MAN_PAGES[ref] ? "#0c4a6e" : "#1e293b", border: "1px solid " + (MAN_PAGES[ref] ? "#0e7490" : "#334155"), color: MAN_PAGES[ref] ? "#22d3ee" : "#64748b", padding: "4px 12px", borderRadius: 6, cursor: refCmd ? "pointer" : "default", fontFamily: "monospace", fontSize: 13, transition: "all 0.15s" }}>
                  {ref}{MAN_PAGES[ref] ? " →" : ""}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════

export default function TermuxHandbook() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCmd, setSelectedCmd] = useState(null);
  const [typeFilter, setTypeFilter] = useState("all");
  const [showDeepOnly, setShowDeepOnly] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if (e.key === "Escape") {
        if (selectedCmd) setSelectedCmd(null);
        else if (selectedCategory) setSelectedCategory(null);
        else { setSearch(""); searchRef.current?.blur(); }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selectedCmd, selectedCategory]);

  const filteredCommands = useMemo(() => {
    let cmds = ALL_COMMANDS;
    if (selectedCategory) cmds = cmds.filter(c => c.category === selectedCategory);
    if (typeFilter !== "all") cmds = cmds.filter(c => c.type === typeFilter);
    if (showDeepOnly) cmds = cmds.filter(c => MAN_PAGES[c.name]);
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      cmds = cmds.filter(c => {
        if (c.name.toLowerCase().includes(q)) return true;
        if (c.category.toLowerCase().includes(q)) return true;
        const mp = MAN_PAGES[c.name];
        if (mp) {
          if (mp.desc?.toLowerCase().includes(q)) return true;
          if (mp.tags?.some(t => t.includes(q))) return true;
        }
        return false;
      });
    }
    return cmds.sort((a, b) => {
      const aHas = MAN_PAGES[a.name] ? 0 : 1;
      const bHas = MAN_PAGES[b.name] ? 0 : 1;
      if (aHas !== bHas) return aHas - bHas;
      return a.name.localeCompare(b.name);
    });
  }, [search, selectedCategory, typeFilter, showDeepOnly]);

  const categoryStats = useMemo(() => {
    const stats = {};
    for (const cmd of ALL_COMMANDS) {
      if (!stats[cmd.category]) stats[cmd.category] = { total: 0, documented: 0 };
      stats[cmd.category].total++;
      if (MAN_PAGES[cmd.name]) stats[cmd.category].documented++;
    }
    return stats;
  }, []);

  const handleNavigate = useCallback((cmd) => {
    setSelectedCmd(cmd);
  }, []);

  // ── MAN PAGE VIEW ──
  if (selectedCmd) {
    return (
      <div style={{ minHeight: "100vh", background: "#0f172a", color: "#e2e8f0" }}>
        <ManPage cmd={selectedCmd} onClose={() => setSelectedCmd(null)} onNavigate={handleNavigate} />
      </div>
    );
  }

  const sortedCategories = Object.entries(CATEGORIES).sort((a, b) => {
    const sa = categoryStats[a[0]]?.total || 0;
    const sb = categoryStats[b[0]]?.total || 0;
    return sb - sa;
  });

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", color: "#e2e8f0", fontFamily: "'Inter', -apple-system, sans-serif" }}>
      {/* HEADER */}
      <div style={{ background: "linear-gradient(135deg, #020617 0%, #0f172a 50%, #020617 100%)", borderBottom: "1px solid #1e293b", padding: "32px 24px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
            <span style={{ fontSize: 28 }}>📱</span>
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, letterSpacing: "-0.03em", background: "linear-gradient(135deg, #22d3ee, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Termux Command Handbook
            </h1>
          </div>
          <p style={{ color: "#64748b", fontSize: 13, margin: "4px 0 20px 42px", fontFamily: "monospace" }}>
            {ALL_COMMANDS.length} commands · {Object.keys(MAN_PAGES).length} deep-dive man pages · Pixel 9 / Fish Shell
          </p>

          {/* SEARCH */}
          <div style={{ position: "relative", maxWidth: 600 }}>
            <input ref={searchRef} type="text" value={search} onChange={e => { setSearch(e.target.value); if (!selectedCategory) setSelectedCategory(null); }}
              placeholder="Search commands, descriptions, tags... (⌘K)"
              style={{ width: "100%", background: "#020617", border: "1px solid #1e293b", borderRadius: 10, padding: "12px 16px 12px 42px", color: "#e2e8f0", fontSize: 15, fontFamily: "'JetBrains Mono', monospace", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" }}
              onFocus={e => e.target.style.borderColor = "#22d3ee"}
              onBlur={e => e.target.style.borderColor = "#1e293b"}
            />
            <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 18, opacity: 0.4 }}>🔍</span>
            {search && <button onClick={() => setSearch("")} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#475569", cursor: "pointer", fontSize: 18 }}>✕</button>}
          </div>

          {/* FILTERS */}
          <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap", alignItems: "center" }}>
            {[["all", "All"], ["builtin", "⚙️ Builtins"], ["function", "🐟 Functions"], ["external", "📦 External"]].map(([v, l]) => (
              <button key={v} onClick={() => setTypeFilter(v)}
                style={{ background: typeFilter === v ? "#164e63" : "#0f172a", border: "1px solid " + (typeFilter === v ? "#22d3ee" : "#1e293b"), color: typeFilter === v ? "#22d3ee" : "#64748b", padding: "5px 14px", borderRadius: 20, cursor: "pointer", fontSize: 12, fontWeight: 600, transition: "all 0.15s" }}>
                {l}
              </button>
            ))}
            <span style={{ width: 1, height: 20, background: "#1e293b", margin: "0 4px" }} />
            <button onClick={() => setShowDeepOnly(!showDeepOnly)}
              style={{ background: showDeepOnly ? "#3b1f5e" : "#0f172a", border: "1px solid " + (showDeepOnly ? "#a78bfa" : "#1e293b"), color: showDeepOnly ? "#a78bfa" : "#64748b", padding: "5px 14px", borderRadius: 20, cursor: "pointer", fontSize: 12, fontWeight: 600, transition: "all 0.15s" }}>
              📖 Deep-dive only ({Object.keys(MAN_PAGES).length})
            </button>
            {selectedCategory && (
              <button onClick={() => setSelectedCategory(null)}
                style={{ background: "#1e293b", border: "1px solid #334155", color: "#f1f5f9", padding: "5px 14px", borderRadius: 20, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>
                ✕ {selectedCategory}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* BODY */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 24px 64px" }}>
        {/* CATEGORY GRID — show when no search and no category selected */}
        {!search.trim() && !selectedCategory && !showDeepOnly && typeFilter === "all" && (
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 14, color: "#64748b", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 16 }}>Browse by Category</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 10 }}>
              {sortedCategories.map(([name, meta]) => {
                const stats = categoryStats[name] || { total: 0, documented: 0 };
                return (
                  <button key={name} onClick={() => setSelectedCategory(name)}
                    style={{ background: "#020617", border: "1px solid #1e293b", borderRadius: 10, padding: "14px 16px", cursor: "pointer", textAlign: "left", transition: "all 0.2s", display: "flex", flexDirection: "column", gap: 4 }}
                    onMouseOver={e => { e.currentTarget.style.borderColor = meta.color; e.currentTarget.style.background = "#0f172a"; }}
                    onMouseOut={e => { e.currentTarget.style.borderColor = "#1e293b"; e.currentTarget.style.background = "#020617"; }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: meta.color }}>
                        {meta.icon} {name}
                      </span>
                      <span style={{ fontSize: 11, color: "#475569", fontFamily: "monospace" }}>{stats.total}</span>
                    </div>
                    <span style={{ fontSize: 11, color: "#475569", lineHeight: 1.4 }}>{meta.desc}</span>
                    {stats.documented > 0 && (
                      <div style={{ marginTop: 4 }}>
                        <div style={{ background: "#1e293b", borderRadius: 4, height: 3, overflow: "hidden" }}>
                          <div style={{ background: meta.color, height: "100%", width: `${(stats.documented / stats.total) * 100}%`, borderRadius: 4, opacity: 0.7 }} />
                        </div>
                        <span style={{ fontSize: 10, color: "#475569", fontFamily: "monospace" }}>{stats.documented} deep-dive entries</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* COMMAND LIST */}
        {(search.trim() || selectedCategory || showDeepOnly || typeFilter !== "all") && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h2 style={{ fontSize: 14, color: "#64748b", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", margin: 0 }}>
                {filteredCommands.length} command{filteredCommands.length !== 1 ? "s" : ""}
                {selectedCategory && ` in ${selectedCategory}`}
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {filteredCommands.map(cmd => {
                const mp = MAN_PAGES[cmd.name];
                const catMeta = CATEGORIES[cmd.category];
                return (
                  <button key={cmd.name + cmd.category} onClick={() => setSelectedCmd(cmd)}
                    style={{ background: "#020617", border: "1px solid #1e293b", borderRadius: 8, padding: "10px 16px", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 12, transition: "all 0.15s", borderLeft: mp ? `3px solid ${catMeta?.color || "#22d3ee"}` : "3px solid transparent" }}
                    onMouseOver={e => { e.currentTarget.style.background = "#0f172a"; e.currentTarget.style.borderColor = "#334155"; }}
                    onMouseOut={e => { e.currentTarget.style.background = "#020617"; e.currentTarget.style.borderColor = "#1e293b"; }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: mp ? "#f1f5f9" : "#94a3b8", fontWeight: mp ? 600 : 400, minWidth: 180 }}>
                      {cmd.name}
                    </span>
                    <TypeBadge type={cmd.type} />
                    {mp && <span style={{ fontSize: 10, color: "#22d3ee", fontWeight: 700, background: "#0c4a6e", padding: "1px 6px", borderRadius: 4 }}>MAN</span>}
                    <span style={{ color: "#475569", fontSize: 12, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {mp ? mp.desc.split('.')[0] : (cmd.type === "function" ? "Fish function" : cmd.type === "builtin" ? "Shell builtin" : "External command")}
                    </span>
                    {!selectedCategory && (
                      <span style={{ color: catMeta?.color || "#64748b", fontSize: 11, fontFamily: "monospace", flexShrink: 0 }}>
                        {catMeta?.icon}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* QUICK STATS when on home page */}
        {!search.trim() && !selectedCategory && !showDeepOnly && typeFilter === "all" && (
          <div style={{ marginTop: 24, background: "#020617", border: "1px solid #1e293b", borderRadius: 10, padding: 20 }}>
            <h3 style={{ fontSize: 13, color: "#64748b", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", margin: "0 0 12px" }}>Quick Reference</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
              {[
                { label: "Total Commands", value: ALL_COMMANDS.length, color: "#22d3ee" },
                { label: "Deep-Dive Man Pages", value: Object.keys(MAN_PAGES).length, color: "#a78bfa" },
                { label: "Shell Builtins", value: ALL_COMMANDS.filter(c => c.type === "builtin").length, color: "#22d3ee" },
                { label: "Fish Functions", value: ALL_COMMANDS.filter(c => c.type === "function").length, color: "#a78bfa" },
                { label: "External Commands", value: ALL_COMMANDS.filter(c => c.type === "external").length, color: "#34d399" },
                { label: "Categories", value: Object.keys(CATEGORIES).length, color: "#fbbf24" },
              ].map(s => (
                <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", background: "#0f172a", borderRadius: 6 }}>
                  <span style={{ color: "#64748b", fontSize: 12 }}>{s.label}</span>
                  <span style={{ color: s.color, fontFamily: "monospace", fontSize: 16, fontWeight: 700 }}>{s.value}</span>
                </div>
              ))}
            </div>
            <p style={{ color: "#334155", fontSize: 11, fontFamily: "monospace", textAlign: "center", marginTop: 16, marginBottom: 0 }}>
              ⌘K to search · ESC to go back · Click any command for details
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
