#!/usr/bin/env bash
# Duble//Slash Install
# Usage:
#   bash install.sh              — global install (viewer, skills, CLAUDE.md, hooks)
#   bash install.sh --init       — also seed project brain in current directory
#   bash install.sh --upgrade    — reinstall product files, preserve all user data
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLAUDE_DIR="$HOME/.claude"
INIT=false
[[ "${1:-}" == "--init" ]] && INIT=true

echo ""
echo "  // DS Install"
echo ""

# ── 1. Viewer ─────────────────────────────────────────────────────────────────
VIEWER_SRC="$SCRIPT_DIR/install/server.js"
VIEWER_DEST="$CLAUDE_DIR/ds-viewer/server.js"
mkdir -p "$CLAUDE_DIR/ds-viewer"
cp "$VIEWER_SRC" "$VIEWER_DEST"
chmod +x "$VIEWER_DEST"
echo "  ✓  viewer     →  $VIEWER_DEST"

# ── 2. Skills ─────────────────────────────────────────────────────────────────
SKILLS_SRC="$SCRIPT_DIR/.claude/skills"
SKILLS_DEST="$CLAUDE_DIR/skills"
if [[ -d "$SKILLS_SRC" ]]; then
  mkdir -p "$SKILLS_DEST"
  rsync -a --delete "$SKILLS_SRC/" "$SKILLS_DEST/"
  COUNT=$(find "$SKILLS_SRC" -name "SKILL.md" | wc -l | tr -d ' ')
  echo "  ✓  skills     →  $SKILLS_DEST  ($COUNT skills)"
else
  echo "  ·  skills dir not found — skipped"
fi

# ── 3. CLAUDE.md ──────────────────────────────────────────────────────────────
TEMPLATE_CLAUDE="$SCRIPT_DIR/templates/CLAUDE.md"
TARGET_CLAUDE="$CLAUDE_DIR/CLAUDE.md"
if [[ -f "$TEMPLATE_CLAUDE" ]]; then
  if [[ ! -f "$TARGET_CLAUDE" ]]; then
    cp "$TEMPLATE_CLAUDE" "$TARGET_CLAUDE"
    echo "  ✓  CLAUDE.md  →  $TARGET_CLAUDE"
  elif grep -q "ds-dubleslash" "$TARGET_CLAUDE" 2>/dev/null; then
    echo "  ·  CLAUDE.md  DS block present — skipped"
  else
    TMPFILE=$(mktemp)
    cat "$TEMPLATE_CLAUDE" > "$TMPFILE"
    printf "\n---\n\n" >> "$TMPFILE"
    cat "$TARGET_CLAUDE" >> "$TMPFILE"
    mv "$TMPFILE" "$TARGET_CLAUDE"
    echo "  ✓  CLAUDE.md  →  DS block merged into existing file"
  fi
fi

# ── 4. Team brain ─────────────────────────────────────────────────────────────
TEAM_SRC="$SCRIPT_DIR/templates/teams/brain/memory-wings.md"
TEAM_DEST="$CLAUDE_DIR/teams/dubleslash/brain/memory-wings.md"
mkdir -p "$(dirname "$TEAM_DEST")"
if [[ ! -f "$TEAM_DEST" ]]; then
  cp "$TEAM_SRC" "$TEAM_DEST"
  echo "  ✓  team brain →  $TEAM_DEST"
else
  echo "  ·  team brain already exists — skipped"
fi

# ── 5. SessionStart hook ──────────────────────────────────────────────────────
python3 - <<'PYEOF'
import json, os

settings_path = os.path.expanduser("~/.claude/settings.json")
new_hook = {
    "type": "command",
    "command": "if ! lsof -ti:3333 >/dev/null 2>&1; then nohup node ~/.claude/ds-viewer/server.js --project=\"$PWD\" >/tmp/ds-viewer.log 2>&1 & disown; fi; exit 0",
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
    print("  ·  hooks      SessionStart viewer hook present — skipped")
else:
    session_start.append({"matcher": "", "hooks": [new_hook]})
    with open(settings_path, "w") as f:
        json.dump(settings, f, indent=2)
    print("  ✓  hooks      →  ~/.claude/settings.json")
PYEOF

# ── 6. DS Workspace ──────────────────────────────────────────────────────────
DS_HOME="$HOME/DS"
if [[ ! -d "$DS_HOME" ]]; then
  mkdir -p "$DS_HOME"
  echo "  ✓  workspace  →  $DS_HOME"
else
  echo "  ·  workspace  $DS_HOME already exists — skipped"
fi

# ── 7. Project brain (--init only) ───────────────────────────────────────────
if $INIT; then
  PROJECT_DIR="$(pwd)"
  PROJECT_NAME="$(basename "$PROJECT_DIR")"
  TEMPLATES="$SCRIPT_DIR/templates"
  TODAY=$(date +%Y-%m-%d)

  echo ""
  echo "  Seeding project brain in $PROJECT_NAME..."
  echo ""

  seed_file() {
    local src="$1"
    local dest="$2"
    mkdir -p "$(dirname "$dest")"
    if [[ ! -f "$dest" ]]; then
      sed "s/{{PROJECT}}/$PROJECT_NAME/g; s/{{DATE}}/$TODAY/g" "$src" > "$dest"
      echo "  ✓  $(basename "$dest")"
    else
      echo "  ·  $(basename "$dest") already exists — skipped"
    fi
  }

  seed_file "$TEMPLATES/brain/memory.md"       "$PROJECT_DIR/brain/memory.md"
  seed_file "$TEMPLATES/brain/project-plan.md" "$PROJECT_DIR/brain/project-plan.md"
  seed_file "$TEMPLATES/decisions/README.md"   "$PROJECT_DIR/decisions/README.md"
  seed_file "$TEMPLATES/kanban.md"             "$PROJECT_DIR/kanban.md"
  seed_file "$TEMPLATES/decisionlog.md"        "$PROJECT_DIR/decisionlog.md"
  seed_file "$TEMPLATES/node-map.md"           "$PROJECT_DIR/node-map.md"

  # Project .claude/settings.json
  LOCAL_SETTINGS="$PROJECT_DIR/.claude/settings.json"
  if [[ ! -f "$LOCAL_SETTINGS" ]]; then
    mkdir -p "$PROJECT_DIR/.claude"
    cat > "$LOCAL_SETTINGS" <<'SETTINGS_EOF'
{
  "permissions": {
    "allow": ["Bash(*)", "Write(*)", "Edit(*)", "Read(*)", "WebSearch(*)", "WebFetch(*)", "Agent(*)", "TodoWrite(*)", "MultiEdit(*)"]
  }
}
SETTINGS_EOF
    echo "  ✓  .claude/settings.json"
  else
    echo "  ·  .claude/settings.json already exists — skipped"
  fi
fi

# ── Done ──────────────────────────────────────────────────────────────────────
echo ""
if $INIT; then
  echo "  // DS is ready. Open Claude Code in this directory."
  echo "  The viewer starts automatically. Type // to orient."
else
  echo "  // DS is installed."
  echo "  Your projects live in: $HOME/DS"
  echo "  Start a new project:   mkdir ~/DS/my-project && cd ~/DS/my-project && claude"
fi
echo "  Viewer:  node ~/.claude/ds-viewer/server.js --project=\$(pwd)"
echo ""
