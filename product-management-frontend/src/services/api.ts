import axios from 'axios';
import { Product } from '../models/Product';


const api = axios.create({
    baseURL: 'https://localhost:44397/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);
export const getProducts = async () => {
    const response = await api.get('/products');
    return response.data;
};

export const createProduct = async (product: Product) => {
    return await api.post('/products', product);
};

export const updateProduct = async (id: number, product: Product) => {
    return await api.put(`/products/${id}`, product);
};

export const deleteProduct = async (id: number) => {
    return await api.delete(`/products/${id}`);
};

export const login = async (credentials: { username: string, password: string }) => {
    try {
        const requestBody = {
            username: credentials.username,
            passwordHash: credentials.password
        };

        console.log("Sending login request:", requestBody);

        const response = await api.post('/Auth/login', requestBody, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log("Login response:", response.data);

        if (!response.data.token) {
            throw new Error("No token received");
        }

        localStorage.setItem('token', response.data.token);
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

        return response.data;
    } catch (error: any) {
        console.error("Detailed login error:", {
            status: error.response?.status,
            data: error.response?.data,
            headers: error.response?.headers,
            request: {
                url: error.config?.url,
                method: error.config?.method,
                data: error.config?.data
            }
        });
        throw error;
    }
};