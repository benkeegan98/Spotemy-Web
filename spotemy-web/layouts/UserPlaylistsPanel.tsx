import { useEffect, useState } from "react";
import { Container, Image, Text } from "../components";
import { BLACK, WHITE } from "../styles/colors";
import spotify from "../spotify/api";
import { useRouter } from "next/router";
import { useDesktopBreakpoints } from "../hooks";

type UserPlaylistsPanelProps = {

}

const UserPlaylistsPanel = (props: UserPlaylistsPanelProps) => {

    const router = useRouter();
    const isDesktop = useDesktopBreakpoints();

    const likedSongs = useLikedSongs();
    const playlists = useMyPlaylists();

    const onClickPlaylist = (id: string) => {
        router.push(`/playlist/${id}`)
    }

    return (
        <Container
            backgroundColor={BLACK}
            borderRadius={20}
            height={100}
            width={100}
            padding={10}
        >
            <Text
                color={WHITE}
                size={30}
                padding={{
                    bottom: 10
                }}
            >My Playlists</Text>
            <Container
                scroll
                horizontal={!isDesktop}
            >
                {likedSongs && likedSongs.items && (
                    <Container
                        height="auto"
                        width={100}
                        horizontal={isDesktop}
                        padding={{
                            bottom: 5,
                            right: isDesktop ? 0 : 5
                        }}
                        borderRadius={5}
                        onClick={() => console.log('albums')}
                    >
                        <Container
                            height={isDesktop ? "100px" : "150px"}
                            width={isDesktop ? "100px" : "150px"}
                            horizontal
                            wrap
                            
                        >
                            {likedSongs.items.slice(0,4).map((track: SpotifyApi.SavedTrackObject, key: number) => (
                                <Image
                                    key={key}
                                    src={track.track.album.images[0].url}
                                    height={isDesktop ? 50 : 75}
                                    width={isDesktop ? 50 : 75}
                                />
                            ))}
                        </Container>
                        <Container
                            centerY
                            padding={{
                                left: 10,
                            }}
                        >
                            <Text color={WHITE}>Liked Songs</Text>
                            <Text>{`${likedSongs.total} track${likedSongs.total !== 1 ? 's' : ''}`}</Text>
                        </Container>
                    </Container>
                )}

                {playlists && playlists.items && playlists.items.map((playlist: SpotifyApi.PlaylistObjectSimplified, index: number) => (
                    <Container
                        height="auto"
                        width={isDesktop ? 100 : 150}
                        horizontal={isDesktop}
                        padding={{
                            bottom: 5,
                            right: isDesktop ? 0 : 5
                        }}
                        borderRadius={5}
                        onClick={() => onClickPlaylist(playlist.id)}
                    >
                        <Image
                            src={playlist.images[0].url}
                            height={isDesktop ? 100 : 150}
                            width={isDesktop ? 100 : 150}
                        />
                        <Container
                            centerY
                            padding={{
                                left: 10,
                            }}
                        >
                            <Text color={WHITE}>{playlist.name}</Text>
                            <Text>{`${playlist.tracks.total} track${playlist.tracks.total !== 1 ? 's' : ''}`}</Text>
                        </Container>
                    </Container>
                ))}
            </Container>
        </Container>
    )
}

export default UserPlaylistsPanel;

const useLikedSongs = () => {
    const [likedSongs, setLikedSongs] = useState<null | SpotifyApi.UsersSavedTracksResponse>(null);

    useEffect(() => {
        
        fetchLikedSongs();

    }, [])

    const fetchLikedSongs = async () => {
        spotify.getMySavedTracks()
            .then((tracks: SpotifyApi.UsersSavedTracksResponse) => {
                setLikedSongs(tracks);
            })
            .catch(err => {
                alert("Failed to get playlists");
            })
    }

    return likedSongs;

}

const useMyPlaylists = () => {

    const [playlists, setPlaylists] = useState<null | SpotifyApi.ListOfUsersPlaylistsResponse>(null);

    useEffect(() => {
        
        fetchPlaylists();

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

    return playlists;

}