import ytmusicapi
import json
import argparse
from headers import get_raw_headers
import asyncio


def add_playlist_to_existing_playlist_one(cookie, target_playlist_id, source_playlist_id='LM'):
    """
    Add items from a source playlist to a target playlist without duplicates.

    :param cookie: str
      The cookie string for authentication.

    :param target_playlist_id: str
        The target playlist ID.

    :param source_playlist_id: str
        The source playlist ID from which items are going to be added to target.

    :return: None
    """

    headers_dict = get_raw_headers(cookie)

    ytmusic = ytmusicapi.YTMusic(auth=headers_dict)
    response = ytmusic.edit_playlist(target_playlist_id, addPlaylistId=source_playlist_id, addToTop=True)

    print(response)

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
    tasks = []

    parser = argparse.ArgumentParser()

    parser.add_argument('input_file', type=str)

    args = parser.parse_args()

    data = load_input_file(args.input_file)

    for item in data:
        tasks.append(add_playlist_to_existing_playlist_one(item['cookie'], item['target_playlist_id'], 'LM'))

    results = await asyncio.gather(*tasks)

    for result in results:
        print(result)


if __name__ == "__main__":
    main()
