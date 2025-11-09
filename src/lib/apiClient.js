import { BASE_URL } from "./config";


function getAccessToken() {
  return localStorage.getItem("access");
}

function saveAccessToken(token) {
  localStorage.setItem("access", token);
}

function clearTokens() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
}

export async function refreshAccessToken() {
  const refresh = localStorage.getItem("refresh");
  if (!refresh) return null;

  try {
    const response = await fetch(`${BASE_URL}token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });

    if (!response.ok) throw new Error("Failed to refresh token");

    const data = await response.json();
    saveAccessToken(data.access);
    return data.access;
  } catch (err) {
    console.error("🔒 Token refresh failed:", err);
    clearTokens();
    return null;
  }
}

export async function apiRequest(endpoint, options = {}) {
  let access = getAccessToken();

  const headers = {
    "Content-Type": "application/json",
    ...(access ? { Authorization: `Bearer ${access}` } : {}),
    ...options.headers,
  };

  try {
    let response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });

    if (response.status === 401) {
      const newAccess = await refreshAccessToken();
      if (!newAccess) throw new Error("Session expired, please log in again.");

      headers.Authorization = `Bearer ${newAccess}`;
      response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
    }

    if (!response.ok) throw new Error(`HTTP Error ${response.status}`);

    return await response.json();
  } catch (err) {
    console.error("API Request failed:", err);
    throw err;
  }
}