import React, { useEffect, useState } from "react";
import Button from "../Components/Button";
import { ClientesService } from "../Services/ClientesService";
import { Dialog } from "../Components/Dialog";
import { Loading } from "../Components/Loading";
import { useParams } from "react-router-dom";

export function NuevoCliente() {
  const { id } = useParams<{ id: string }>();
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const clientesService: ClientesService = new ClientesService();

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    clientesService
      .getById(id)
      .then((item) => {
        setNombre(item.nombre);
        setTelefono(item.telefono);
        setEmail(item.email);
        setDireccion(item.direccion ?? "");
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const cliente = { id: Number(id), nombre, telefono, email, direccion };
    if (id) {
      clientesService
        .update(id, cliente)
        .then(() => setShowDialog(true))
        .catch((error) => {
          setErrors(error);
        })
        .finally(() => setIsLoading(false));
    } else {
      clientesService
        .create(cliente)
        .then(() => setShowDialog(true))
        .catch((error) => {
          setErrors(error);
        })
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <>
      <Loading isOpen={isLoading} />
      <Dialog
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        message={"Guardado correctamente"}
      />
      <div className="max-w-xl w-[400px] mx-auto mt-10 max-h-[450px] p-6 bg-[#1D283A] rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-white">
          {id ? "Editar Cliente" : "Nuevo Cliente"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-400">Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-3 py-2 border rounded bg-[#2A3B5A] text-white"
            />
            {errors.nombre && (
              <p className="text-red-500 text-sm">{errors.nombre}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-400">Teléfono</label>
            <input
              type="text"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="w-full px-3 py-2 border rounded bg-[#2A3B5A] text-white"
            />
            {errors.telefono && (
              <p className="text-red-500 text-sm">{errors.telefono}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-400">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded bg-[#2A3B5A] text-white"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-400">Dirección</label>
            <input
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              className="w-full px-3 py-2 border rounded bg-[#2A3B5A] text-white"
            />
            {errors.direccion && (
              <p className="text-red-500 text-sm">{errors.direccion}</p>
            )}
          </div>
          <Button>Guardar</Button>
        </form>
      </div>
    </>
  );
}
