#!/bin/bash
set -e

INPUT_DIR="assets/sounds/phonemes"
OUTPUT_DIR="assets/sounds/trimmed"

mkdir -p "$OUTPUT_DIR"

for f in "$INPUT_DIR"/*.mp3; do
  filename=$(basename "$f")
  echo "Trimming $filename..."
  ffmpeg -y -i "$f" \
    -af "silenceremove=start_periods=1:start_silence=0.02:start_threshold=-50dB:stop_periods=1:stop_silence=0.1:stop_threshold=-50dB" \
    "$OUTPUT_DIR/$filename" 2>/dev/null
done

echo "Done. Trimmed files are in $OUTPUT_DIR"
