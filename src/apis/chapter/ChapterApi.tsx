import axios from "axios";

export function callChapterGetApi(chapterId: string) {
    const sessionKey = sessionStorage.getItem('x-session-key');

    const endpoint = `${process.env.REACT_APP_BACKEND_HOST}/chapter/${chapterId}`

    const req = {
        method: "GET",
        url: endpoint,
        headers: {
            "content-type": "application/json",
            "Content-Type": "application/json",
            "x-session-key": sessionKey
        },
    };

    return axios.request(req)

}

export function callChapterPostApi(
    chapterId: string,
    mainCode: string,
    exampleCode: string,
    expected: string,
    bestPracticeCode: string,
    level: number,
    exercise: string,
) {
    const masterKey = sessionStorage.getItem('x-master-key');

    const endpoint = `${process.env.REACT_APP_BACKEND_HOST}/chapter`

    const body = {
        chapter: {
            chapter_id: chapterId,
            main_code: mainCode,
            example_code: exampleCode,
            expected: expected,
            best_practice_code: bestPracticeCode,
            level: level,
            exercise: exercise,
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

export function callChapterAllGetApi() {
    const masterKey = sessionStorage.getItem('x-master-key');

    const endpoint = `${process.env.REACT_APP_BACKEND_HOST}/chapter/all`

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

export function callChapterListGetApi(themId: string) {
    const masterKey = sessionStorage.getItem('x-master-key');

    const endpoint = `${process.env.REACT_APP_BACKEND_HOST}/chapter/list/${themId}`

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
