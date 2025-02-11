import { useState } from "react";
import { useCart } from "./CartContext";

export function Cart() {
  const { items, removeFromCart } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const total = items.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      const idCliente = localStorage.getItem("cliente");
      const facturasService: FacturasService = new FacturasService();
      if (idCliente) {
        var factura: Factura = {
          idCliente: Number(idCliente),
          pago: { monto: total, metodo: "Web" },
          detalles: items,
          fecha: new Date(),
          total: total,
          idEmpleado: 2,
        };
        await facturasService.create(factura);
        setIsCheckoutOpen(true);
      }
    } catch (error) {
      console.error("Error al guardar factura:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Loading isOpen={isLoading} />
      <div style={styles.container}>
        <h2 style={styles.title}>Carrito de Compras</h2>
        {items.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <>
            {items.map((item) => (
              <div key={item.idProducto} style={styles.item}>
                <span>
                  {item.nombre} (x{item.cantidad})
                </span>
                <span>${(item.precio * item.cantidad).toFixed(2)}</span>
                <button
                  style={styles.removeButton}
                  onClick={() => removeFromCart(item.idProducto)}
                >
                  Eliminar
                </button>
              </div>
            ))}
            <div style={styles.total}>Total: ${total.toFixed(2)}</div>
            <button style={styles.checkoutButton} onClick={handleCheckout}>
              Completar Compra
            </button>
          </>
        )}

        {isCheckoutOpen && (
          <div style={styles.dialogOverlay}>
            <div style={styles.dialogContent}>
              <h3 style={styles.dialogTitle}>Compra Completada</h3>
              <p style={styles.dialogDescription}>
                Gracias por tu compra. Tu pedido ha sido procesado con éxito.
              </p>
              <button
                style={styles.closeButton}
                onClick={() => setIsCheckoutOpen(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// Estilos en línea
import { CSSProperties } from "react";
import { Factura } from "../Models/Factura";
import { FacturasService } from "../Services/FacturasService";
import { Loading } from "../Components/Loading";

const styles: { [key: string]: CSSProperties } = {
  container: {
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    padding: "24px",
    maxWidth: "500px",
    margin: "0 auto",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "16px",
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  removeButton: {
    backgroundColor: "#ef4444",
    color: "#ffffff",
    border: "none",
    borderRadius: "4px",
    padding: "6px 12px",
    cursor: "pointer",
    fontSize: "14px",
  },
  total: {
    fontSize: "20px",
    fontWeight: "bold",
    marginTop: "16px",
  },
  checkoutButton: {
    backgroundColor: "#3b82f6",
    color: "#ffffff",
    border: "none",
    borderRadius: "4px",
    padding: "12px",
    width: "100%",
    marginTop: "16px",
    cursor: "pointer",
    fontSize: "16px",
  },
  dialogOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  dialogContent: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    padding: "24px",
    maxWidth: "400px",
    width: "100%",
    textAlign: "center",
  },
  dialogTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "12px",
  },
  dialogDescription: {
    fontSize: "16px",
    marginBottom: "16px",
  },
  closeButton: {
    backgroundColor: "#3b82f6",
    color: "#ffffff",
    border: "none",
    borderRadius: "4px",
    padding: "8px 16px",
    cursor: "pointer",
    fontSize: "14px",
  },
};
