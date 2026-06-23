export const api_url = process.env.REACT_APP_API_URL || "http://localhost:8000/";
export const queryParameters = typeof window !== "undefined"
    ? new URLSearchParams(window.location.search)
    : new URLSearchParams("");
