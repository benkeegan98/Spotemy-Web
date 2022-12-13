import { useRouter } from 'next/router';
import { useEffect, useState, useCallback, useMemo } from "react";
import { Button, Container, Image, Text } from "../components";
import { GREEN, WHITE, BLACK } from "../styles/colors";
import spotify from "../spotify/api";

type TopArtistsPanelProps = {

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

const TopArtistsPanel = (props: TopArtistsPanelProps) => {

    const router = useRouter();

    const [activeTimeRange, setActiveTimeRange] = useState<TimeFrame>(timeFrames.MEDIUM);

    const topArtists = useTopArtists(activeTimeRange);

    const onClickArtist = (id: string) => {
        router.push(`/artist/${id}`);
    }

    if(!topArtists) {
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
                <Text color={WHITE} size={30}>Top Artists</Text>
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
                            <Text color={activeTimeRange === timeFrame ? "" : WHITE}>{timeFrame.label}</Text>
                        </Button>
                    ))}
                </Container>
            </Container>
            <Container horizontal scroll>
                {topArtists && topArtists.items && topArtists.items.map((artist, index) => (
                    <Container
                        key={index}
                        borderRadius={5}
                        onClick={() => onClickArtist(artist.id)}
                    >
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
                            <Text color={WHITE}>{(index + 1).toString() + ''}</Text>
                        </Container>
                        <Image
                            height={150}
                            width={150}
                            src={artist.images[0].url}
                            padding={{
                                right: 5
                            }}
                        />
                        <Text
                            color={WHITE}
                            paddingY={5}
                        >{artist.name}</Text>
                    </Container>
                ))}
            </Container>
        </Container>
    )

}

export default TopArtistsPanel;

const useTopArtists = (activeTimeRange: TimeFrame) => {
    const [topArtists, setTopArtists] = useState<null | SpotifyApi.UsersTopArtistsResponse>(null);

    useEffect(() => {
        console.log("CALLED FETCH ARTISTS: ", activeTimeRange.id)
        fetchTopArtists()
    }, [activeTimeRange])

    const fetchTopArtists = async () => {

        spotify.getMyTopArtists({ time_range: activeTimeRange.id })
            .then((artists: SpotifyApi.UsersTopArtistsResponse) => {
                setTopArtists(artists);
            })
            .catch(err => {
                console.log("Failed to get artists");
            })
    }

    return topArtists
}