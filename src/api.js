import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${API_URL}/api/auth`,
  withCredentials: true, // <--- required to send cookies
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (
    token &&
    !config.url.includes("/login") &&
    !config.url.includes("/refreshtoken")
  ) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/refreshtoken")
    ) {
      originalRequest._retry = true;

      try {
        const refreshRes = await api.post("/refreshtoken");
        const newToken = refreshRes.data.token;
        localStorage.setItem("token", newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (err) {
        console.error("Refresh failed:", err);
        window.location.href = "/loginsingup";
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
