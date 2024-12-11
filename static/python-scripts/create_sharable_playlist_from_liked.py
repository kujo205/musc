import ytmusicapi
import argparse
from headers import get_raw_headers


def create_sharable_playlist(cookie, playlist_name='Liked Music', playlist_description='Music I liked'):
    """
    Create a sharable playlist for a user.

    :param cookie: str
      The cookie string for authentication.

    :return: None
    """

    headers_dict = get_raw_headers(cookie)

    ytmusic = ytmusicapi.YTMusic(auth=headers_dict)
    id = ytmusic.create_playlist(playlist_name, playlist_description, 'PUBLIC',source_playlist='LM')

    print(id)


if __name__ == "__main__":
    """
    Accept arguments from the command line.
    """
    parser = argparse.ArgumentParser(description='Create a sharable playlist for a user.')
    parser.add_argument('cookie', type=str, help='The cookie string for authentication.')
    parser.add_argument('playlist_name', type=str, nargs='?', default='Liked Music', help='The name of the playlist.')
    parser.add_argument('playlist_description', type=str, nargs='?', default='Music I liked', help='The description of the playlist.')

    args = parser.parse_args()

    create_sharable_playlist(args.cookie, args.playlist_name, args.playlist_description)
