import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Container, Image, LogoHeader, Text } from '../../../components';
import { BLACK, WHITE, GREEN_LIGHT_20 } from '../../../styles/colors';
import spotify from '../../../spotify/api';
import { IoMusicalNotesSharp, IoPerson } from 'react-icons/io5';
import { MdPublic, MdPublicOff } from 'react-icons/md';
import { RiDiscFill } from 'react-icons/ri';

const PlaylistPage = () => {
    const router = useRouter();

    const playlistId = router.query.id as string;
    const playlist = usePlaylist(playlistId);

    console.log("PLAYLIST: ", playlist)

    if (!playlist) {
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
                <Container horizontal padding={{ bottom: 20 }}>
                    <Image height={150} width={150} src={playlist.images[0].url}/>
                    <Container width={100} paddingX={15}>
                        <Container padding={{ bottom: 20, }}>
                            <Text color={WHITE} size={40} padding={{ bottom: 5, }}>{playlist.name}</Text>
                            {playlist.description ? (
                                <Text color={GREEN_LIGHT_20}>{playlist.description}</Text>
                            ) : null} 
                        </Container>
                        
                        <Container horizontal centerY width={50} justifyContent="space-between">
                            <Container horizontal>
                                <IoMusicalNotesSharp size={30}/>
                                <Text color={WHITE} size={20} paddingX={10}>{`${playlist.tracks.total} track${playlist.tracks.total === 1 ? '' : 's'}`}</Text>
                            </Container>
                            <Container horizontal>
                                {playlist.public ? <MdPublic size={30}/> : <MdPublicOff size={30}/>}
                                <Text color={WHITE} size={20} paddingX={10}>{playlist.public ? "Public" : "Private"}</Text>
                            </Container>
                            <Container horizontal>
                                <IoPerson size={30}/>
                                <Text color={WHITE} size={20} paddingX={10}>{`${playlist.followers.total} follower${playlist.followers.total === 1 ? '' : 's'}`}</Text>
                            </Container>
                            

                        </Container>
                    </Container>
                </Container>
                

                <Container scroll height="full-screen">
                    {playlist.tracks.items.map((song: SpotifyApi.PlaylistTrackObject, index: number) => {
                        const track = song.track as SpotifyApi.TrackObjectFull;
                        return (
                            <Container
                                key={index}
                                horizontal
                                marginY={5}
                                centerY
                                onClick={() => console.log(track)}>
                                <Image
                                    src={track.album.images[0].url}
                                    height={80}
                                    width={80}
                                />
                                <Container paddingX={10}>
                                    <Text size={20} color={WHITE} padding={{ bottom: 5 }}>{track.name}</Text>
                                    <Container horizontal centerY>
                                        <IoPerson />
                                        <Text paddingX={5}>{track.artists[0].name}</Text>
                                    </Container>
                                    <Container horizontal centerY>
                                        <RiDiscFill />
                                        <Text color={WHITE} paddingX={5}>{track.album.name}</Text>
                                    </Container>
                                    
                                    
                                </Container>
                            </Container>
                        )
                    })}
                </Container>
            </Container>

        </Container>
    )
}

export default PlaylistPage;

const usePlaylist = (id: string) => {

    const [playlist, setPlaylist] = useState<null | SpotifyApi.SinglePlaylistResponse>(null)

    useEffect(() => {
        if (id) {
            fetchPlaylist(id)
        }
    }, [id])

    const fetchPlaylist = async (playlistId: string) => {
        spotify.getPlaylist(playlistId)
            .then((playlistData: SpotifyApi.SinglePlaylistResponse) => {
                setPlaylist(playlistData)
            })
    }

    return playlist;
}