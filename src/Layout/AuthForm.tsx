import React, { useState } from 'react';
import { AuthService } from '../Services/AuthService';
import { AuthResponse, Cliente } from '../Models/Cliente';

interface AuthFormProps {
  onLogin: (cliente: Cliente) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      let response: AuthResponse;
      if (isLogin) {
        response = await AuthService.login(email, password);
      } else {
        const cliente: Cliente = {
          nombre,
          direccion,
          email,
          telefono,
          password,
        };
        response = await AuthService.register(cliente);
      }

      localStorage.setItem('token', response.token);
      localStorage.setItem('cliente', JSON.stringify(response.cliente));
      onLogin(response.cliente);
    } catch (err) {
      setError('Error al iniciar sesión o registrar. Verifica tus datos.');
      console.error(err);
    }
  };

  return (
    <div className="bg-[#1D283A] p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-xl font-semibold mb-4">
        {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
      </h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <div className="mb-4">
              <label className="block text-gray-400">Nombre</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full p-2 border rounded-lg bg-[#030711] text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-400">Dirección</label>
              <input
                type="text"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                className="w-full p-2 border rounded-lg bg-[#030711] text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-400">Teléfono</label>
              <input
                type="text"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="w-full p-2 border rounded-lg bg-[#030711] text-white"
                required
              />
            </div>
          </>
        )}
        <div className="mb-4">
          <label className="block text-gray-400">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-lg bg-[#030711] text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-lg bg-[#030711] text-white"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
        </button>
      </form>
      <p className="mt-4 text-gray-400">
        {isLogin ? '¿No tienes una cuenta? ' : '¿Ya tienes una cuenta? '}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-500 hover:underline"
        >
          {isLogin ? 'Regístrate' : 'Inicia Sesión'}
        </button>
      </p>
    </div>
  );
};

export default AuthForm;