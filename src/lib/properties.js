import { apiRequest } from "./apiClient";

export async function fetchProperties() {
    const response = await apiRequest("/properties/");

    if (!response.ok) {
        throw new Error("Failed to fetch properties");
    }

    return await response.json();
}