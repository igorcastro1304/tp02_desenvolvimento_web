import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const resp = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      alert("Enviado com sucesso!");
      navigate("/");
    } catch (err) {
      alert("Erro ao enviar!");
    } finally {
      reset();
    }
  };

  return (
    <div>
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
