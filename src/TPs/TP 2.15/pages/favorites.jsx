import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Favorites() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  const getFavorites = () => {
    const favoriteProducts =
      JSON.parse(localStorage.getItem("@favorites")) || [];
    setFavorites(favoriteProducts);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/info/${productId}`);
  };

  const handleRemoveFavorite = (productId) => {
    const updatedFavorites = favorites.filter(
      (product) => product.id !== productId
    );
    setFavorites(updatedFavorites);
    localStorage.setItem("@favorites", JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <div>
      {favorites.map((product) => (
        <div
          key={product.id}
          style={{
            display: "flex",
            border: "1px solid black",
            cursor: "pointer",
            width: "100%",
            marginBottom: "10px",
          }}
        >
          <div style={{ flex: 1 }}>
            <button
              style={{ width: "100%", cursor: "pointer" }}
              onClick={() => handleProductClick(product.id)}
            >
              <img
                style={{ height: "50px", width: "50px" }}
                src={product.images[0]}
                alt={product.title}
              />
              <p>{product.title}</p>
            </button>
          </div>

          <button
            style={{ cursor: "pointer", width: "150px", marginLeft: "10px" }}
            onClick={() => handleRemoveFavorite(product.id)}
          >
            Desfavoritar
          </button>
        </div>
      ))}
    </div>
  );
}
