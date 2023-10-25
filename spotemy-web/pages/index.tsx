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
import {loginUrl} from "../spotify/auth/spotify";
import {getTokenFromStorage, hasTokenExpired} from "../spotify/auth/utils";

export default function Dashboard() {

    const router = useRouter();
    const isDesktop = useDesktopBreakpoints();

    const authContext = useContext(AuthContext);

    const [spotifyToken, setSpotifyToken] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [me, setMe] = useState<null | SpotifyApi.CurrentUsersProfileResponse>(null);

    useEffect(() => {
        // if never set token in storage, go to auth screen to log in
        const sessionToken: string = getTokenFromStorage();
        if (!sessionToken) {
            router.replace('/auth');
            return;
        }

        // you have logged in before
        // has your token expired? redirect to loginUrl
        if (hasTokenExpired()) {
            window.location.href = loginUrl
        }

        // access token is active
        spotify.setAccessToken(sessionToken)

        spotify.getMe().then((user: SpotifyApi.CurrentUsersProfileResponse): void => {
            setMe(user);
        })
        return;

    }, [])

    useEffect(() => {
        if (me) setLoading(false)
    }, [me])

    if (loading) {
        return (
            <Container centerX>
                <Text size={52} paddingY={20}>Spotemy</Text>

                <Text size={22} paddingY={20}>Loading...</Text>
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
            
            <Container width={100} horizontal justifyContent='space-between' centerY>
                <Container horizontal centerY width={100}>
                    <Image circular src={me!.images[0].url} height={150} width={150}/>
                    <Container padding={{left: 15}}>
                        <Text color={WHITE} size={30}>
                            {me!.display_name}
                        </Text>
                        <Text paddingY={5}>
                            {me!.id}
                        </Text>
                    </Container>
                </Container>
                <Container>
                    <Button variant='primary' onClick={() => router.push('/discover') } padding={20}>
                        <Text size={25}>Discover</Text>
                    </Button>
                </Container>
            </Container>

            <div className="dashboard-stats-container">
                <div className="dashboard-stats__panel dashboard-stats__playlists">
                    <UserPlaylistsPanel />
                </div>
                <div className="dashboard-stats__panel dashboard-stats__artists">
                    <TopArtistsPanel />
                </div>
                <div  className="dashboard-stats__panel dashboard-stats__songs">
                    <TopSongsPanel />
                </div>
                <div  className="dashboard-stats__panel dashboard-stats__recently-played">
                    <RecentlyPlayedPanel />
                </div>
            </div>
            
        </Container>
    )
}


const useSpotifyToken = () => {

}