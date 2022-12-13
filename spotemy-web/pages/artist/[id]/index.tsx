import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Container, Image, LogoHeader, Text } from '../../../components';
import { BLACK, WHITE, GREEN_LIGHT_20, GREEN_LIGHT_40, GREEN_LIGHT_80, GREEN_LIGHT_60 } from '../../../styles/colors';
import spotify from '../../../spotify/api';
import { AiFillFire } from 'react-icons/ai';
import SpotifyWebApi from 'spotify-web-api-js';

const ArtistPage = () => {
    const router = useRouter();

    const artistId = router.query.id as string;
    const { artist, topTracks, relatedArtists } = useArtist(artistId);

    console.log("ARTIST: ", artist);
    console.log("TOP TRACKS: ", topTracks);
    console.log("RELATED ARTISTS: ", relatedArtists);

    if (!artist) {
        return null;
    }

    return (
        <Container
            centerX
            padding={30}
        >

            <LogoHeader />

            <Container
                backgroundColor={BLACK}
                borderRadius={10}
                width={100}
                height={100}
                padding={30}
            >
                <Container horizontal>
                    <Image src={artist.images[0].url} height={150} width={150} circular />
                    <Container width={100} paddingX={15}>
                        <Container horizontal justifyContent='space-between'>
                            <Text color={WHITE} size={40} padding={{ bottom: 5, }}>{artist.name}</Text>
                            <PopularityFlame score={artist.popularity} size="small" />
                        </Container>
                        <Container horizontal>
                            {artist.genres.map((genre: string, i: number) => {
                                genre = genre.split(" ").map(word => word[0].toUpperCase() + word.substring(1)).join(" ");
                                return (
                                    <Container horizontal centerY>
                                        <Text>{genre}</Text>
                                        {i !== artist.genres.length - 1 ? (
                                            <Text paddingX={10} size={30} color={WHITE}>·</Text>
                                        ) : null}
                                    </Container>
                                )
                            })}
                        </Container>
                        <Container>
                        </Container>
                        
                    </Container>
                </Container>
            </Container>

        </Container>
    )
}

export default ArtistPage;

type PopularityFlameProps = {
    score: number,
    size?: 'large' | 'small',
}

const PopularityFlame = ({
    score,
    size = 'small'
}: PopularityFlameProps) => {

    const getColor = (score: number) => {
        if (score >= 90) {
            return 'red';
        }

        if (score >= 70) {
            return 'orange';
        }

        if (score >= 45) {
            return 'red';
        }

        if (score >= 30) {
            return GREEN_LIGHT_20;
        }

        if (score >= 20) {
            return GREEN_LIGHT_40;
        }

        if (score >= 10) {
            return GREEN_LIGHT_60;
        }
    }

    const color = getColor(score);
    const iconSize = size === 'large' ? 100 : 60;
    const textSize = size === 'large' ? 38 : 20;
    const textPosition = size === 'large' ? '-58px' : '-33px';

    return (
        <Container width={'fit-content'} centerX centerY>
            <AiFillFire color={color} size={iconSize} />
            <Container relative={{ top: textPosition }}>
                <Text size={textSize} color={WHITE}>{score}</Text>
            </Container>
            
        </Container>
    )
}


const useArtist = (id: string) => {

    const [artist, setArtist] = useState<null | SpotifyApi.SingleArtistResponse>(null);
    const [topTracks, setTopTracks] = useState<null | SpotifyApi.ArtistsTopTracksResponse>(null);
    const [relatedArtists, setRelatedArtists] = useState<null | SpotifyApi.ArtistsRelatedArtistsResponse>(null);

    useEffect(() => {
        if (id) {
            fetchArtist(id),
            fetchTopTracks(id),
            fetchRelatedArtists(id)
        }
    }, [id])

    const fetchArtist = async (artistId: string) => {
        spotify.getArtist(artistId)
            .then((artistData: SpotifyApi.SingleArtistResponse) => setArtist(artistData))

    }

    const fetchTopTracks = async (artistId: string) => {
        spotify.getArtistTopTracks(artistId, 'US')
            .then((artistTopTracks: SpotifyApi.ArtistsTopTracksResponse) => {
                console.log
                setTopTracks(artistTopTracks)
            })
            .catch((error ) => {
                console.error("ERROR: ", error)
            })
    }

    const fetchRelatedArtists = async (artistId: string) => {
        spotify.getArtistRelatedArtists(artistId)
            .then((artistRelatedArtists: SpotifyApi.ArtistsRelatedArtistsResponse) => setRelatedArtists(artistRelatedArtists))
    }

    return { artist, topTracks, relatedArtists };
}