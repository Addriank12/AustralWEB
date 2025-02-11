import React, { useEffect, useState } from "react";
import Button from "../Components/Button";
import { ProductosService } from "../Services/ProductosService";
import { Dialog } from "../Components/Dialog";
import { Loading } from "../Components/Loading";
import { useParams } from "react-router-dom";

export function NuevoProducto() {
  const { id } = useParams<{ id: string }>();
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");
  const [precio, setPrecio] = useState(0);
  const [stock, setStock] = useState(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const productosService: ProductosService = new ProductosService();

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    productosService
      .getById(id)
      .then((item) => {
        setNombre(item.nombre);
        setPrecio(item.precio);
        setStock(item.stock);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (id) {
      productosService
        .update(id?.toString() ?? "", {
          id: Number(id),
          nombre,
          precio,
          stock,
          descripcion,
          imagen
        })
        .then(() => setShowDialog(true))
        .catch((error) => {
          setErrors(error);
        })
        .finally(() => setIsLoading(false));
    } else {
      productosService
        .create({
          nombre,
          precio,
          stock,
          descripcion,
          imagen
        })
        .then(() => setShowDialog(true))
        .catch((error) => {
          setErrors(error);
        })
        .finally(() => setIsLoading(false));
    }

    console.log({ nombre, precio, stock });
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
          {id ? "Editar Producto" : "Nuevo Producto"}
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
            <label className="block text-gray-400">Precio</label>
            <input
              type="text"
              value={precio}
              onChange={(e) => setPrecio(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded bg-[#2A3B5A] text-white"
            />
            {errors.precio && (
              <p className="text-red-500 text-sm">{errors.precio}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-400">Stock</label>
            <input
              type="text"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded bg-[#2A3B5A] text-white"
            />
            {errors.stock && (
              <p className="text-red-500 text-sm">{errors.stock}</p>
            )}
          </div>
          <Button>Guardar</Button>
        </form>
      </div>
    </>
  );
}
