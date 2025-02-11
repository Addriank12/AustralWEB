import { AuthResponse, Cliente } from "../Models/Cliente";

export const AuthService = {
    async login(email: string, password: string): Promise<AuthResponse> {
        try {
            const response = await fetch(`https://austral-dkd0akd9cvc8frb3.brazilsouth-01.azurewebsites.net/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Network response was not ok');
            }

            const data: AuthResponse = await response.json();
            localStorage.setItem('token', data.token || '');
            localStorage.setItem('cliente', data.cliente ? JSON.stringify(data.cliente) : '');
            return data;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : 'Error during login');
        }
    },

    async register(cliente: Cliente): Promise<AuthResponse> {
        try {
            const response = await fetch(`https://austral-dkd0akd9cvc8frb3.brazilsouth-01.azurewebsites.net/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cliente),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Network response was not ok');
            }

            const data: AuthResponse = await response.json();
            return data;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : 'Error during registration');
        }
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