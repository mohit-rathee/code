#!/usr/bin/env bash

file="$1"

max_jobs=5
playlist_file="playlist.txt"
output_dir="test"


if [[ -z "$file" ]]; then
    echo "Usage: $0 <playlist file>"
    exit 1
fi

if [[ ! -f "$file" ]]; then
    echo "Error: '$file' is not a file"
    exit 1
fi

rm -rf "$output_dir"
mkdir "$output_dir"

headers=(
    -H 'Accept: */*'
    -H 'Accept-Encoding: gzip, deflate, br, zstd'
    -H 'Accept-Language: en-US,en;q=0.9'
    -H 'Origin: https://www.vidking.net'
    -H 'Referer: https://www.vidking.net/'
    -H 'Sec-CH-UA: "Not=A?Brand";v="99", "Google Chrome";v="151", "Chromium";v="151"'
    -H 'Sec-CH-UA-Mobile: ?0'
    -H 'Sec-CH-UA-Platform: "Linux"'
    -H 'Sec-Fetch-Dest: empty'
    -H 'Sec-Fetch-Mode: cors'
    -H 'Sec-Fetch-Site: cross-site'
    -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36'
)

start=$SECONDS

if file "$file" | grep -q 'Zstandard compressed'; then
    zstd -d -q -c "$file" -o "$playlist_file"
else
    cp "$file" "$playlist_file"
fi

while IFS= read -r line; do

    # skip comments
    [[ "$line" == \#* ]] && continue
    [[ -z "$line" ]] && continue

    chunk_filename="${line##*/}"

    curl -sS --http2 \
        "${headers[@]}" \
        -o "$output_dir/$chunk_filename" \
        -w "$chunk_filename: %{time_total}s\n" \
    "$line" &

    # Limit concurrent curl processes
    while (( $(jobs -rp | wc -l) >= max_jobs )); do
        wait -n
    done

done < "$playlist_file"

# Wait for remaining downloads
wait

echo "Total time: $((SECONDS - start))s"
