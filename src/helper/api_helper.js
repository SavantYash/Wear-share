import axios, { Axios } from "axios"

const BASE_URL = `http://localhost:5000`

const axiosInstance = axios.create({
    baseURL: BASE_URL
})

const axioshelper = async (call) => {
    try {
        const response = await call
        return response
    } catch (err) {
        console.log(err)
    }
}

export const get = async (url, config = {}) => {
    return axioshelper = await axiosInstance.get(url, {
        config
    })
}

export const post = async (url, body={},config={}) => {
    console.log("yes")
    return axioshelper(
        await axiosInstance.post(url, body, config)
    )
}