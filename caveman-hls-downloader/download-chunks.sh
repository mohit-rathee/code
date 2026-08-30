#!/usr/bin/env bash

playlist_file="$1"

max_jobs=7
output_dir="chunks"


if [[ -z "$playlist_file" ]]; then
    echo "Usage: $0 <playlist file>"
    exit 1
fi

if [[ ! -f "$playlist_file" ]]; then
    echo "Error: '$playlist_file' is not a file"
    exit 1
fi

rm -rf "$output_dir"
mkdir "$output_dir"

headers=(
    -H 'Accept: */*'
    -H 'Accept-Encoding: gzip, deflate, br, zstd'
    -H 'Accept-Language: en-US,en;q=0.9'
    -H 'Origin: https://player.videasy.to'
    -H 'Referer: https://player.videasy.to/'
    -H 'Sec-CH-UA: "Not=A?Brand";v="99", "Google Chrome";v="151", "Chromium";v="151"'
    -H 'Sec-CH-UA-Mobile: ?0'
    -H 'Sec-CH-UA-Platform: "Linux"'
    -H 'Sec-Fetch-Dest: empty'
    -H 'Sec-Fetch-Mode: cors'
    -H 'Sec-Fetch-Site: cross-site'
    -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36'
)

start=$SECONDS

while IFS= read -r line; do

    # init chunk
    if [[ "$line" =~ URI=\"([^\"]+)\" ]]; then
        line="${BASH_REMATCH[1]}"
    fi
    # skip comments
    [[ "$line" == \#* ]] && continue
    [[ -z "$line" ]] && continue

    chunk_url="$line"
    chunk_filename="${line##*/}"

    curl -sS --http2 \
        --retry 5 \
        --retry-delay 2 \
        --retry-all-errors \
        "${headers[@]}" \
        -o "$output_dir/$chunk_filename" \
        -w "$chunk_filename: %{time_total}s\n" \
    "$chunk_url" &
    # if line is not the full url, place it like this.
    # "https://maplesable.top/vd/Rjl3MlRLa2c2b2ZlZTU2bWVtajlmZzpVUWUzM1lDMllZU2VCMFZneE5BUTljRlZOVUdMLTQ3MVBGd3FfZkhCb1RZ/$chunk_url" &

    # Limit concurrent curl processes
    while (( $(jobs -rp | wc -l) >= max_jobs )); do
        wait -n
    done

done < "$playlist_file"

# Wait for remaining downloads
wait

echo "Total time: $((SECONDS - start))s"
