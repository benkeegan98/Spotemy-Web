import chroma from "chroma-js";

export const rgba = (color, alpha = 1) => `rgba(${chroma(color).rgb()},${alpha})`;

export const lighten = (color, value = 1) => chroma(color).brighten(value).hex();