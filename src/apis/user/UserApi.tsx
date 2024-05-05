import axios from "axios";

export function callUserGetApi(userId: string) {

    const endpoint = `${process.env.REACT_APP_BACKEND_HOST}/user/${userId}`

    const req = {
        method: "GET",
        url: endpoint,
        headers: {
            "content-type": "application/json",
            "Content-Type": "application/json",
        },
    };

    return axios.request(req)

}