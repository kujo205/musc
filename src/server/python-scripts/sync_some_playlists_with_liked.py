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

    print('enter add_playlist_to_existing_playlist_one')

    headers_dict = get_raw_headers(cookie)


    ytmusic = ytmusicapi.YTMusic(auth=headers_dict)

    # print('enter get_playlist_data')
    #
    # data = ytmusic.get_playlist(source_playlist_id)
    #
    # video_ids = [track['videoId'] for track in data['tracks']]
    #
    # print('video_ids', video_ids)
    #
    # result = ytmusic.add_playlist_items(playlistId=target_playlist_id, videoIds=video_ids)

    result = ytmusic.edit_playlist(playlistId=target_playlist_id, addPlaylistId=source_playlist_id)

    print('exit add_playlist_to_existing_playlist_one')

    return result

def load_input_file(file_path):
    """
    Load the input file.

    :param file_path: str
      The path to the input file.
    """
    with open(file_path, 'r') as file:
        data = json.load(file)
        print(len(data))
    return data

async def main():
    print('Starting...')

    parser = argparse.ArgumentParser()

    parser.add_argument('--input_file', type=str)

    args = parser.parse_args()

    data = load_input_file(args.input_file)


    tasks = [
        add_playlist_to_existing_playlist_one(
            item['cookie'],
            item['target_playlist_id']
        )
        for item in data
    ]
    results = await asyncio.gather(*tasks, return_exceptions=True)

    for result in results:
        print(result)

if __name__ == "__main__":
    asyncio.run(main())
    print('Starting...')
