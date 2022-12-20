import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Container, Image, LogoHeader, Text, PopularityFlame } from '../../../components';
import { BLACK, WHITE, GREY_20, GREEN_LIGHT_20, GREEN_LIGHT_40, GREEN_LIGHT_80, GREEN_LIGHT_60, GREY_80 } from '../../../styles/colors';
import spotify from '../../../spotify/api';
import { getDurationString } from '../../../utils';

const ArtistPage = () => {
    const router = useRouter();

    const artistId = router.query.id as string;
    const { artist, topTracks, relatedArtists } = useArtist(artistId);

    console.log("ARTIST: ", artist);
    console.log("TOP TRACKS: ", topTracks);
    console.log("RELATED ARTISTS: ", relatedArtists);

    const onClickSong = (id: string) => {
        router.push(`/song/${id}`);
    }

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
                <Container horizontal width={100}>
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
                                    <Container key={i} horizontal centerY>
                                        <Text>{genre}</Text>
                                        {i !== artist.genres.length - 1 ? (
                                            <Text paddingX={10} size={30} color={WHITE}>·</Text>
                                        ) : null}
                                    </Container>
                                )
                            })}
                        </Container>
                    </Container>
                </Container>

                <Container width={100} paddingY={10}>
                    <Text color={WHITE} size={30} padding={{ bottom: 10}}>Top Tracks</Text>
                    <Container
                        borderRadius={15}
                        horizontal
                        scroll
                        width={'auto'}
                    >
                        {topTracks ? topTracks.map((track: SpotifyApi.TrackObjectFull, i: number) => (
                            <Container
                                horizontal
                                borderRadius={15}
                                padding={5}
                                centerY
                                centerX
                                minWidth="200px"
                                maxHeight="100px"
                                onClick={() => onClickSong(track.id)}
                            >
                                <Image 
                                    src={track.album.images[0].url}
                                    height={80}
                                    width={80}
                                    circular
                                />
                                <Container paddingX={10}>
                                    <Text color={WHITE} size={16}>{track.name}</Text>
                                    <Text>{getDurationString(track.duration_ms)}</Text>
                                </Container>
                            </Container>
                        )) : null}
                    </Container>
                </Container>
            </Container>

        </Container>
    )
}

export default ArtistPage;

const useArtist = (id: string) => {

    const [artist, setArtist] = useState<null | SpotifyApi.SingleArtistResponse>(null);
    const [topTracks, setTopTracks] = useState<null | SpotifyApi.TrackObjectFull[]>(null);
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
                setTopTracks(artistTopTracks.tracks)
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