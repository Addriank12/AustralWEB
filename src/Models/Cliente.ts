import { Person } from "./Person";

export interface Cliente extends Person {
  email: string;
  password?: string;
}

export interface AuthResponse {
  message: string;
  token?: string; // Si el backend devuelve un token JWT
  cliente?: number; // Si el backend devuelve el ID del cliente
}