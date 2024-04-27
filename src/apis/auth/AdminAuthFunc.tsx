import axios from "axios";

function callAdminAuthApi(userId: string, password: string) {

    const body = {
        user_id: userId,
        password: password,
    };

    const endpoint = `${process.env.REACT_APP_BACKEND_HOST}/admin/authentication`

    const req = {
        method: "POST",
        url: endpoint,
        headers: {
            "content-type": "application/json",
            "Content-Type": "application/json",
        },
        data: body,
    };

    return axios.request(req)

}

export default callAdminAuthApi