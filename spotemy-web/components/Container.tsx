import styled, { css } from "styled-components";
import { GREY_80, WHITE } from "../styles/colors";

interface ContainerProps {
    backgroundColor?: "transparent" | string,
    centerX?: boolean,
    centerY?: boolean,
    justifyContent?: "space-between" | "space-around" | "space-evenly",
    horizontal?: boolean,
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
    width?: "full-screen" | "auto" | "fit-content" | number | `${number}px`,
    height?: "full-screen" | "auto" | "fit-content" | number | `${number}px`,
    borderRadius?: number,
    scroll?: boolean,
    absolute?: {
        top?: `${number}px`,
        bottom?: `${number}px`,
        left?: `${number}px`,
        right?: `${number}px`
    },
    relative?: {
        top?: `${number}px`,
        bottom?: `${number}px`,
        left?: `${number}px`,
        right?: `${number}px`
    },
    wrap?: boolean,
    onClick?: React.MouseEventHandler<HTMLDivElement>,
}

export default styled.div<ContainerProps>`
    background-color: ${props => props.backgroundColor ?
        props.backgroundColor === "transparent" ? 'rgba(0,0,0,0)' : props.backgroundColor 
    : ""};

    display: flex;
    flex-direction: ${props => props.horizontal ? "row" : "column"};
    ${props => props.wrap && css`
        flex-wrap: wrap
    `};

    justify-content: ${props => props.justifyContent || ""};

    border-radius: ${props => `${props.borderRadius}px` || ""};

    width: ${props => props.width ?
        props.width == "full-screen" ? "100vw"
        :
        typeof props.width === "number" ? `${props.width > 100 ? 100 : props.width}%`
        :
        props.width
    : ""};
    height: ${props => props.height ?
        props.height == "full-screen" ? "100vh"
        :
        typeof props.height === "number" ? `${props.height > 100 ? 100 : props.height}%`
        :
        props.height
    : ""};

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
    
    ${props => props.centerX ? 
        !props.horizontal ? css`
            align-items: center;
        ` : css`
            justify-content: center ;
        `
    : ""};
    ${props => props.centerY ?
        !props.horizontal ? css`
            justify-content: center;
        ` : css`
            align-items: center ;
        `
    : ""};

    overflow: ${props => props.scroll ? "scroll" : ""};

    position: ${props => props.absolute ? "absolute" : props.relative ? "relative" : ""};

    top: ${props => (props.absolute && typeof props.absolute.top === "string") ? props.absolute.top : 
                    (props.relative && typeof props.relative.top === "string") ? props.relative.top :
    ""};

    bottom: ${props => (props.absolute && typeof props.absolute.bottom === "string") ? props.absolute.bottom : 
                    (props.relative && typeof props.relative.bottom === "string") ? props.relative.bottom :
    ""};
    left: ${props => (props.absolute && typeof props.absolute.left === "string") ? props.absolute.left : 
                    (props.relative && typeof props.relative.left === "string") ? props.relative.left :
    ""};
    right: ${props => (props.absolute && typeof props.absolute.right === "string") ? props.absolute.right : 
                    (props.relative && typeof props.relative.right === "string") ? props.relative.right :
    ""};

    ${props => props.onClick && css`
        cursor: pointer;
        transition: 0.3s cubic-bezier(0.215, 0.610, 0.355, 1);
        :hover {
            svg {
                transition: 0.2s cubic-bezier(0.215, 0.610, 0.355, 1);
                color: ${WHITE};
            }

            background-color: ${GREY_80};
        }
        
    `};

`