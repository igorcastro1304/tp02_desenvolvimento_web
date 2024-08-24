import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function AddProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.product) {
      const product = location.state.product;
      reset({
        product: product.title,
        price: product.price,
        description: product.description,
      });
    }
  }, [location.state, reset]);

  const onSubmit = async (data) => {
    try {
      const resp = await fetch(
        `https://dummyjson.com/products/${location.state.product.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      toast.success("Enviado com sucesso!");
      navigate("/");
    } catch (err) {
      toast.error("Erro ao enviar!");
    } finally {
      reset();
    }
  };

  return (
    <div>
      <ToastContainer />
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <input
          {...register("product", {
            required: "O campo deve ser preenchido",
          })}
          placeholder="Digite o nome do produto"
        />
        {errors.product && <span>{errors.product.message}</span>}

        <input
          {...register("price", {
            required: "O campo deve ser preenchido",
          })}
          placeholder="Digite o preço do produto"
        />
        {errors.price && <span>{errors.price.message}</span>}

        <input
          {...register("description", {
            required: "O campo deve ser preenchido",
          })}
          placeholder="Digite a descrição do produto"
        />
        {errors.description && <span>{errors.description.message}</span>}

        <input type="submit" />
      </form>
    </div>
  );
}
