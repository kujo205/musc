import ytmusicapi
import argparse
from headers import get_raw_headers

def update_playlist(cookie,playlist_id):
    headers_dict = get_raw_headers(cookie)
    ytmusic = ytmusicapi.YTMusic(auth=headers_dict)
    res = ytmusic.delete_playlist(playlistId=playlist_id)
    return res


if __name__ == "__main__":
    parser = argparse.ArgumentParser()

    parser.add_argument('cookie', type=str, help='The cookie string for authentication.')
    parser.add_argument('playlist_id', type=str,  help='Id of the playlist.')


    args = parser.parse_args()

    print(args)

    res = update_playlist(args.cookie, args.playlist_id)

    print(res)
