import React, { Component, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import SpotifyWebApi from 'spotify-web-api-js';
import spotify from '../spotify/api';

const AuthContext = React.createContext<AuthContextValueProps | null>(null);

interface AuthContextValueProps {
    token: string,
    setToken: (token: string) => void
}

export const AuthStore = (props) => {

    const router = useRouter();

    const [token, setToken] = useState<string>(null);
    const [expirationTime, setExpirationTime] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);

    useEffect(() => {

        const setSpotifyClient = async (accessToken) => {
            spotify.setAccessToken(accessToken);
            router.replace("/");
        }

        if(token) {
            setSpotifyClient(token)
        }
    }, [token])

    const providerValue : AuthContextValueProps = {
        token,
        setToken
    }

    return (
        <AuthContext.Provider value={providerValue}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;