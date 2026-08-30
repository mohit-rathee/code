# Playlist Video Downloader

Downloads media chunks from a playlist, merges them into a video, and optionally adds soft subtitles.

## Usage

`./download-chunks.sh playlist.m3u8`    ==> Download all chunks
`./merge-chunks.sh playlist.txt`        ==> Merge them into `output.mp4`

### `download-chunks.sh`

* Accepts a standar `.m3u8` as a playlist file.
* Reads the playlist, skips comments, and downloads media chunks into `chunks/`.

### `merge-chunks.sh`

* Accepts `playlist.txt`.
* Reads the playlist, decompresses and merges chunks from `chunks/`.
* Remuxes the final stream into `output.mp4`.
* `output.ts` and `.tmp/` are temporary files and can be safely removed.

## Add Soft Captions

`ffmpeg -hide_banner -loglevel error -i output.mp4 -i caption.srt -c copy -c:s mov_text output_with_captions.mp4`

# This was done to help me download episodes of rick & morty(coz lame browser load chunks sequentially).  I enjoyed discovering HLS from devtools and playing with bash, curl & ffmpeg. 
## __But this shit doesn't deserve any more attention unless mpv becomes lame someday (..PEACE)__
