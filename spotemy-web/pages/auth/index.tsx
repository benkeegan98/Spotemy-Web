import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Container, Text, Button } from '../../components'
import spotify from '../../spotify/api'
import { authEndpoint, loginUrl } from '../../spotify/auth/spotify'
import { clearUrlHash, getTokenFromUrl } from '../../spotify/auth/utils'

export default function AuthPage() {

    const handleLogin = async () => {
        window.location.href = loginUrl
    }

    return (
        <Container
          centerX
          paddingX={30}
          paddingY={30}
        >
            <Text
                size={52}
                paddingY={20}
            >Spotemy</Text>

            <Button
                variant="primary"
                onClick={handleLogin}
            >Sign in with Spotify</Button>
        </Container>
    )
}