export function getCookies() {
    let cookies = {};
    document.cookie.split(/;\s*/).forEach((kv) => {
        let pair = kv.split('=');
        cookies[pair[0]] = pair[1]
    });

    return cookies;
}

export function setCookies(cookies) {
    for (let key in cookies) {
        document.cookie = `${key}=${cookies[key]}`;
    }
}