import axios, { AxiosInstance } from "axios";
// Create an Axios instance with a dynamic base URL

const createAxiosInstance = async (): Promise<AxiosInstance> => {
  try {
    const baseUrl = "https://blockbuster.odin.nz/api";

    const instance = axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Interceptor to add JWT token to request headers
    instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("jwtToken");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return instance;
  } catch (error) {
    console.error(
      "Error creating Axios instance:",
      error instanceof Error ? error.message : error
    );
    throw new Error("Failed to create Axios instance");
  }
};

// Export a promise of the Axios instance
const axiosInstancePromise = createAxiosInstance();
export default axiosInstancePromise;
