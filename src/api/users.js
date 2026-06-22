import axios from "axios";
import { api_url } from '../utils/const';
import { queryParameters } from '../utils/const';

export const getUsers = async () => {
    try {
        const sessionId = queryParameters.get("userId");
        if (sessionId) {
            const response = await axios.get(
                `${api_url}user/id/${sessionId}`,
                { headers: { "ngrok-skip-browser-warning": "true" } }
            );
            return response.data;
        }
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

export const registUser = async (name, phone, status_pernikahan, budget_min, budget_max, lokasi) => {
    try {
        const response = await axios.post(
            `${api_url}user/create`,
            {
                "name": name,
                "phone": phone,
                "status_pernikahan": status_pernikahan,
                "budget_min": budget_min,
                "budget_max": budget_max,
                "lokasi": lokasi
            },
            { headers: { "ngrok-skip-browser-warning": "true" } }
        );
        return response.data;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
};
