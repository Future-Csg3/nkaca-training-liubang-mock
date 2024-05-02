import axios from "axios";

function callChapterPostApi(
    chapterId: string,
    mainCode: string,
    exampleCode: string,
    expected: string,
    bestPracticeCode: string,
    level: number,
    exercise: string,
) {
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

    const masterKey = sessionStorage.getItem('x-master-key');

    const endpoint = `${process.env.REACT_APP_BACKEND_HOST}/chapter`

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

export default callChapterPostApi