import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductInfo() {
  let { product_id } = useParams();

  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getProduct = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products/${product_id}`
      );
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
      } else {
        alert("Erro ao obter o produto!");
      }
    } catch (err) {
      alert("Erro ao obter o produto!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (product_id) {
      getProduct();
    }
  }, [product_id]);

  return (
    <div
      style={{
        height: "100vh",
        width: "95vw",
        margin: "0 auto",
        padding: "10px",
      }}
    >
      {isLoading ? (
        <p>Carregando os dados do produto...</p>
      ) : (
        <div>
          {product?.title ? (
            <>
              <p>{product.title}</p>
              <p>{product.description}</p>
              <p>{product.category}</p>
              <img src={product?.images[0]} alt={product.title} />
            </>
          ) : (
            <p>Não foi possível carregar os dados do produto...</p>
          )}
        </div>
      )}
    </div>
  );
}
