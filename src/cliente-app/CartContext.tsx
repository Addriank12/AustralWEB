import type React from "react"
import { createContext, useContext, useState } from "react"
import { Producto } from "../Models/Producto"
import { Detalle } from "../Models/Detalle"


type CartContextType = {
  items: Detalle[]
  addToCart: (product: Producto) => void
  removeFromCart: (id: number) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Detalle[]>([])

  const addToCart = (product: Producto) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.idProducto === product.id)
      if (existingItem) {
        return prevItems.map((item) => (item.idProducto === product.id ? { ...item, cantidad: item.cantidad + 1, subtotal: (item.cantidad + 1) * item.precio } : item))
      }
      return [...prevItems, { idProducto: product.id!, descripcion: product.descripcion, cantidad: 1, subtotal: product.precio, nombre: product.nombre, precio: product.precio, stock: product.stock, imagen: product.imagen }]
    })
  }

  const removeFromCart = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.idProducto !== id))
  }

  return <CartContext.Provider value={{ items, addToCart, removeFromCart }}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

