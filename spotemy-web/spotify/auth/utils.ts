export const getTokenFromUrl = () => {
    console.log("Looking to parse token from URL: ", window.location);
    return window.location.hash
        .substring(1)
        .split("&")
        .reduce((initial, item) => {
            let parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1]);
            return initial;
        }, {});
}

export const clearUrlHash = () => {
    window.location.hash = "";
    // history.pushState("", document.title, window.location.pathname + window.location.search);
}

export const storeTokenAndExpirationTime = (token: string, expirationTime: number): void => {
    window.localStorage.setItem("spotify__token", token);
    window.localStorage.setItem("spotify__token-expiration-time", String(expirationTime));
}

export const getTokenFromStorage = (): string => {
    return window.localStorage.getItem("spotify__token") ?? null;
}

export const hasTokenExpired = (): boolean => {
    const expirationTime: number = parseInt(window.localStorage.getItem("spotify__token-expiration-time"));
    if (!expirationTime) {
        return true;
    }

    return expirationTime <= new Date().getTime();
}