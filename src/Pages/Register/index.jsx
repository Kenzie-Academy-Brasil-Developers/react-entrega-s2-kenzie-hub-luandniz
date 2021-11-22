import { Button } from "../../Components/Button";
import { useHistory } from "react-router-dom";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "../../Services/api";
import { toast } from "react-toastify";
import "./style.css";

export const Register = () => {
  const history = useHistory();

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Campo Obrigatório")
      .max(20, "Máximo 20 caracteres"),
    email: yup.string().email("Email inválido").required("Campo Obrigatório"),
    bio: yup.string().required("Campo Obrigatório"),
    contact: yup
      .string()
      .required("Campo Obrigatório")
      .matches("^[0-9]*$", "Apenas Números"),
    course_module: yup.string().required("required"),
    password: yup
      .string()
      .min(8, "Mínimo de 8 dígitos")
      .required("Campo Obrigatório"),
    confirm_password: yup.string().oneOf([yup.ref("password"), null], "error"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleNavigation = (path) => {
    return history.push(path);
  };

  const onSubmitFunction = ({
    email,
    password,
    name,
    bio,
    contact,
    course_module,
  }) => {
    const user = { email, password, name, bio, contact, course_module };
    api
      .post("/users", user)
      .then((response) => {
        toast.success("Cadastrado com sucesso");
        return history.push("/signin");
      })
      .catch((error) => toast.error("Erro ao criar a conta"));
  };

  return (
    <div className="main">
      <div className="title">
        <h1>Kenzie</h1>
        <div className="title-hub">
          <h1>Hub</h1>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmitFunction)}
        className="form-container"
      >
        <div className="textfield-form">
          <TextField
            className="form-textfield"
            id="outlined-required"
            label="Nome"
            style={{ width: 452 }}
            {...register("name")}
          />
          <div className="error-form">{errors.name?.message}</div>
        </div>

        <div className="textfield-form">
          <TextField
            className="form-textfield"
            id="outlined-required"
            label="E-mail"
            style={{ width: 452 }}
            {...register("email")}
          />
          <div className="error-form">{errors.email?.message}</div>
        </div>

        <div className="textfield-form">
          <TextField
            className="form-textfield"
            id="outlined-required"
            label="Bio"
            style={{ width: 452 }}
            {...register("bio")}
          />
          <div className="error-form">{errors.bio?.message}</div>
        </div>

        <div className="textfield-form">
          <TextField
            className="form-textfield"
            id="outlined-required"
            label="Telefone"
            style={{ width: 452 }}
            {...register("contact")}
          />
          <div className="error-form">{errors.contact?.message}</div>
        </div>

        <div className="textfield-form">
          <TextField
            className="form-textfield"
            id="outlined-required"
            label="Módulo do curso"
            style={{ width: 452 }}
            {...register("course_module")}
          />
          <div className="error-form">{errors.course_module?.message}</div>
        </div>

        <div className="textfield-form">
          <TextField
            id="outlined-password-input"
            label="Senha"
            type="password"
            autoComplete="current-password"
            style={{ width: 452 }}
            {...register("password")}
          />
          <div className="error-form">{errors.password?.message}</div>
        </div>

        <div className="textfield-form">
          <TextField
            id="outlined-password-input"
            label="Confirmar Senha"
            type="password"
            autoComplete="current-password"
            style={{ width: 452 }}
            {...register("confirm_password")}
          />
          <div className="error-form">{errors.confirm_password?.message}</div>
        </div>

        <Button className="button-form" type="submit">
          {/* onClick={() => handleNavigation("/dashboard")} */}
          Cadastre-se
        </Button>
        <p className="footer-form">
          Já possui uma conta? <Link to="/signin">Faça seu login.</Link>
        </p>
      </form>
    </div>
  );
};
