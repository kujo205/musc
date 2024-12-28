import ytmusicapi
import json
import argparse
from headers import get_raw_headers
import asyncio

def compare_arrays(a, b):
    to_add = [item for item in a if item not in b]
    to_remove = [item for item in b if item not in a]
    return to_add, to_remove


async def sync_liked_and_target_playlists_one(cookie, target_playlist_id):
    """
    Sync the liked music playlist with a target playlist.

    :param cookie: str
      The cookie string for authentication.

    :param target_playlist_id: str
        The target playlist ID.

    :return: None
    """

    headers_dict = get_raw_headers(cookie)

    ytmusic = ytmusicapi.YTMusic(auth=headers_dict)

    try:
        target_data = ytmusic.get_playlist(playlistId=target_playlist_id, limit=None)
    except Exception as e:
        return {
            'playlist_id':target_playlist_id,
            'deleted_at_yt':True,
            'added_number':0,
            'removed_number':0
        }

    liked_music_data = ytmusic.get_playlist(playlistId='LM', limit=None)
    target_data_ids = [track['videoId'] for track in target_data.get('tracks', [])]
    liked_music_data_ids = [track['videoId'] for track in liked_music_data.get('tracks', [])]

    to_add, to_remove = compare_arrays(liked_music_data_ids, target_data_ids)

    if len(to_remove) > 0:
        filtered_videos = [track for track in target_data.get('tracks', []) if track['videoId'] in to_remove]
        ytmusic.remove_playlist_items(playlistId=target_playlist_id, videos=filtered_videos)

    if len(to_add) > 0:
        ytmusic.edit_playlist(target_playlist_id,addToTop=True)
        ytmusic.add_playlist_items(playlistId=target_playlist_id, videoIds=to_add, duplicates=False)

    return {
        'playlist_id':target_playlist_id,
        'deleted_at_yt':False,
        'added_number':len(to_add),
        'removed_number':len(to_remove)
    }

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
        sync_liked_and_target_playlists_one(
            item['cookie'],
            item['target_playlist_id']
        )
        for item in data
    ]
    results = await asyncio.gather(*tasks, return_exceptions=True)

    result_json = json.dumps(results)

    print(result_json)

if __name__ == "__main__":
    asyncio.run(main())
