import axios from 'axios';

const API_BASE_URL= import.meta.env.VITE_API__BASE_URL;

export async function fetchProperties() {
  const response = await fetch(`${API_BASE_URL}properties/`);
  if (!response.ok) {
    throw new Error("Failed to fetch properties");
  }
  return await response.json();
};

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

// attach access token on each request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access');
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let subscribers = [];

function onAccessTokenFetched(newToken) {
  subscribers.forEach((cb) => cb(newToken));
  subscribers = [];
}
function addSubscriber(cb) {
  subscribers.push(cb);
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    // Only try refresh once per request
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      const refresh = localStorage.getItem('refresh');

      if (!refresh) {
        localStorage.removeItem('access');
        window.location.href = '/login';
        return Promise.reject(error);
      }

      // If a refresh is already in flight, q this call
      if (isRefreshing) {
        return new Promise((resolve) => {
          addSubscriber((newToken) => {
            original.headers = original.headers ?? {};
            original.headers.Authorization = `Bearer ${newToken}`;
            resolve(api(original));
          });
        });
      }

      isRefreshing = true;
      try {
        const { data } = await axios.post(`${BASE_URL}/token/refresh/`, { refresh });
        const newAccess = data.access;
        localStorage.setItem('access', newAccess);
        isRefreshing = false;
        onAccessTokenFetched(newAccess);

        original.headers = original.headers ?? {};
        original.headers.Authorization = `Bearer ${newAccess}`;
        return api(original);
      } catch (e) {
        isRefreshing = false;
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        window.location.href = '/login';
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);

export const get  = (url, config = {})       => api.get(url, config).then(r => r.data);
export const post = (url, data, config = {}) => api.post(url, data, config).then(r => r.data);
export const put  = (url, data, config = {}) => api.put(url, data, config).then(r => r.data);
export const del  = (url, config = {})       => api.delete(url, config).then(r => r.data);


export default api;