import {  Detalle } from "../../Models/Detalle";

export function InvoiceSummary({ products }: { products: Detalle[] }) {
  // Calcular el subtotal, impuesto y total
  const subtotal = products.reduce(
    (sum, product) => sum + product.precio * product.cantidad,
    0
  );
  const taxRate = 0.15; // 10% de tasa de impuesto
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return (
    <div
      style={{
        backgroundColor: "#030711",
        padding: "1rem",
        borderRadius: "0.5rem",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2
        style={{
          fontSize: "1.25rem",
          fontWeight: "600",
          marginBottom: "1rem",
          color: "white",
        }}
      >
        Resumen de factura
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "white",
          }}
        >
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "white",
          }}
        >
          <span>IVA (15%):</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "bold",
            color: "white",
          }}
        >
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
