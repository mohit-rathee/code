import json
from datetime import timedelta

def format_time(seconds):
    td = timedelta(seconds=seconds)
    return str(td)[:-3].replace('.', ',').zfill(12)

with open("caption.txt", "r", encoding="utf-8") as f:
    data = json.load(f)

utterances = data.get("translation", {}).get("results", [])[0].get("utterances", [])

with open("captions.srt", "w", encoding="utf-8") as out:
    for idx, utt in enumerate(utterances, 1):
        start = format_time(utt["start"])
        end = format_time(utt["end"])
        text = utt["text"].strip()

        if text:
            out.write(f"{idx}\n{start} --> {end}\n{text}\n\n")

