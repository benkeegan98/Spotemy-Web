import { useEffect, useState, useCallback, useMemo } from "react";
import { Button, Container, Image, Text } from "../components";
import { GREEN } from "../styles/colors";
import spotify from "../spotify/api";

type TopSongsPanelProps = {

}

type TimeFrame = {
    label: string,
    id: string
}

const timeFrames = {
    SHORT: {
        label: "4 weeks",
        id: 'short_term'
    },
    MEDIUM: {
        label: "6 months",
        id: 'medium_term'
    },
    LONG: {
        label: "All time",
        id: 'long_term'
    }
}

const TopSongsPanel = (props: TopSongsPanelProps) => {

    const [activeTimeRange, setActiveTimeRange] = useState<TimeFrame>(timeFrames.MEDIUM);

    const topSongs = useTopSongs(activeTimeRange);

    if(!topSongs) {
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
                <Text color="white" size={30}>Top Songs</Text>
                <Container
                    horizontal
                >
                    {Object.values(timeFrames).map((timeFrame: TimeFrame, index: number) => (
                        <Button
                            variant={activeTimeRange === timeFrame ? "secondary" : "primary"}
                            key={index}
                            onClick={() => setActiveTimeRange(timeFrame)}
                            margin={{
                                left: 5
                            }}
                            padding={10}
                        >
                            <Text color={activeTimeRange === timeFrame ? "" : "white"}>{timeFrame.label}</Text>
                        </Button>
                    ))}
                </Container>
            </Container>
            <Container horizontal scroll>
                {topSongs && topSongs.items && topSongs.items.map((song, index) => (
                    <Container key={index}>
                        <Container
                            backgroundColor={GREEN}
                            height="25px"
                            width="25px"
                            centerX
                            centerY
                            borderRadius={50}
                            relative={{ top: "2px", left: "2px" }}
                            margin={{ bottom: -25 }}
                        >
                            <Text color="white">{(index + 1).toString() + ''}</Text>
                        </Container>
                        <Image
                            height={150}
                            width={150}
                            src={song.album.images[0].url}
                            padding={{
                                right: 5
                            }}
                        />
                        <Container paddingX={2}>
                        <Text
                            color="white"
                        >{song.name}</Text>
                        <Text
                        >{song.artists[0].name}</Text>
                        <Text
                            color="white"
                        >{song.album.name}</Text>
                        </Container>
                        
                    </Container>
                ))}
            </Container>
        </Container>
    )

}

export default TopSongsPanel;

const useTopSongs = (activeTimeRange: TimeFrame) => {
    const [topSongs, setTopSongs] = useState<null | SpotifyApi.UsersTopTracksResponse>(null);

    useEffect(() => {
        fetchTopSongs()
    }, [activeTimeRange])

    const fetchTopSongs = async () => {

        spotify.getMyTopTracks({ time_range: activeTimeRange.id })
            .then((songs: SpotifyApi.UsersTopTracksResponse) => {
                setTopSongs(songs);
            })
            .catch(err => {
                console.log("Failed to get tracks");
            })
    }

    return topSongs;
}