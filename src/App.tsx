import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import InventarioPage from "./Pages/InventarioPage";

function App() {
  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="inventario" element={<InventarioPage />} />
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
