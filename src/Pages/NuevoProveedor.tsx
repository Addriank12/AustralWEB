import React, { useEffect, useState } from "react";
import Button from "../Components/Button";
import { Dialog } from "../Components/Dialog";
import { Loading } from "../Components/Loading";
import { useParams } from "react-router-dom";
import { ProveedoresService } from "../Services/ProveedoresService";

export function NuevoProveedor() {
  const { id } = useParams<{ id: string }>();
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const proveedoresService: ProveedoresService = new ProveedoresService();

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    proveedoresService
      .getById(id)
      .then((item) => {
        setNombre(item.nombre);
        setTelefono(item.telefono);
        setDireccion(item.direccion);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const proveedor = { id: Number(id), nombre, telefono, direccion };
    if (id) {
      proveedoresService
        .update(id, proveedor)
        .then(() => setShowDialog(true))
        .catch((error) => {
          setErrors(error);
        })
        .finally(() => setIsLoading(false));
    } else {
      proveedoresService
        .create(proveedor)
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
      <div className="max-w-xl w-[400px] mx-auto mt-10 max-h-[400px] p-6 bg-[#1D283A] rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-white">
          {id ? "Editar Proveedor" : "Nuevo Proveedor"}
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
            <label className="block text-gray-400">Dirección</label>
            <input
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              className="w-full px-3 py-2 border rounded bg-[#2A3B5A] text-white"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <Button>Guardar</Button>
        </form>
      </div>
    </>
  );
}
