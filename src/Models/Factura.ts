import { Cliente } from "./Cliente";
import { Detalle } from "./Detalle";
import { Empleado } from "./Empleado";
import { Pago } from "./Pago";

export interface Factura {
    id?: number;
    fecha: Date;
    total: number;
    idCliente: number;
    idEmpleado: number;
    pago: Pago;
    detalles: Detalle[];
    detalleFacturas?: Detalle[];
    idClienteNavigation?: Cliente;
    idEmpleadoNavigation?: Empleado;
    idPagoNavigation?: Pago;
    servicioEntregas?: any
}