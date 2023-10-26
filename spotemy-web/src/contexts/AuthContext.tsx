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

    // useEffect(() => {
    //
    //     const setSpotifyClient = async (accessToken) => {
    //         spotify.setAccessToken(accessToken);
    //         router.replace("/");
    //     }
    //
    //     // if(token) {
    //     //     setSpotifyClient(token)
    //     // }
    //     // else {
    //     //     const sessionToken: string = window.localStorage.getItem("spotify__token");
    //     //     if (sessionToken) {
    //     //         setSpotifyClient(sessionToken)
    //     //     }
    //     // }
    //     if(token) {
    //         setSpotifyClient(token)
    //         return;
    //     }
    //
    //     if (window.localStorage.getItem("spotify__token")) {
    //         const tokenExpiresIn: number = parseInt(window.localStorage.getItem("spotify__token-expires-in"));
    //         const tokenCreationTime: number = parseInt(window.localStorage.getItem("spotify__token-time"));
    //
    //         const expirationTime: number = tokenCreationTime + tokenExpiresIn;
    //         if (new Date().getTime() < expirationTime) {
    //             setSpotifyClient()
    //         }
    //     }
    // })

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