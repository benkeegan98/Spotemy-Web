import { lighten, rgba } from "./utils"

export const GREEN = "#1DB954";
export const GREEN_DARK_20 = rgba(GREEN, 0.8);
export const GREEN_DARK_40 = rgba(GREEN, 0.5);
export const GREEN_DARK_60 = rgba(GREEN, 0.4);
export const GREEN_DARK_80 = rgba(GREEN, 0.2);

export const GREEN_LIGHT_20 = lighten(GREEN, 0.5)
export const GREEN_LIGHT_40 = lighten(GREEN, 0.8)
export const GREEN_LIGHT_60 = lighten(GREEN, 1)
export const GREEN_LIGHT_80 = lighten(GREEN, 1.5)