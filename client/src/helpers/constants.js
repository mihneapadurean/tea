export const API_URL = "http://localhost:8000/api";

export const defaultFetchOptions = {
    headers: {
        'Authorization': localStorage.getItem("access_token")
    }
}