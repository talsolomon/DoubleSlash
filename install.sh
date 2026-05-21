#!/usr/bin/env bash
# DS Install — wires the DS viewer and hooks into ~/.claude
# Usage: bash install.sh              — install viewer globally
#        bash install.sh --init       — also seed project files in cwd
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VIEWER_SRC="$SCRIPT_DIR/install/server.js"
VIEWER_DEST="$HOME/.claude/ds-viewer/server.js"
SETTINGS="$HOME/.claude/settings.json"
INIT=false
[[ "${1:-}" == "--init" ]] && INIT=true

echo ""
echo "  // DS Install"
echo ""

# ── 1. Copy viewer ────────────────────────────────────────────────────────────
mkdir -p "$HOME/.claude/ds-viewer"
cp "$VIEWER_SRC" "$VIEWER_DEST"
chmod +x "$VIEWER_DEST"
echo "  ✓  viewer  →  $VIEWER_DEST"

# ── 2. Merge SessionStart hook into ~/.claude/settings.json ──────────────────
python3 - <<'PYEOF'
import json, os, sys

settings_path = os.path.expanduser("~/.claude/settings.json")
new_hook = {
    "type": "command",
    "command": 'if ! lsof -ti:3333 >/dev/null 2>&1; then nohup node ~/.claude/ds-viewer/server.js --project="$PWD" >/tmp/ds-viewer.log 2>&1 & disown; fi; exit 0',
    "statusMessage": "DS viewer starting..."
}

def has_viewer_hook(obj):
    if isinstance(obj, dict):
        if "lsof -ti:3333" in obj.get("command", ""):
            return True
        return any(has_viewer_hook(v) for v in obj.values())
    if isinstance(obj, list):
        return any(has_viewer_hook(i) for i in obj)
    return False

settings = {}
if os.path.exists(settings_path):
    with open(settings_path) as f:
        settings = json.load(f)

hooks = settings.setdefault("hooks", {})
session_start = hooks.setdefault("SessionStart", [])

if has_viewer_hook(session_start):
    print("  ✓  viewer hook already present — skipped")
else:
    # Append as a standalone hook entry (works with both flat and matcher styles)
    session_start.append({"matcher": "", "hooks": [new_hook]})
    with open(settings_path, "w") as f:
        json.dump(settings, f, indent=2)
    print("  ✓  hooks  →  ~/.claude/settings.json")
PYEOF

# ── 3. Seed project files (--init only) ───────────────────────────────────────
if $INIT; then
  PROJECT_DIR="$(pwd)"

  if [[ ! -f "$PROJECT_DIR/kanban.md" ]]; then
    TODAY=$(date +%Y-%m-%d)
    cat > "$PROJECT_DIR/kanban.md" <<EOF
# Kanban — $(basename "$PROJECT_DIR")

## TODO

## IN PROGRESS

## DONE
EOF
    echo "  ✓  kanban.md created"
  else
    echo "  ·  kanban.md already exists — skipped"
  fi

  if [[ ! -f "$PROJECT_DIR/node-map.md" ]]; then
    TODAY=$(date +%Y-%m-%d)
    cat > "$PROJECT_DIR/node-map.md" <<EOF
## Session $TODAY
- note: Project initialized
EOF
    echo "  ✓  node-map.md created"
  else
    echo "  ·  node-map.md already exists — skipped"
  fi

  # Wire project-level .claude/settings.json if missing
  LOCAL_SETTINGS="$PROJECT_DIR/.claude/settings.json"
  if [[ ! -f "$LOCAL_SETTINGS" ]]; then
    mkdir -p "$PROJECT_DIR/.claude"
    cat > "$LOCAL_SETTINGS" <<'EOF'
{
  "permissions": {
    "allow": ["Bash(*)", "Write(*)", "Edit(*)", "Read(*)", "WebSearch(*)", "WebFetch(*)", "Agent(*)", "TodoWrite(*)", "MultiEdit(*)"]
  }
}
EOF
    echo "  ✓  .claude/settings.json created"
  else
    echo "  ·  .claude/settings.json already exists — skipped"
  fi
fi

echo ""
echo "  DS is installed. The viewer launches automatically on the next Claude Code session."
echo "  To start manually:  node ~/.claude/ds-viewer/server.js --project=$(pwd)"
echo ""
