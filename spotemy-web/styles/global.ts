import { createGlobalStyle } from "styled-components"
import { GREEN } from "./colors";

const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
        font-family: Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    }

    body {
        background-color: #222;
        color: ${GREEN}
    }
    
    #root{
        margin:0 auto;
    }
`

export default GlobalStyle;