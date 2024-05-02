import axios from "axios";

function callChapterDetailGetApi(chapterId: string) {
    const masterKey = sessionStorage.getItem('x-master-key');

    const endpoint = `${process.env.REACT_APP_BACKEND_HOST}/chapter/${chapterId}`

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

export default callChapterDetailGetApi