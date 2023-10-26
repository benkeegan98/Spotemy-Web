import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {Container, Image, LogoHeader, PercentageCircle, Text} from '../../../components';
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

    const onClickArtist = (id: string) => {
        router.push(`/artist/${id}`);
    }

    const openSpotify = () => {
        const newTab: Window = window.open('', '_blank');
        newTab.location = artist!.external_urls.spotify;
    }

    if (!artist) {
        return null;
    }

    return (
        <Container centerX padding={30}>

            <LogoHeader />

            <Container
                backgroundColor={BLACK}
                borderRadius={10}
                width={100}
                height={100}
                padding={30}
            >
                <div className="artist-page__header">
                    <Image onClick={() => openSpotify()} className="artist-page__img" src={artist.images[0].url} height={150} width={150} circular />

                    <Text className="artist-page__name" color={WHITE} size={40} padding={{ bottom: 5, }}>{artist.name}</Text>
                    <PercentageCircle percent={artist.popularity} />
                    <Container className="artist-page__genres" horizontal>
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
                </div>

                <Container width={100} paddingY={10}>
                    <Text color={WHITE} size={30} padding={{ bottom: 10}}>Top Tracks</Text>
                    <Container
                        borderRadius={15}
                        horizontal
                        scroll
                        width={'auto'}
                    >
                        {topTracks && topTracks.map((track: SpotifyApi.TrackObjectFull, i: number) => (
                            <Container
                                key={i}
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
                        ))}
                    </Container>
                </Container>

                <Container width={100} paddingY={10}>
                    <Text color={WHITE} size={30} padding={{ bottom: 10}}>Related Artists</Text>
                    <Container
                        borderRadius={15}
                        horizontal
                        scroll
                        width={'auto'}
                    >
                        {relatedArtists && relatedArtists.map((artist: SpotifyApi.ArtistObjectFull, i: number) => (
                            <Container
                                key={i}
                                horizontal
                                borderRadius={15}
                                padding={5}
                                centerY
                                centerX
                                minWidth="200px"
                                maxHeight="100px"
                                onClick={() => onClickArtist(artist.id)}
                            >
                                <Image
                                    src={artist.images[0].url}
                                    height={80}
                                    width={80}
                                    circular
                                />
                                <Container paddingX={10}>
                                    <Text color={WHITE} size={16}>{artist.name}</Text>
                                </Container>
                            </Container>
                        ))}
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
    const [relatedArtists, setRelatedArtists] = useState<null | SpotifyApi.ArtistObjectFull[]>(null);

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
            .then((artistRelatedArtists: SpotifyApi.ArtistsRelatedArtistsResponse) => setRelatedArtists(artistRelatedArtists.artists))
    }

    return { artist, topTracks, relatedArtists };
}