export interface Detalle {
    idProducto: number;
    precio: number;
    cantidad: number;
    nombre?: string;
    readonly subtotal: number;
}