import { useEffect, useState } from "react";
import { Container, Image, Text } from "../components";
import { BLACK, WHITE } from "../styles/colors";
import spotify from "../spotify/api";
import { useRouter } from "next/router";
import { useDesktopBreakpoints } from "../hooks";
import {RiDiscFill} from "react-icons/ri";

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
        <>
            <div className="dashboard-stats-panel__header">
                <div className="dashboard-stats-panel__icon-title">
                    <RiDiscFill size={30}/>
                    <Text color={WHITE} size={30} padding={{ bottom: 10 }}>My Playlists</Text>
                </div>
            </div>
            <div className="playlists__list">
                {likedSongs && likedSongs.items && (
                    <div className="playlist-item" onClick={() => console.log(likedSongs)}>
                        <div className="playlist-item__liked-songs-thumbnail">
                            {likedSongs.items.slice(0,4).map((track: SpotifyApi.SavedTrackObject, key: number) => (
                                <Image
                                    key={key}
                                    src={track.track.album.images[0].url}
                                    height={75}
                                    width={75}
                                />
                            ))}
                        </div>
                        <div className="playlist-item__label">
                            <Text color={WHITE}>Liked Songs</Text>
                            <Text>{`${likedSongs.total} track${likedSongs.total !== 1 ? 's' : ''}`}</Text>
                        </div>
                    </div>
                )}

                {playlists && playlists.items && playlists.items.map((playlist: SpotifyApi.PlaylistObjectSimplified, index: number) => (
                    <div
                        key={index}
                        className="playlist-item"
                        onClick={() => onClickPlaylist(playlist.id)}
                    >
                        <div className="playlist-item__thumbnail">
                            <Image
                                src={playlist.images[0].url}
                                height={150}
                                width={150}
                            />
                        </div>
                        <div className="playlist-item__label">
                            <Text color={WHITE}>{playlist.name}</Text>
                            <Text>{`${playlist.tracks.total} track${playlist.tracks.total !== 1 ? 's' : ''}`}</Text>
                        </div>
                    </div>
                ))}
            </div>
        </>
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