import { useEffect, useState } from "react";
import { Pago } from "../../Models/Pago";

const paymentMethods = [
  { value: "credit-card", label: "Tarjeta" },
  { value: "bank-transfer", label: "Transferencia" },
  { value: "cash", label: "Efectivo" },
];

export function PaymentMethodSelection({
  onSelect,
  paymentMethod,
}: {
  onSelect: (value: Pago) => void;
  paymentMethod?: Pago;
}) {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [readOnly, setReadOnly] = useState(false);

  useEffect(() => {
    if (paymentMethod) {
      setSelectedMethod(paymentMethod.metodo);
      setReadOnly(true);
      return;
    }
  }, [paymentMethod]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedMethod(value);
    onSelect({
      metodo: value,
      monto: 0,
    });
  };

  return (
    <div className="bg-[#030711] p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Metodos de pago</h2>
      <select
        disabled={readOnly}
        value={selectedMethod}
        onChange={handleChange}
        className="w-full p-2 border rounded-lg bg-[#1D283A] text-white"
      >
        <option value="" disabled>
          Seleccione un metodo de pago
        </option>
        {paymentMethods.map((method) => (
          <option key={method.value} value={method.value}>
            {method.label}
          </option>
        ))}
      </select>
    </div>

  );
}
