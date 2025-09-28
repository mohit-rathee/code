import json
from datetime import timedelta
import re

# Hardcoded offset (from part1.aac)
offset = 1779.217268

# Format time for SRT (e.g. 00:29:39,217)
def format_time(seconds):
    td = timedelta(seconds=seconds)
    return str(td)[:-3].replace('.', ',').zfill(12)

# Load part2.txt
with open("caption2.txt", "r", encoding="utf-8") as f:
    data = json.load(f)

# Extract utterances
utterances = data.get("translation", {}).get("results", [])[0].get("utterances", [])

# Find last SRT index from existing captions
with open("captions.srt", "r", encoding="utf-8") as f:
    content = f.read()

matches = re.findall(r'^(\d+)\n', content, flags=re.MULTILINE)
last_index = int(matches[-1]) if matches else 0

# Append new utterances with offset
with open("captions.srt", "a", encoding="utf-8") as out:
    for i, utt in enumerate(utterances, 1):
        start = format_time(utt["start"] + offset)
        end = format_time(utt["end"] + offset)
        text = utt["text"].strip()

        if text:
            out.write(f"{last_index + i}\n{start} --> {end}\n{text}\n\n")

