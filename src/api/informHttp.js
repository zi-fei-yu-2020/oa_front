import http from "./http"


const publishInform = (data) => {
    const path = "/inform/inform"
    return http.post(path, data)
}

const getInformList = (page = 1) => {
    const path = "/inform/inform?page=" + page
    return http.get(path)
}

const deleteInform = (pk) => {
    const path = "/inform/inform/" + pk
    return http.delete(path)
}

const getInformDetail = (pk) => {
    const path = "/inform/inform/" + pk
    return http.get(path)
}

const readInform = (pk) => {
    const path = "/inform/inform/read"
    return http.post(path, { inform_pk: pk })
}


export default {
    publishInform,
    getInformList,
    deleteInform,
    getInformDetail,
    readInform
}