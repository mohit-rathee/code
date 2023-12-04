import requests
url = 'https://13616-2.b.cdn13.com/disk2/movies/Fukrey.Returns.mp4'
headers = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/110.0'}
with open('video.mp4', 'wb') as f_out:
    r = requests.get(url, headers=headers, stream=True)
    for chunk in r.iter_content(chunk_size=1024):
        if chunk:
            f_out.write(chunk)
