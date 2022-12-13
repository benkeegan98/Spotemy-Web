// import "../styles/globals.css"
import AuthContext, { AuthStore } from "../contexts/AuthContext";
import GlobalStyle from "../styles/global";

export default function App({ Component, pageProps }) {
    return (
        <AuthStore>
            <GlobalStyle />
            <Component {...pageProps} />
        </AuthStore>
    )
}