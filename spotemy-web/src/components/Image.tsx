import styled, { css } from "styled-components";
import { GREEN, GREEN_DARK_20, GREEN_LIGHT_20} from "../styles/colors";

interface ImageProps {
    height: number,
    width: number,
    src: string,
    circular?: boolean,
    padding?: number | {
        top?: number,
        bottom?: number,
        left?: number,
        right?: number
    },
    paddingY?: number,
    paddingX?: number,
    margin?: number | {
        top?: number,
        bottom?: number,
        left?: number,
        right?: number
    },
    marginY?: number,
    marginX?: number,
    className?: string,
}

export default styled.img<ImageProps>`
    border: 0;
    outline: 0;
    object-fit: cover;
    height: ${props => props.height + "px"};
    width: ${props => props.width + "px"};
    min-height: ${props => props.height + "px"};
    min-width: ${props => props.width + "px"};
    border-radius: ${props => !props.circular ? "0" : props.height >= props.width ? (props.height/2) + "px" : (props.width/2) + "px" };

    padding: ${props => props.padding ? 
        typeof props.padding === "number" ? 
            `${props.padding}px`
            :
            `${props.padding.top || 0}px ${props.padding.right || 0}px ${props.padding.bottom || 0}px ${props.padding.left || 0}px` 
        : 
        `${props.paddingY || 0}px ${props.paddingX || 0}px`
    };

    margin: ${props => props.margin ? 
        typeof props.margin === "number" ? 
            `${props.margin}px`
            :
            `${props.margin.top || 0}px ${props.margin.right || 0}px ${props.margin.bottom || 0}px ${props.margin.left || 0}px` 
        : 
        `${props.marginY || 0}px ${props.marginX || 0}px`
    };
`