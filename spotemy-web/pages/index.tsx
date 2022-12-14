import { useContext, useEffect, useState } from 'react'
import { Container, Text, Button, Image, LogoHeader } from '../components'
import RecentlyPlayedPanel from '../layouts/RecentlyPlayedPanel'
import TopArtistsPanel from '../layouts/TopArtistsPanel'
import TopSongsPanel from '../layouts/TopSongsPanel'
import UserPlaylistsPanel from '../layouts/UserPlaylistsPanel'
import spotify from '../spotify/api'
import { useRouter } from 'next/router';
import { WHITE } from '../styles/colors'
import AuthContext from '../contexts/AuthContext'
import { useDesktopBreakpoints } from '../hooks'

export default function Dashboard() {

    const router = useRouter();
    const isDesktop = useDesktopBreakpoints();

    const authContext = useContext(AuthContext);

    const [spotifyToken, setSpotifyToken] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [me, setMe] = useState<null | SpotifyApi.CurrentUsersProfileResponse>(null);

    useEffect(() => {

        if (authContext.token) {
            spotify.getMe().then((user: SpotifyApi.CurrentUsersProfileResponse) => {
                setMe(user);
            })
        } else {
            router.replace('/auth')
        }

        
        
    }, [])

    useEffect(() => {
        if (me) setLoading(false)
    }, [me])

    if (loading) {
        return (
            <Container centerX>
                <Text
                    size={52}
                    paddingY={20}
                >Spotemy</Text>

                
                <Text
                    size={22}
                    paddingY={20}
                >Loading...</Text>
            </Container>
        )
    }

    return (
        <Container
            height={100}
            centerX
            paddingX={15}
            paddingY={15}
        >
            <LogoHeader />
            
            <Container
                width={100}
                horizontal
                justifyContent='space-between'
                centerY
            >
                <Container
                    horizontal
                    centerY
                    width={100}
                >
                    <Image
                        src={me!.images[0].url}
                        height={150}
                        width={150}
                        circular
                    />
                    <Container
                        padding={{
                            left: 15
                        }}
                    >
                        <Text
                            color={WHITE}
                            size={30}
                        >
                            {me!.display_name}
                        </Text>
                        <Text
                            paddingY={5}
                        >
                            {me!.id}
                        </Text>
                    </Container>
                </Container>
                <Container>
                    <Button
                        variant='primary'
                        onClick={() => router.push('/discover') }
                        padding={20}
                    >
                        <Text size={25}>Discover</Text>
                    </Button>
                </Container>
            </Container>

            {isDesktop ? (
                <Container
                    width={100}
                    height="1000px"
                    padding={20}
                    horizontal
                >
                    <Container
                        height={100}
                        width={25}
                        padding={{
                            right: 10
                        }}
                    >
                        <UserPlaylistsPanel />
                    </Container>
                    <Container width={75}>
                        <Container padding={{ bottom: 10 }}>
                            <TopArtistsPanel />
                        </Container>
                        <Container padding={{ bottom: 10 }}>
                            <TopSongsPanel />
                        </Container>
                        <Container padding={{ bottom: 10 }}>
                            <RecentlyPlayedPanel />
                        </Container>
                    </Container>
                </Container>
            ) : (
                <Container
                    width={100}
                    height="fit-content"
                    padding={20}
                >
                    <Container padding={{ bottom: 10 }}>
                        <TopArtistsPanel />
                    </Container>
                    <Container padding={{ bottom: 10 }}>
                        <TopSongsPanel />
                    </Container>
                    <Container padding={{ bottom: 10 }}>
                        <UserPlaylistsPanel />
                    </Container>
                    <Container padding={{ bottom: 10 }}>
                        <RecentlyPlayedPanel />
                    </Container>
                </Container>
            )}

            
        </Container>
    )
}


const useSpotifyToken = () => {

}