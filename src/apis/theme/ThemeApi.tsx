import axios from "axios";

export function callThemeAllGetApi() {
    const masterKey = sessionStorage.getItem('x-master-key');

    const endpoint = `${process.env.REACT_APP_BACKEND_HOST}/theme/all`

    const req = {
        method: "GET",
        url: endpoint,
        headers: {
            "content-type": "application/json",
            "Content-Type": "application/json",
            "x-master-key": masterKey
        },
    };

    return axios.request(req)
}

export function callThemeGetApi() {
    const sessionKey = sessionStorage.getItem('x-session-key');

    const endpoint = `${process.env.REACT_APP_BACKEND_HOST}/theme`

    const req = {
        method: "GET",
        url: endpoint,
        headers: {
            "content-type": "application/json",
            "Content-Type": "application/json",
            "x-session-key": sessionKey,
        },
    };

    return axios.request(req)

}

export function callThemePostApi(themeId: string, theme: string, description: string) {
    const masterKey = sessionStorage.getItem('x-master-key');

    const endpoint = `${process.env.REACT_APP_BACKEND_HOST}/theme`

    const body = {
        theme: {
            theme_id: themeId,
            theme: theme,
            description: description,
        }
    };

    const req = {
        method: "POST",
        url: endpoint,
        headers: {
            "content-type": "application/json",
            "Content-Type": "application/json",
            "x-master-key": masterKey
        },
        data: body,
    };

    return axios.request(req)
}

export function callThemePutApi(themeId: string, chapterIds: readonly string[]) {
    const masterKey = sessionStorage.getItem('x-master-key');

    const endpoint = `${process.env.REACT_APP_BACKEND_HOST}/theme/chapter`

    const body = {
        theme_id: themeId,
        chapters: chapterIds.map((e, i) => {
            return {
                chapter_id: e,
                order: i,
            }
        })
    };

    const req = {
        method: "PUT",
        url: endpoint,
        headers: {
            "content-type": "application/json",
            "Content-Type": "application/json",
            "x-master-key": masterKey
        },
        data: body,
    };

    return axios.request(req)

}