import json

def get_raw_headers(cookie):
    return json.loads(
        f"""{{     
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9",
            "authorization": "SAPISIDHASH",
            "content-type": "application/json",
            "priority": "u=1, i",
            "sec-ch-ua": "Chromium;v=130, Google Chrome;v=130, Not?A_Brand;v=99",
            "sec-ch-ua-arch": "arm",
            "sec-ch-ua-bitness": "64",
            "sec-ch-ua-form-factors": "Desktop",
            "sec-ch-ua-full-version": "130.0.6723.92",
            "sec-ch-ua-full-version-list": "Chromium;v=130.0.6723.92, Google Chrome;v=130.0.6723.92, Not?A_Brand;v=99.0.0.0",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-model": "",
            "sec-ch-ua-platform": "macOS",
            "sec-ch-ua-platform-version": "14.6.0",
            "sec-ch-ua-wow64": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "same-origin",
            "sec-fetch-site": "same-origin",
            "x-goog-authuser": "0",
            "x-goog-visitor-id": "",
            "x-origin": "https://music.youtube.com",
            "x-youtube-bootstrap-logged-in": "true",
            "x-youtube-client-name": "67",
            "x-youtube-client-version": "1.20241118.01.00",
            "Referer": "https://music.youtube.com/",
            "Referrer-Policy": "strict-origin-when-cross-origin",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:72.0) Gecko/20100101 Firefox/72.0",
            "Accept": "*/*",
            "Accept-Language": "en-US,en;q=0.5",
            "Content-Type": "application/json",
            "X-Goog-AuthUser": "0",
            "x-origin": "https://music.youtube.com",
            "Cookie": "{cookie}"
        }}"""
    )
