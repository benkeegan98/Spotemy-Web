// import "../styles/globals.css"
import AuthContext, { AuthStore } from "../contexts/AuthContext";
import GlobalStyle from "../styles/global";
import '../../public/css/styles.css';

export default function App({ Component, pageProps }) {
    return (
        // <AuthStore>
        <>
            <GlobalStyle />
            <Component {...pageProps} />
        </>
        // </AuthStore>
    )
}