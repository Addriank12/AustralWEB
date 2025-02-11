import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Producto } from "../Models/Producto";
import { ProductosService } from "../Services/ProductosService";
import placeholderIcon from "../assets/placeholder.svg";
import { Loading } from "../Components/Loading";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [productos, setProductos] = useState<Producto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const productosService: ProductosService = new ProductosService();

  useEffect(() => {
    setIsLoading(true);
    productosService
      .getPage(1, 10, searchTerm)
      .then((response) => setProductos(response.data))
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setIsLoading(false));

  }, [searchTerm]);

  return (
    <>
      {!localStorage.getItem("cliente") ? (
        (() => {  
          console.log(localStorage.getItem("cliente")); // Solo para depuración
          window.location.href = "/login"; // Redirigir al login
          return null; // No renderizar nada
        })()
      ) : (
        <>
          <Loading isOpen={isLoading}/>
          <div style={styles.container}>
            <h1 style={styles.title}>Nuestra Tienda Online</h1>
            <div style={styles.searchContainer}>
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
              />
            </div>
            <div style={styles.grid}>
              {productos.map((product) => (
                <div key={product.id} style={styles.card}>
                  <div style={styles.cardHeader}>
                    <h2 style={styles.cardTitle}>{product.nombre}</h2>
                  </div>
                  <div style={styles.cardContent}>
                    <img
                      src={product.imagen || placeholderIcon}
                      alt={product.nombre}
                      style={styles.productImage as React.CSSProperties}
                    />
                    <p style={styles.productDescription}>
                      {product.descripcion}
                    </p>
                    <p style={styles.productPrice}>
                      ${product.precio.toFixed(2)}
                    </p>
                  </div>
                  <div style={styles.cardFooter as React.CSSProperties}>
                    <Link to={`/product/${product.id}`}>
                      <button style={styles.detailsButton}>Ver Detalles</button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

// Estilos en línea
const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "32px",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "32px",
  },
  searchContainer: {
    marginBottom: "24px",
  },
  searchInput: {
    width: "100%",
    maxWidth: "400px",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "24px",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  },
  cardHeader: {
    padding: "16px",
    borderBottom: "1px solid #eee",
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  cardContent: {
    padding: "16px",
  },
  productImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    marginBottom: "16px",
  },
  productDescription: {
    color: "#666",
    fontSize: "14px",
    marginBottom: "16px",
  },
  productPrice: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  cardFooter: {
    padding: "16px",
    borderTop: "1px solid #eee",
    textAlign: "center",
  },
  detailsButton: {
    backgroundColor: "#3b82f6",
    color: "#ffffff",
    border: "none",
    borderRadius: "4px",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "16px",
  },
};
