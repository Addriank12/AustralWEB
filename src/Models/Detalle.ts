export interface Detalle {
    idProducto: number;
    precio: number;
    cantidad: number;
    readonly subtotal: number;
}