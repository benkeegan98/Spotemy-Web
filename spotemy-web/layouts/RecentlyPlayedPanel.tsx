import { useEffect, useState, useCallback, useMemo } from "react";
import { Button, Container, Image, Text } from "../components";
import { BLACK, GREEN, WHITE } from "../styles/colors";
import spotify from "../spotify/api";
import { useRouter } from "next/router";

type RecentlyPlayedPanelProps = {

}

const RecentlyPlayedPanel = (props: RecentlyPlayedPanelProps) => {

    const router = useRouter();

    const recentlyPlayedTracks = useRecentlyPlayed();

    const onClickSong = (id: string) => {
        router.push(`/song/${id}`)
    }

    if(!recentlyPlayedTracks) {
        return null;
    }

    else return (
        <Container
            backgroundColor={BLACK}
            borderRadius={20}
            height={100}
            width={100}
            padding={10}
        >
            <Container
                horizontal
                justifyContent="space-between"
                padding={{
                    bottom: 10
                }}
            >
                <Text color={WHITE} size={30}>Recently Played</Text>
            </Container>
            <Container horizontal scroll>
                {recentlyPlayedTracks && recentlyPlayedTracks.tracks && recentlyPlayedTracks.tracks.map((track: SpotifyApi.TrackObjectFull, index: number) => (
                    <Container
                        key={index}
                        borderRadius={5}
                        onClick={() => onClickSong(track.id)}
                    >
                        <Image
                            height={150}
                            width={150}
                            src={track.album.images[0].url}
                            padding={{
                                right: 5
                            }}
                        />
                        <Text
                            color={WHITE}
                        >{track.name}</Text>
                        <Text
                        >{track.artists[0].name}</Text>
                        <Text
                            color={WHITE}
                        >{track.album.name}</Text>
                        
                    </Container>
                ))}
            </Container>
        </Container>
    )

}

export default RecentlyPlayedPanel;

const useRecentlyPlayed = () => {
    const [recentlyPlayed, setRecentlyPlayed] = useState<null | SpotifyApi.MultipleTracksResponse>(null);

    useEffect(() => {
        fetchRecentlyPlayed()
    }, [])

    const fetchRecentlyPlayed = async () => {

        spotify.getMyRecentlyPlayedTracks()
            .then((tracks: SpotifyApi.UsersRecentlyPlayedTracksResponse)  => {
                return tracks.items.map((track: SpotifyApi.PlayHistoryObject ) => track.track.id)
            })
            .then((trackIds: string[]) => {
                return spotify.getTracks(trackIds);
            })
            .then((tracks: SpotifyApi.MultipleTracksResponse ) => {
                setRecentlyPlayed(tracks)
            })
            .catch(err => {
                alert("Failed to get recently played");
            })
    }

    return recentlyPlayed;
}