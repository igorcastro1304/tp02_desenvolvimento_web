import { useForm } from "react-hook-form";

export default function TP2_1() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <input
        {...register("name", { required: "O campo nome deve ser preenchido" })}
        placeholder="Digite seu nome"
      />
      {errors.name && <span>{errors.name.message}</span>}

      <input
        {...register("email", {
          required: "O campo e-mail deve ser preenchido",
          pattern: {
            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            message: "Digite um e-mail válido",
          },
        })}
        placeholder="Digite seu e-mail"
      />
      {errors.email && <span>{errors.email.message}</span>}

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
  );
}
