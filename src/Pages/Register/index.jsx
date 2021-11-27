import { Button } from "../../Components/Button";
import { useHistory } from "react-router-dom";
import { TextField } from "@mui/material";
import { Link, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "../../Services/api";
import { toast } from "react-toastify";
import "./style.css";

export const Register = ({ authenticated }) => {
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
    course_module: yup.string().required("Campo Obrigatório"),
    password: yup
      .string()
      .min(6, "Mínimo de 6 dígitos")
      .required("Campo Obrigatório"),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password"), null], "As senha não correspondem"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  if (authenticated) {
    return <Redirect to="/dashboard" />;
  }

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
    <div className="register-container">
      <div className="register-content">
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
              label="Nome"
              style={{ width: 452 }}
              {...register("name")}
              helperText={errors.name?.message}
            />
          </div>

          <div className="textfield-form">
            <TextField
              className="form-textfield"
              id="outlined-required"
              label="E-mail"
              style={{ width: 452 }}
              {...register("email")}
              helperText={errors.email?.message}
            />
          </div>

          <div className="textfield-form">
            <TextField
              className="form-textfield"
              id="outlined-required"
              label="Bio"
              style={{ width: 452 }}
              {...register("bio")}
              helperText={errors.bio?.message}
            />
          </div>

          <div className="textfield-form">
            <TextField
              className="form-textfield"
              id="outlined-required"
              label="Telefone"
              style={{ width: 452 }}
              {...register("contact")}
              helperText={errors.contact?.message}
            />
          </div>

          <div className="textfield-form">
            <TextField
              className="form-textfield"
              label="Módulo do curso"
              style={{ width: 452 }}
              {...register("course_module")}
              helperText={errors.course_module?.message}
            />
          </div>

          <div className="textfield-form">
            <TextField
              label="Senha"
              type="password"
              autoComplete="current-password"
              style={{ width: 452 }}
              {...register("password")}
              helperText={errors.password?.message}
            />
          </div>

          <div className="textfield-form">
            <TextField
              label="Confirmar Senha"
              type="password"
              autoComplete="current-password"
              style={{ width: 452 }}
              {...register("confirm_password")}
              helperText={errors.confirm_password?.message}
            />
          </div>

          <Button className="button-form" type="submit">
            Cadastre-se
          </Button>
          <p className="footer-form">
            Já possui uma conta? <Link to="/signin">Faça seu login.</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
