import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ThemeMode from "../components/ThemeMode";

export default function TP2_14() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch("https://dummyjson.com/products");
        if (resp.ok) {
          const data = await resp.json();
          setProducts(data.products);
        } else {
          toast.error("Erro ao obter produtos!");
        }
      } catch (err) {
        toast.error("Erro ao obter produtos!");
      }
    };

    fetchData();
  }, []);

  const handleProductClick = (productId) => {
    navigate(`product/info/${productId}`);
  };

  const handleEditClick = (product) => {
    navigate("/product/add", { state: { product } });
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(filter.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div
      style={{
        height: "100vh",
        width: "95vw",
        margin: "0 auto",
        padding: "10px",
      }}
    >
      <ToastContainer />
      <header>
        <ThemeMode />
      </header>

      <input
        type="text"
        placeholder="Filtrar por título..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ marginBottom: "20px", padding: "10px", width: "100%" }}
      />

      {currentProducts.map((product) => (
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
            style={{ cursor: "pointer", width: "150px" }}
            onClick={() => handleEditClick(product)}
          >
            Editar
          </button>
        </div>
      ))}

      <div
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      >
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page + 1}
            onClick={() => paginate(page + 1)}
            style={{
              padding: "10px",
              margin: "0 5px",
              backgroundColor: currentPage === page + 1 ? "lightgray" : "white",
              border: "1px solid black",
              cursor: "pointer",
            }}
          >
            {page + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
