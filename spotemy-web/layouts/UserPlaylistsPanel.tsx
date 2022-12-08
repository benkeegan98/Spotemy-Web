import { useEffect, useState } from "react";
import { Container, Image, Text } from "../components";
import spotify from "../spotify/api";

type UserPlaylistsPanelProps = {

}

const UserPlaylistsPanel = (props: UserPlaylistsPanelProps) => {

    const [likedSongs, setLikedSongs] = useState<null | SpotifyApi.UsersSavedTracksResponse>(null);
    const [playlists, setPlaylists] = useState<null | SpotifyApi.ListOfUsersPlaylistsResponse>(null);

    useEffect(() => {
        
        fetchPlaylists();
        fetchLikedSongs();

    }, [])

    const fetchPlaylists = async () => {
        spotify.getUserPlaylists()
            .then((playlistData: SpotifyApi.ListOfUsersPlaylistsResponse) => {
                setPlaylists(playlistData);
            })
            .catch(err => {
                console.log("Failed to get playlists");
            })
    }

    const fetchLikedSongs = async () => {
        spotify.getMySavedTracks()
            .then((tracks: SpotifyApi.UsersSavedTracksResponse) => {
                setLikedSongs(tracks);
            })
            .catch(err => {
                alert("Failed to get playlists");
            })
    }
    
    return (
        <Container
            backgroundColor="black"
            borderRadius={20}
            height={100}
            width={100}
            padding={10}
        >
            <Text
                color="white"
                size={30}
                padding={{
                    bottom: 10
                }}
            >My Playlists</Text>
            <Container scroll>
                {likedSongs && likedSongs.items && (
                    <Container
                        height="auto"
                        width={100}
                        horizontal
                        padding={{
                            bottom: 5,
                        }}
                    >
                        <Image
                            src={likedSongs.items[0].track.album.images[0].url}
                            height={100}
                            width={100}
                        />
                        <Container
                            centerY
                            padding={{
                                left: 10,
                            }}
                        >
                            <Text color="white">Liked Songs</Text>
                            <Text>{`${likedSongs.total} track${likedSongs.total !== 1 ? 's' : ''}`}</Text>
                        </Container>
                    </Container>
                )}

                {playlists && playlists.items && playlists.items.map((playlist: SpotifyApi.PlaylistObjectSimplified, index: number) => (
                    <Container
                        height="auto"
                        width={100}
                        horizontal
                        padding={{
                            bottom: 5,
                        }}
                    >
                        <Image
                            src={playlist.images[0].url}
                            height={100}
                            width={100}
                        />
                        <Container
                            centerY
                            padding={{
                                left: 10,
                            }}
                        >
                            <Text color="white">{playlist.name}</Text>
                            <Text>{`${playlist.tracks.total} track${playlist.tracks.total !== 1 ? 's' : ''}`}</Text>
                        </Container>
                    </Container>
                ))}
            </Container>
        </Container>
    )
}

export default UserPlaylistsPanel;