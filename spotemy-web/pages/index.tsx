import { useEffect, useState } from 'react'
import { Container, Text, Button, Image } from '../components'
import TopArtistsPanel from '../layouts/TopArtistsPanel'
import TopSongsPanel from '../layouts/TopSongsPanel'
import UserPlaylistsPanel from '../layouts/UserPlaylistsPanel'
import spotify from '../spotify/api'
import { authEndpoint, authUrl, loginUrl } from '../spotify/auth/spotify'
import { clearUrlHash, getTokenFromUrl } from '../spotify/auth/utils'

export default function Dashboard() {

    const [spotifyToken, setSpotifyToken] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [me, setMe] = useState<null | SpotifyApi.CurrentUsersProfileResponse>(null);

    useEffect(() => {

        const _spotifyToken = getTokenFromUrl()

        setTimeout(() => {
            if ('access_token' in _spotifyToken) {

                clearUrlHash()
                setSpotifyToken(_spotifyToken['access_token'])
                spotify.setAccessToken(_spotifyToken['access_token'])
    
                spotify.getMe().then((user: SpotifyApi.CurrentUsersProfileResponse) => {
                    setMe(user);
                })
    
            } else {
                window.location.href = authUrl
            }
        }, 500)
        
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
            height="full-screen"
            centerX
            paddingX={30}
            paddingY={30}
        >
            <Text size={52}>Spotemy</Text>

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
                        color="white"
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

            <Container
                width={100}
                height={100}
                padding={20}
                horizontal
            >
                <Container
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
                </Container>
            </Container>

        </Container>
    )
}


const useSpotifyToken = () => {

}