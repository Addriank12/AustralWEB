import { Outlet } from "react-router-dom";
import { CartProvider } from "../cliente-app/CartContext";
import { Cart } from "../cliente-app/CartView";

export default function ClientLayout() {
  return (
    <div className=" ">
      <CartProvider>
          <div className="flex">
            <main className="flex-grow">{<Outlet />}</main>
            <aside className="w-1/4 p-4">
              <Cart />
            </aside>
          </div>
        </CartProvider>
        
      
    </div>
  );
}
