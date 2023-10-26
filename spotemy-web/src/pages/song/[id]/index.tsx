import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Container, Image, LogoHeader, Text } from '../../../components';
import { BLACK, WHITE, GREY_20, GREEN_LIGHT_20, GREEN_LIGHT_40, GREEN_LIGHT_80, GREEN_LIGHT_60, GREY_80 } from '../../../styles/colors';
import spotify from '../../../spotify/api';
import { getDurationString } from '../../../utils';
import { IoTime } from 'react-icons/io5';
import { RiDiscFill } from 'react-icons/ri';

const TrackPage = () => {
    const router = useRouter();

    const trackId = router.query.id as string;

    const { track, artists, audioFeatures, audioAnalysis } = useTrack(trackId);

    console.log("Track: ", track);
    console.log("ARTISTS: ", artists);
    console.log("Audio features: ", audioFeatures);
    console.log("Audio analysis: ", audioAnalysis);

    const onClickArtist = (id: string) => {
        router.push(`/artist/${id}`)
    }

    if (!track) {
        return null;
    }

    return (
        <Container
            centerX
            padding={30}
            width={100}
        >
            <LogoHeader />

            <Container
                backgroundColor={BLACK}
                borderRadius={10}
                width={100}
                height={100}
                padding={30}
            >

                <Container horizontal width={100}>
                    <Image src={track.album.images[0].url} height={150} width={150} />
                    <Container paddingX={15}>
                        <Text color={WHITE} size={40} padding={{ bottom: 5, }}>{track.name}</Text>
                        <Container horizontal>
                            {artists && artists.map((artist: SpotifyApi.ArtistObjectFull, i: number) => (
                                <Container
                                    key={i}
                                    horizontal
                                    centerY
                                    padding={5}
                                    marginX={5}
                                    borderRadius={10}
                                    onClick={() => onClickArtist(artist.id)}
                                >
                                    <Image src={artist.images[0].url} height={50} width={50} circular />
                                    <Text color={WHITE} padding={{ left: 10 }}>{artist.name}</Text>
                                
                                </Container>
                            ))}
                        </Container>
                        <Container horizontal padding={10}>
                            <Container horizontal centerY margin={{ right: 5 }}>
                                <IoTime size={20}/>
                                <Text paddingX={5} color={WHITE}>{getDurationString(track.duration_ms)}</Text>
                            </Container>
                            <Container horizontal centerY>
                                <RiDiscFill size={20} />
                                <Text paddingX={5} color={WHITE}>{track.album.name}</Text>
                            </Container>
                        </Container>
                    </Container>
                </Container>

                <Container>
                    
                </Container>
            </Container>
        </Container>
    )
}

export default TrackPage;

const useTrack = (id: string) => {

    const [track, setTrack] = useState<SpotifyApi.TrackObjectFull | null>(null);
    const [artists, setArtists] = useState<SpotifyApi.ArtistObjectFull[] | null>(null);
    const [audioFeatures, setAudioFeatures] = useState<SpotifyApi.AudioFeaturesObject | null>(null);
    const [audioAnalysis, setAudioAnalysis] = useState<SpotifyApi.AudioAnalysisResponse | null>(null);

    useEffect(() => {
        if (id) {
            fetchTrack(id);
            fetchAudioFeatures(id);
            fetchAudioAnalysis(id);
        }
    }, [id])

    const fetchTrack = async (trackId: string) => {
        spotify.getTrack(trackId)
            .then((trackData: SpotifyApi.SingleTrackResponse) => {
                setTrack(trackData);
                fetchArtistsByIds(trackData.artists.map((artist: SpotifyApi.ArtistObjectSimplified) => artist.id));
            })
    }

    const fetchArtistsByIds = async (artistIds: string[]) => {
        spotify.getArtists(artistIds)
            .then((artistData: SpotifyApi.MultipleArtistsResponse) => setArtists(artistData.artists));
    }

    const fetchAudioFeatures = async (trackId: string) => {
        spotify.getAudioFeaturesForTrack(trackId)
            .then((trackAudioFeatures: SpotifyApi.AudioFeaturesObject) => setAudioFeatures(trackAudioFeatures))
    }

    const fetchAudioAnalysis = async (trackId: string) => {
        spotify.getAudioAnalysisForTrack(trackId)
            .then((trackAudioAnalysis: SpotifyApi.AudioAnalysisResponse) => setAudioAnalysis(trackAudioAnalysis))
    }

    return { track, artists, audioFeatures, audioAnalysis }
}