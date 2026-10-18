#!/bin/bash
# Renders motion graphic moves to previews/clips/motion-graphics/<id>.mp4 (720 wide web copy).
# Usage: bash scripts/build-mg-render.sh <id> [id ...]
root="$(cd "$(dirname "$0")/.." && pwd)"
out="$root/previews/clips/motion-graphics"
mkdir -p "$out" "$root/previews/_snaps"
cd "$root/previews/mg"
for id in "$@"; do
  ( cd "$id" && HYPERFRAMES_SKIP_SKILLS=1 timeout 1200 npx -y hyperframes render --quality looks --output "$out/$id-raw.mp4" > "$root/previews/_snaps/render-mg-$id.log" 2>&1 ) \
    && ffmpeg -v error -y -i "$out/$id-raw.mp4" -vf "scale=720:-2:flags=lanczos" -c:v libx264 -crf 21 -preset slow -pix_fmt yuv420p -an -movflags +faststart "$out/$id.mp4" \
    && rm "$out/$id-raw.mp4" && echo "ok $id" || echo "FAIL $id"
done
