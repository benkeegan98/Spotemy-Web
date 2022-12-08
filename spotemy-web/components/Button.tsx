import styled, { css } from "styled-components";
import { GREEN, GREEN_DARK_20, GREEN_LIGHT_20} from "../styles/colors";

interface ButtonProps {
    variant: "primary" | "secondary",
    onClick: React.MouseEventHandler<HTMLButtonElement>,

    margin?: number | {
        top?: number,
        bottom?: number,
        left?: number,
        right?: number
    },
    marginY?: number,
    marginX?: number,

    padding?: number | {
        top?: number,
        bottom?: number,
        left?: number,
        right?: number
    },
    paddingY?: number,
    paddingX?: number,
}

export default styled.button<ButtonProps>`
    border: 0;
    outline: 0;
    padding: 0.75rem 1rem;
    border-radius: 1rem;
    cursor: pointer;

    transition: .2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);

    ${props => props.variant == "primary" ? css`
        background-color: ${GREEN};
        color: white;

        :hover {
            background-color: ${GREEN_LIGHT_20};
        }
    ` : ""}
    ${props => props.variant == "secondary" ? css`
        background-color: rgba(0,0,0,0);
        color: ${GREEN};
        border: 2px solid ${GREEN};
    ` : ""}

    padding: ${props => props.padding ? 
        typeof props.padding === "number" ? 
            `${props.padding}px`
            :
            `${props.padding.top || 0}px ${props.padding.right || 0}px ${props.padding.bottom || 0}px ${props.padding.left || 0}px` 
        : 
        `${props.paddingY ? props.paddingY + "px" : '0.75rem'} ${props.paddingX ? props.paddingX + "px" : '1rem'}`
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