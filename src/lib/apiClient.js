const BASE_URL = "http://127.0.0.1:8000/api";


async function refreshAccessToken() {
  const refresh = localStorage.getItem("refresh");
  if (!refresh) return null;

  try {
    const response = await fetch(`${BASE_URL}/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });

    if (!response.ok) throw new Error("Failed to refresh token");

    const data = await response.json();
    localStorage.setItem("access", data.access);
    return data.access;
  } catch (err) {
    console.error("Token refresh failed:", err);
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    return null;
  }
}

export async function apiRequest(endpoint, options = {}) {
  const access = localStorage.getItem("access");

  const defaultHeaders = {
    "Content-Type": "application/json",
    ...(access ? { Authorization: `Bearer ${access}` } : {}),
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: { ...defaultHeaders, ...options.headers },
    });


    if (response.status === 401 && refreshAccessToken) {
      const newAccess = await refreshAccessToken();
      if (newAccess) {
        const retryResponse = await fetch(`${BASE_URL}${endpoint}`, {
          ...options,
          headers: {
            ...defaultHeaders,
            Authorization: `Bearer ${newAccess}`,
            ...options.headers,
          },
        });
        return retryResponse;
      }
    }

    return response;
  } catch (err) {
    console.error("API Request error:", err);
    throw err;
  }
}