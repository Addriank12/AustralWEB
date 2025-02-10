import { Person } from "./Person";

export interface Cliente extends Person {
  email: string;
  password?: string;
}

export interface AuthResponse {
  token: string;
  cliente: Cliente;
}
