import ytmusicapi
import argparse
from headers import get_raw_headers

def update_playlist(cookie,playlist_id, description, name):
    headers_dict = get_raw_headers(cookie)
    ytmusic = ytmusicapi.YTMusic(auth=headers_dict)
    res = ytmusic.edit_playlist(playlistId=playlist_id, title=name, description=description)
    return res


if __name__ == "__main__":
    parser = argparse.ArgumentParser()

    parser.add_argument('cookie', type=str, help='The cookie string for authentication.')
    parser.add_argument('playlist_id', type=str,  help='Id of the playlist.')
    parser.add_argument('description', type=str,  help='Description of the playlist.')
    parser.add_argument('name', type=str,  help='Name of the playlist.')


    args = parser.parse_args()

    print(args)

    res = update_playlist(args.cookie, args.playlist_id, args.description,args.name)

    print(res)
