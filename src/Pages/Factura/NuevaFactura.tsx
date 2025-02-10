import { useEffect, useState } from "react";
import { Detalle } from "../../Models/Detalle";
import { PaymentMethodSelection } from "./PaymentMethodSelection";
import { Pago } from "../../Models/Pago";
import { InvoiceSummary } from "./InvoiceSummary";
import Button from "../../Components/Button";
import { FacturasService } from "../../Services/FacturasService";
import { Loading } from "../../Components/Loading";
import { Dialog } from "../../Components/Dialog";
import { useLocation, useParams } from "react-router-dom";
import { CustomerSelection } from "./Customer-selection";
import { ProductSelection } from "./Product-selection";
import { Person } from "../../Models/Person";
import { ComprasService } from "../../Services/ComprasService";

export function NuevaFactura() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  const option: string =
    location.pathname === "/nuevacompra" ||
    location.pathname.includes("compras")
      ? "compra"
      : "factura";

  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Person>();
  const [detalles, setDetalles] = useState<Detalle[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<Pago>();
  const facturasService: FacturasService = new FacturasService();
  const comprasService: ComprasService = new ComprasService();

  const [viewCustomer, setViewCustomer] = useState<Person>();

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    if (option === "compra") {
      comprasService
        .getById(id)
        .then((item) => {
          setViewCustomer(item.idProveedorNavigation);
          setDetalles(item.detalleCompras ?? []);
        })
        .catch((error) => console.error(error))
        .finally(() => setIsLoading(false));
    } else {
      facturasService
        .getById(id)
        .then((item) => {
          setViewCustomer(item.idClienteNavigation);
          setPaymentMethod(item.idPagoNavigation);
          setDetalles(item.detalleFacturas ?? []);
        })
        .catch((error) => console.error(error))
        .finally(() => setIsLoading(false));
    }
  }, [id, option]);

  const handleAddProduct = (detalle: Detalle) => {
    setDetalles([...detalles, detalle]);
  };

  const handleUpdateProduct = (updatedProduct: Detalle) => {
    setDetalles(
      detalles.map((d) =>
        d.idProducto === updatedProduct.idProducto ? updatedProduct : d
      )
    );
  };

  const handleRemoveProduct = (productId: number) => {
    setDetalles(detalles.filter((d) => d.idProducto !== productId));
  };

  const handleSave = async () => {
    try {
      if (!selectedCustomer || !paymentMethod || detalles.length === 0) {
        return;
      }
      setIsLoading(true);
      const total = detalles.reduce((acc, d) => acc + d.subtotal, 0);
      paymentMethod.monto = total;
      const newFactura = {
        fecha: new Date(),
        total,
        idCliente: selectedCustomer.id!,
        idEmpleado: 2,
        pago: paymentMethod,
        detalles,
      };

      if (option === "compra") {
        await comprasService.create(newFactura);
      } else {
        await facturasService.create(newFactura);
      }
    } catch (error) {
      console.error("Error al guardar factura:", error);
    } finally {
      setIsLoading(false);
      setShowDialog(true);
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
      <div className="p-4 space-y-4 ">
        <CustomerSelection
          option={option}
          customer={viewCustomer}
          onSelect={setSelectedCustomer}
        />
        <ProductSelection
          option={option}
          detalles={detalles}
          readOnly={!!id}
          onAddDetalle={handleAddProduct}
          onUpdateDetalle={handleUpdateProduct}
          onRemoveDetalle={handleRemoveProduct}
        />
        <PaymentMethodSelection
          paymentMethod={paymentMethod}
          onSelect={setPaymentMethod}
        />
        <InvoiceSummary products={detalles} />
        {!id && <Button onClick={handleSave}>Guardar</Button>}
      </div>
    </>
  );
}
