import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "./modal";

export default function ProductInfo() {
  let { product_id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/${product_id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        alert("Produto excluído com sucesso!");
        navigate("/");
      } else {
        alert("Erro ao excluir o produto!");
      }
    } catch (err) {
      alert("Erro ao excluir o produto!");
    } finally {
      setModalIsOpen(false);
    }
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
      {isLoading ? (
        <p>Carregando os dados do produto...</p>
      ) : (
        <div>
          {product?.title ? (
            <div style={{ display: "flex" }}>
              <div>
                <p>{product.title}</p>
                <p>{product.description}</p>
                <p>{product.category}</p>
                <img
                  style={{ width: "50px", height: "50px" }}
                  src={product?.images[0]}
                  alt={product.title}
                />
              </div>

              <button onClick={() => setModalIsOpen(true)}>
                Excluir produto
              </button>
            </div>
          ) : (
            <p>Não foi possível carregar os dados do produto...</p>
          )}
        </div>
      )}

      <Modal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
