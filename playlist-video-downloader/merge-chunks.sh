#!/usr/bin/env bash

playlist_file="$1"
chunk_dir="chunks"
tmp_dir=".tmp"
output_file="output.ts"
final_file="output.mp4"


if [[ -z "$playlist_file" ]]; then
    echo "Usage: $0 <playlist file>" 
    exit 1
fi

rm -f "$output_file"
rm -f "$final_file"
rm -rf "$tmp_dir" 
mkdir "$tmp_dir"

while IFS= read -r line; do

    # init chunk
    if [[ "$line" =~ URI=\"([^\"]+)\" ]]; then
        line="${BASH_REMATCH[1]}"
    fi
    # skip comments
    [[ "$line" == \#* ]] && continue
    [[ -z "$line" ]] && continue

    # extract chunk info from playlist
    chunk_name="${line##*/}"
    chunk_file="$chunk_dir/$chunk_name"

    printf 'Processing: %s\n' "$chunk_name"

    if file "$chunk_file" | grep -q 'Zstandard compressed'; then
        # Zstandard compressed files are decoded and replaced
        tmp_chunk_file="$tmp_dir/$chunk_name"
        zstd -d -q -c "$chunk_file" -o "$tmp_chunk_file"
        cp "$tmp_chunk_file" "$chunk_file"
    fi

    cat "$chunk_file" >> "$output_file"

done < "$playlist_file"

rm -rf "$tmp_dir"
# final touch (without this output is very heavy and glitchy in vlc)
if $(ffmpeg -loglevel quiet -i "$output_file" -c copy "$final_file"); then
    # cleanup
    rm -f "$output_file"
    echo "Finished"
    echo "Output: $final_file"
else
    echo "Couldn't remux it, try yourself with $output_file "
fi


