#!/usr/bin/env bash
# Build DS-x.x.x.dmg
# Usage: bash build.sh
set -euo pipefail

VERSION=$(cat VERSION | tr -d '[:space:]')
DIST="dist"
PKG_NAME="DS-${VERSION}.pkg"
DMG_NAME="DS-${VERSION}.dmg"
PAYLOAD_ROOT="${DIST}/pkg-root"
PAYLOAD_DEST="${PAYLOAD_ROOT}/Library/Application Support/DS"
PKG_ID="com.dubleslash.ds"

echo ""
echo "  // DS Build  v${VERSION}"
echo ""

# Clean previous build
rm -rf "$DIST"
mkdir -p "$PAYLOAD_DEST"

# ── Assemble payload ──────────────────────────────────────────────────────────
cp install.sh        "$PAYLOAD_DEST/"
cp -r install        "$PAYLOAD_DEST/"
cp -r templates      "$PAYLOAD_DEST/"
rsync -a --exclude="worktrees/" .claude/ "$PAYLOAD_DEST/.claude/"

SKILL_COUNT=$(find "$PAYLOAD_DEST/.claude/skills" -name "SKILL.md" | wc -l | tr -d ' ')
echo "  ✓  payload    →  ${PAYLOAD_DEST}  (${SKILL_COUNT} skills)"

# ── Build .pkg ────────────────────────────────────────────────────────────────
pkgbuild \
  --root       "$PAYLOAD_ROOT" \
  --scripts    "scripts" \
  --identifier "$PKG_ID" \
  --version    "$VERSION" \
  --install-location "/" \
  "${DIST}/${PKG_NAME}"

echo "  ✓  pkg        →  dist/${PKG_NAME}"

# ── Build .dmg ────────────────────────────────────────────────────────────────
hdiutil create \
  -volname "Duble Slash ${VERSION}" \
  -srcfolder "${DIST}/${PKG_NAME}" \
  -ov \
  -format UDZO \
  -quiet \
  "${DIST}/${DMG_NAME}"

SIZE=$(du -sh "dist/${DMG_NAME}" | cut -f1)
echo "  ✓  dmg        →  dist/${DMG_NAME}  (${SIZE})"
echo ""
echo "  Distribute:  dist/${DMG_NAME}"
echo ""
