import { Link, useParams } from "react-router-dom";
import { useCart } from "./CartContext";
import { useEffect, useState } from "react";
import { ProductosService } from "../Services/ProductosService";
import { Producto } from "../Models/Producto";
import { CSSProperties } from "react";
import placeholderIcon from "../assets/placeholder.svg";
import { Loading } from "../Components/Loading";

export default function ProductInfo1() {
  const { id } = useParams<{ id: string }>();

  const { addToCart } = useCart();
  const [product, setProduct] = useState<Producto>();
  const [isLoading, setIsLoading] = useState(true);

  const productosService: ProductosService = new ProductosService();

  useEffect(() => {
    // Obtener productos desde el backend
    if (id) {
      setIsLoading(true);
      productosService
        .getById(id)
        .then((response) => setProduct(response))
        .catch((error) => console.error("Error fetching data:", error))
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  if (!product) {
    return (
      <div style={styles.notFoundContainer}>
        <h1 style={styles.notFoundTitle}>Producto no encontrado</h1>
        <Link to="/" style={styles.backLink}>
          &larr; Volver a la tienda
        </Link>
      </div>
    );
  }

  return (
    <>
      <Loading isOpen={isLoading} />
      <div style={styles.container}>
        <Link to="/" style={styles.backLink}>
          &larr; Volver a la tienda
        </Link>
        <div style={styles.content}>
          <img
            src={product.imagen || placeholderIcon}
            alt={product.nombre}
            style={styles.productImage}
          />
          <div style={styles.details}>
            <h1 style={styles.productName}>{product.nombre}</h1>
            <p style={styles.productDescription}>{product.descripcion}</p>
            <p style={styles.productPrice}>${product.precio.toFixed(2)}</p>
            <button
              style={styles.addToCartButton}
              onClick={() => addToCart(product)}
            >
              Añadir al Carrito
            </button>
          </div>
        </div>
      </div>
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
  backLink: {
    color: "#3b82f6",
    textDecoration: "none",
    marginBottom: "16px",
    display: "inline-block",
  },
  content: {
    display: "flex",
    flexDirection: "column" as "column",
    gap: "32px",
  },
  productImage: {
    width: "100%",
    height: "300px",
    objectFit: "cover" as CSSProperties["objectFit"],
    borderRadius: "8px",
  },
  details: {
    flex: 1,
  },
  productName: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "16px",
  },
  productDescription: {
    color: "#666",
    fontSize: "16px",
    marginBottom: "16px",
  },
  productPrice: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "24px",
  },
  addToCartButton: {
    backgroundColor: "#3b82f6",
    color: "#ffffff",
    border: "none",
    borderRadius: "4px",
    padding: "12px 24px",
    cursor: "pointer",
    fontSize: "16px",
  },
  notFoundContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "32px",
    textAlign: "center" as "center",
  },
  notFoundTitle: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "16px",
  },
};
