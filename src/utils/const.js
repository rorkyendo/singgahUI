export const api_url = "http://localhost:8000/";
export const queryParameters = typeof window !== "undefined"
    ? new URLSearchParams(window.location.search)
    : new URLSearchParams("");
