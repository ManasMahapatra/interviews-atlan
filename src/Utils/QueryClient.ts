import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";

const BASE_URL = "https://newsapi.org/v2";

export const httpClient = axios.create({
    baseURL: BASE_URL
})

const authInterceptor = function (config: AxiosRequestConfig) {
    return {
        ...config,
        headers: {
            "X-Api-Key": "add147c86e9447898afa75f784674944"
        } as unknown as AxiosRequestHeaders
    }
}

httpClient.interceptors.request.use(authInterceptor);