import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "./modal";
import { toast, ToastContainer } from "react-toastify";

export default function ProductInfo() {
  let { product_id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const favoriteProduct = () => {
    const favorites = JSON.parse(localStorage.getItem("@favorites")) || [];
    const isAlreadyFavorited = favorites.some((item) => item.id === product.id);

    if (isAlreadyFavorited) {
      toast.info("Produto já favoritado!");
      return;
    }

    favorites.push(product);
    localStorage.setItem("@favorites", JSON.stringify(favorites));
    setIsFavorite(true);
    toast.success("Produto favoritado com sucesso!");
  };

  const getProduct = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products/${product_id}`
      );
      if (response.ok) {
        const data = await response.json();
        setProduct(data);

        const favorites = JSON.parse(localStorage.getItem("@favorites")) || [];
        const isAlreadyFavorited = favorites.some(
          (item) => item.id === data.id
        );
        setIsFavorite(isAlreadyFavorited);
      }
    } catch (err) {
      toast.error("Erro ao obter o produto!");
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
        toast.success("Produto excluído com sucesso!");
        navigate("/");
      }
    } catch (err) {
      toast.error("Erro ao excluir o produto!");
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
          <ToastContainer />
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

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  style={{ width: 150 }}
                  onClick={() => setModalIsOpen(true)}
                >
                  Excluir produto
                </button>

                <button
                  style={{ width: 150 }}
                  onClick={favoriteProduct}
                  disabled={isFavorite}
                >
                  {isFavorite ? "Favoritado" : "Favoritar"}
                </button>
              </div>
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
