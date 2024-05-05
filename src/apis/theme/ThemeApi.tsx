import axios from "axios";

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