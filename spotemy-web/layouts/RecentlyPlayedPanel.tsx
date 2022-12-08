import { useEffect, useState, useCallback, useMemo } from "react";
import { Button, Container, Image, Text } from "../components";
import { GREEN } from "../styles/colors";
import spotify from "../spotify/api";

type RecentlyPlayedPanelProps = {

}

const RecentlyPlayedPanel = (props: RecentlyPlayedPanelProps) => {

    const recentlyPlayedTracks = useRecentlyPlayed();

    if(!recentlyPlayedTracks) {
        return null;
    }

    else return (
        <Container
            backgroundColor="black"
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
                <Text color="white" size={30}>Recently Played</Text>
            </Container>
            <Container horizontal scroll>
                {recentlyPlayedTracks && recentlyPlayedTracks.tracks && recentlyPlayedTracks.tracks.map((track: SpotifyApi.TrackObjectFull, index: number) => (
                    <Container key={index}>
                        <Image
                            height={150}
                            width={150}
                            src={track.album.images[0].url}
                            padding={{
                                right: 5
                            }}
                        />
                        <Text
                            color="white"
                        >{track.name}</Text>
                        <Text
                        >{track.artists[0].name}</Text>
                        <Text
                            color="white"
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