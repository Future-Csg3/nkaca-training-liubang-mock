import axios from "axios";

export function callArchivementGetApi(chapterId: string) {
    const sessionKey = sessionStorage.getItem('x-session-key');

    const endpoint = `${process.env.REACT_APP_BACKEND_HOST}/archivement/${chapterId}`

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

export function callArchivementPostApi(archivement: any) {
    const sessionKey = sessionStorage.getItem('x-session-key');

    const endpoint = `${process.env.REACT_APP_BACKEND_HOST}/archivement`

    const body = {
        archivement: {
            archivement_id: archivement.archivementId,
            status: archivement.status,
            version: archivement.version,
            code: archivement.code,
            comment: archivement.comment,
            result: archivement.result,
            is_compile_error: archivement.isCompileError,
        }
    };

    console.log(body)

    const req = {
        method: "POST",
        url: endpoint,
        headers: {
            "content-type": "application/json",
            "Content-Type": "application/json",
            "x-session-key": sessionKey,
        },
        data: body,
    };

    return axios.request(req)
}