export const authEndpoint = "https://accounts.spotify.com/authorize";

// export const authUrl = "http://localhost:3000/auth"
export const authUrl = "https://spotemy.vercel.app";

// const redirectEndpoint = "http://localhost:3000/auth";
const redirectEndpoint = "https://spotemy.vercel.app/auth";

const clientId = "dae6ca4ae9c9447b99282a59e708b72d";

const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-read-playback-position",
    "user-top-read",
    "user-modify-playback-state",
    "streaming",
    "user-read-email",
    "user-read-private",

    "user-follow-modify",
    "user-follow-read",
    
    "playlist-read-collaborative",
    "playlist-modify-public",
    "playlist-read-private",
    "playlist-modify-private",
    "app-remote-control",
    "streaming",
    "user-library-modify",
    "user-library-read",
]

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectEndpoint}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`