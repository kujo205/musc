import ytmusicapi
import json
import argparse
from headers import get_raw_headers
import asyncio


async def return_id_if_playlist_undefined(cookie, id):
    """
    Sync the liked music playlist with a target playlist.

    :param cookie: str
      The cookie string for authentication.

    :param id: str
        The target playlist ID.

    :return: str
    """

    headers_dict = get_raw_headers(cookie)

    ytmusic = ytmusicapi.YTMusic(auth=headers_dict)

    try:
        ytmusic.get_playlist(playlistId=id, limit=1)
    except Exception as e:
        return id


def load_input_file(file_path):
    """
    Load the input file.

    :param file_path: str
      The path to the input file.
    """
    with open(file_path, 'r') as file:
        data = json.load(file)
    return data

async def main():
    parser = argparse.ArgumentParser()

    parser.add_argument('--input_file', type=str)

    args = parser.parse_args()

    data = load_input_file(args.input_file)

    tasks = [
        return_id_if_playlist_undefined(
            item['cookie'],
            item['id']
        )
        for item in data
    ]

    results = await asyncio.gather(*tasks, return_exceptions=True)

    result_json = json.dumps(results)

    print(result_json)

if __name__ == "__main__":
    asyncio.run(main())
