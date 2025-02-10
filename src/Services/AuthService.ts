import { AuthResponse, Cliente } from '../Models/Cliente';

const API_URL = 'http://localhost:5000/api/auth'; // Cambia la URL según tu backend

export const AuthService = {
    async login(email: string, password: string): Promise<AuthResponse> {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    },

    async register(cliente: Cliente): Promise<AuthResponse> {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cliente),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    },

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('cliente');
    },

    getCurrentCliente(): Cliente | null {
        const cliente = localStorage.getItem('cliente');
        return cliente ? JSON.parse(cliente) : null;
    },

    getToken(): string | null {
        return localStorage.getItem('token');
    },
};