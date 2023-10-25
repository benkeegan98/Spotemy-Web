import { useEffect } from 'react'
import { Container, Text, Button, LogoHeader } from '../../components'
import { loginUrl } from '../../spotify/auth/spotify'
import {clearUrlHash, getTokenFromUrl, storeTokenAndExpirationTime} from '../../spotify/auth/utils'
import {useRouter} from "next/router";

export default function AuthPage() {

    const router = useRouter();

  	useEffect(() => {

    	const _spotifyToken = getTokenFromUrl();
		if ('access_token' in _spotifyToken) {
			clearUrlHash();
            const token: string = _spotifyToken['access_token'] as string;
            const expirationTime: number = (parseInt(_spotifyToken['expires_in']) * 1000) + new Date().getTime();
            storeTokenAndExpirationTime(token, expirationTime);
            router.replace('/');
		}

    }, [])

    const handleLogin = async () => {
          window.location.href = loginUrl
    }

    return (
        <Container
          centerX
          paddingX={30}
          paddingY={30}
        >
            <LogoHeader />

            <Button
                variant="primary"
                onClick={() => handleLogin()}
            >Sign in with Spotify</Button>
        </Container>
    )
}