import { useEffect, useState } from "react";

export default function TP2_5() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch("https://dummyjson.com/products");
        if (resp.ok) {
          const data = await resp.json();
          setProducts(data.products);
          console.log(data.products);
        } else {
          alert("Erro ao obter produtos!");
        }
      } catch (err) {
        alert("Erro ao obter produtos!");
      }
    };

    fetchData();
  }, []);

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
          onClick={() => {}}
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
          />
          <p>{product.title}</p>
        </button>
      ))}
    </div>
  );
}
