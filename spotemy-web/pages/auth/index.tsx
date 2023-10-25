import Head from 'next/head'
import { useContext, useEffect, useState } from 'react'
import { Container, Text, Button, LogoHeader } from '../../components'
import AuthContext from '../../contexts/AuthContext'
import spotify from '../../spotify/api'
import { authEndpoint, loginUrl } from '../../spotify/auth/spotify'
import { clearUrlHash, getTokenFromUrl } from '../../spotify/auth/utils'
import exp from "constants";
import {useRouter} from "next/router";

export default function AuthPage() {

 	// const {
	// 	token,
	// 	setToken
	// } = useContext(AuthContext);
    const router = useRouter();

  	useEffect(() => {

    	const _spotifyToken = getTokenFromUrl();
		if ('access_token' in _spotifyToken) {
            console.log("Token parsed from URL");
			clearUrlHash();
			// setToken(_spotifyToken['access_token'] as string);
            console.log("old localStorage: ", window.localStorage);
            console.log("Setting token data in local storage session");
            window.localStorage.setItem("spotify__token", _spotifyToken['access_token'] as string);
            window.localStorage.setItem("spotify__token-expires-in", _spotifyToken['expires_in'] as string);
            window.localStorage.setItem("spotify__token-time", String(new Date().getTime()));
            console.log("Token information in session, redirecting to /...");
            console.log("updated localStorage: ", window.localStorage);
            router.replace('/');
		}

    }, [])

    const handleLogin = async () => {
          console.log("handle login clicked");
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