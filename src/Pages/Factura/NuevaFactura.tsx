import { useEffect, useState } from "react";
import { Cliente } from "../../Models/Cliente";
import { CustomerSelection } from "./customer-selection";
import { ProductSelection } from "./product-selection";
import { Detalle } from "../../Models/Detalle";
import { PaymentMethodSelection } from "./PaymentMethodSelection";
import { Pago } from "../../Models/Pago";
import { InvoiceSummary } from "./InvoiceSummary";
import Button from "../../Components/Button";
import { FacturasService } from "../../Services/FacturasService";
import { Loading } from "../../Components/Loading";
import { Dialog } from "../../Components/Dialog";
import { useParams } from "react-router-dom";

export function NuevaFactura() {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Cliente>();
  const [detalles, setDetalles] = useState<Detalle[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<Pago>();
  const facturasService: FacturasService = new FacturasService();

  const [viewCustomer, setViewCustomer] = useState<Cliente>();

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    facturasService
      .getById(id)
      .then((item) => {
        setViewCustomer(item.idClienteNavigation);
        setPaymentMethod(item.idPagoNavigation);
        setDetalles(item.detalleFacturas ?? []);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, [id]);

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

      await facturasService.create(newFactura);
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
          customer={viewCustomer}
          onSelect={setSelectedCustomer}
        />
        <ProductSelection
          detalles={detalles}
          readOnly={!!id}
          onAddDetalle={handleAddProduct}
          onUpdateDetalle={handleUpdateProduct}
          onRemoveDetalle={handleRemoveProduct}
        />
        <PaymentMethodSelection paymentMethod={paymentMethod} onSelect={setPaymentMethod} />
        <InvoiceSummary products={detalles} />
        {!id && <Button onClick={handleSave}>Guardar</Button>}
        
      </div>
    </>
  );
}
