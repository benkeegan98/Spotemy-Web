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