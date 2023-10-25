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

export default function Dashboard() {

    const router = useRouter();
    const isDesktop = useDesktopBreakpoints();

    const authContext = useContext(AuthContext);

    const [spotifyToken, setSpotifyToken] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [me, setMe] = useState<null | SpotifyApi.CurrentUsersProfileResponse>(null);

    useEffect(() => {
        // expire "1698195403974"
        // if never set token in storage, go to auth screen to log in
        const sessionToken: string = window.localStorage.getItem("spotify__token");
        console.log("hit /, sessionToken: ", sessionToken);
        if (!sessionToken) {
            console.log("NEVER LOGGED IN")
            router.replace('/auth');
            return;
        }

        // you have set it in storage before
        // now need to figure out if it is still active or dead
        // if active, we set accessToken if we need to, and getMe
        // else if dead, redirect to loginUrl (which will redirect to auth for you to catch new token)
        const tokenExpiresIn: number = parseInt(window.localStorage.getItem("spotify__token-expires-in"));
        const tokenCreationTime: number = parseInt(window.localStorage.getItem("spotify__token-time"));
        const expirationTime: number = tokenCreationTime + tokenExpiresIn;

        console.log("expires in: ",tokenExpiresIn, tokenCreationTime, expirationTime, expirationTime - new Date().getTime())
        // if still active
        if (expirationTime > new Date().getTime()) {
            console.log("STILL ACTIVE");
            if (!spotify.getAccessToken()) {
                console.log("Setting spotify access token on API object...");
                spotify.setAccessToken(sessionToken)
            }
            console.log("Getting me...");
            spotify.getMe().then((user: SpotifyApi.CurrentUsersProfileResponse) => {
                console.log("Setting me...");
                setMe(user);
            })
            return;
        }

        console.log("Token expired, redirecting to loginUrl...");
        window.location.href = loginUrl
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