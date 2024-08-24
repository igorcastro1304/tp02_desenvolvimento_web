import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ThemeMode from "../components/ThemeMode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const { username, password } = data;

    if (username === "admin" && password === "root") {
      localStorage.setItem("@authToken", "token-secreto");
      toast.success("Acesso concedido!");
      navigate("/");
      window.location.reload();
    } else {
      toast.error("Credenciais inválidas!");
    }

    reset();
  };

  return (
    <div>
      <header>
        <ThemeMode />
      </header>
      <ToastContainer />
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <input
          {...register("username", {
            required: "O campo nome deve ser preenchido",
          })}
          placeholder="Insira o nome de usuário"
        />
        {errors.username && <span>{errors.username.message}</span>}

        <input
          {...register("password", {
            required: "O campo senha deve ser preenchido",
          })}
          placeholder="Digite sua senha"
          type="password"
        />
        {errors.password && <span>{errors.password.message}</span>}

        <input type="submit" />
      </form>
    </div>
  );
}
