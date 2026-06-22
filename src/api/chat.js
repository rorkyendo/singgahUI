import axios from "axios";
import { api_url } from '../utils/const';

export const sendChat = async (sessionId, message) => {
    try {
        const response = await axios.post(
            `${api_url}message/send`,
            {
                "is_user": "Y",
                "session": sessionId,
                "message": message,
                "read": "N",
                "replied": "N"
            },
            { headers: { "ngrok-skip-browser-warning": "true" } }
        );
        return response.data;
    } catch (error) {
        console.error("Error sending message:", error);
        throw error;
    }
};
