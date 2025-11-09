import { apiRequest } from "./apiClient";


export async function login(username, password) {
  
    const response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });
  
    const data = await response.json();
  
    if (response.ok) {
      localStorage.setItem("access", data.access);
      loacalStorage.setItem("refresh", data.refresh);
      return true;
    } else {
      console.error("Token refresh failed:", data);
      return false;
    }
  }

  export function logout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  }