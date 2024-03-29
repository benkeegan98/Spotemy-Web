import { createGlobalStyle } from "styled-components"
import { GREEN, GREY_80 } from "./colors";
import variables from './variables';

const GlobalStyle = createGlobalStyle`
    ${variables};
    
    *{
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
        font-family: Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    }

    body {
        background-color: ${GREY_80};
        color: ${GREEN}
    }
    
    #root{
        margin:0 auto;
    }
`

export default GlobalStyle;