#!/bin/bash
# Renders camera moves to previews/clips/<id>.mp4 (720 wide web copy).
# Usage: node scripts/build-set3d.mjs   then   bash scripts/build-camera-render.sh <id> [id ...]
root="$(cd "$(dirname "$0")/.." && pwd)"
out="$root/previews/clips"
mkdir -p "$out" "$root/previews/_snaps"
cd "$root/previews/set3d"
for id in "$@"; do
  ( cd "$id" && HYPERFRAMES_SKIP_SKILLS=1 timeout 900 npx -y hyperframes render --quality looks --output "$out/$id-raw.mp4" > "$root/previews/_snaps/render-$id.log" 2>&1 ) \
    && ffmpeg -v error -y -i "$out/$id-raw.mp4" -vf "scale=720:-2:flags=lanczos" -c:v libx264 -crf 21 -preset slow -pix_fmt yuv420p -an -movflags +faststart "$out/$id.mp4" \
    && rm "$out/$id-raw.mp4" && echo "ok $id" || echo "FAIL $id"
done
