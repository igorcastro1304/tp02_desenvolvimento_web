import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TP2_6() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch("https://dummyjson.com/products");
        if (resp.ok) {
          const data = await resp.json();
          console.log(data);
          setProducts(data.products);
        } else {
          alert("Erro ao obter produtos!");
        }
      } catch (err) {
        alert("Erro ao obter produtos!");
      }
    };

    fetchData();
  }, []);

  const handleProductClick = (productId) => {
    navigate(`product/info/${productId}`);
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "95vw",
        margin: "0 auto",
        padding: "10px",
      }}
    >
      {products.map((product) => (
        <button
          key={product.id}
          onClick={() => handleProductClick(product.id)}
          style={{
            display: "flex",
            border: "1px solid black",
            cursor: "pointer",
            width: "100%",
            marginBottom: "10px",
          }}
        >
          <img
            style={{ height: "50px", width: "50px" }}
            src={product.images[0]}
            alt={product.title}
          />
          <p>{product.title}</p>
        </button>
      ))}
    </div>
  );
}
