import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Generic API methods
  async get(endpoint: string, config?: any) {
    const response = await this.api.get(endpoint, config);
    return response.data;
  }

  async post(endpoint: string, data?: any, config?: any) {
    const response = await this.api.post(endpoint, data, config);
    return response.data;
  }

  async put(endpoint: string, data?: any, config?: any) {
    const response = await this.api.put(endpoint, data, config);
    return response.data;
  }

  // PATCH method
  async patch(endpoint: string, data?: any, config?: any) {
    const response = await this.api.patch(endpoint, data, config);
    return response.data;
  }

  async delete(endpoint: string, config?: any) {
    const response = await this.api.delete(endpoint, config);
    return response.data;
  }

  // File upload
  async postFormData(endpoint: string, formData: FormData) {
    const response = await this.api.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
}

export const apiService = new ApiService();
export default apiService;
