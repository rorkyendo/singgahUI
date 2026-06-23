import axios from "axios";
import { api_url } from '../utils/const';

export const sendChat = async (sessionId, message, language = "id") => {
    try {
        const response = await axios.post(
            `${api_url}message/send`,
            {
                "is_user": "Y",
                "session": sessionId,
                "message": message,
                "read": "N",
                "replied": "N",
                "language": language
            },
            { headers: { "ngrok-skip-browser-warning": "true" } }
        );
        return response.data;
    } catch (error) {
        console.error("Error sending message:", error);
        throw error;
    }
};

export const getPropertyDetail = async (url, source) => {
    try {
        const response = await axios.post(
            `${api_url}message/property-detail`,
            { url, source },
            { headers: { "ngrok-skip-browser-warning": "true" } }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching property detail:", error);
        throw error;
    }
};
