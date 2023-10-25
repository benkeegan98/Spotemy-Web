import { useRouter } from 'next/router';
import { useEffect, useState, useCallback, useMemo } from "react";
import { Button, Container, Image, Text } from "../components";
import { GREEN, WHITE, BLACK } from "../styles/colors";
import spotify from "../spotify/api";
import {IoPersonSharp} from "react-icons/io5";

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
        <>
            <div className="dashboard-stats-panel__header">
                <div className="dashboard-stats-panel__icon-title">
                    <IoPersonSharp size={30}/>
                    <Text color={WHITE} size={30}>Top Artists</Text>
                </div>
                <div className="dashboard-stats-panel__time-controls">
                    {Object.values(timeFrames).map((timeFrame: TimeFrame, index: number) => (
                        <Button
                            variant={activeTimeRange === timeFrame ? "secondary" : "primary"}
                            key={index}
                            onClick={() => setActiveTimeRange(timeFrame)}
                            padding={10}
                        >
                            <Text color={activeTimeRange === timeFrame ? "" : WHITE}>{timeFrame.label}</Text>
                        </Button>
                    ))}
                </div>
            </div>
            <div className="dashboard-stats-panel__right-panel-list">
                {topArtists && topArtists.items && topArtists.items.map((artist, index) => (
                    <div className="dashboard-stats-panel__list-item"
                         key={index}
                         onClick={() => onClickArtist(artist.id)}
                    >
                        <Container
                            className="dashboard-stats-panel__list-item-rank-circle"
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
                            height={100}
                            width={100}
                            src={artist.images[0].url}
                            padding={{
                                right: 5
                            }}
                        />
                        <div className="dashboard-stats-panel__list-item-text">
                            <Text
                                color={WHITE}
                                paddingY={5}
                            >{artist.name}</Text>
                        </div>
                    </div>
                ))}
            </div>
        </>
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