import Head from 'next/head'
import { useContext, useEffect, useState } from 'react'
import { Container, Text, Button, LogoHeader } from '../../components'
import AuthContext from '../../contexts/AuthContext'
import spotify from '../../spotify/api'
import { authEndpoint, loginUrl } from '../../spotify/auth/spotify'
import { clearUrlHash, getTokenFromUrl } from '../../spotify/auth/utils'

export default function AuthPage() {

 	const {
		token,
		setToken
	} = useContext(AuthContext);

  	useEffect(() => {

    	const _spotifyToken = getTokenFromUrl();

		// setTimeout(() => {
		if ('access_token' in _spotifyToken) {
			clearUrlHash()
			setToken(_spotifyToken['access_token'] as string)
		}
		// }, 500)
    
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
                onClick={handleLogin}
            >Sign in with Spotify</Button>
        </Container>
    )
}