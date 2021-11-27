import { Button } from "../../Components/Button";
import { useHistory, Redirect, Link } from "react-router-dom";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "../../Services/api";
import { toast } from "react-toastify";
import * as yup from "yup";
import "./style.css";

export const Signin = ({ authenticated, setAuthenticated }) => {
  const history = useHistory();

  const schema = yup.object().shape({
    email: yup.string().email("Email inválido").required("Campo Obrigatório"),
    password: yup
      .string()
      .min(6, "Mínimo de 6 dígitos")
      .required("Campo Obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitFunction = (data) => {
    api
      .post("/sessions", data)
      .then((response) => {
        const { token, user, id } = response.data;
        localStorage.clear();
        setAuthenticated(true);
        localStorage.setItem("@kenziehub:token", JSON.stringify(token));
        localStorage.setItem("@kenziehub:user", JSON.stringify(user));
        localStorage.setItem("@kenziehub:id", JSON.stringify(user.id));

        history.push("/dashboard");
      })
      .catch((err) => toast.error("Email ou senha inválidos"));
  };

  if (authenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="signin-container">
      <div className="signin-content">
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
              label="E-mail"
              style={{ width: 452 }}
              {...register("email")}
              helperText={errors.email?.message}
            />
          </div>

          <div className="textfield-form">
            <TextField
              label="Password"
              type="password"
              autoComplete="current-password"
              style={{ width: 452 }}
              {...register("password")}
              helperText={errors.password?.message}
            />
          </div>

          <Button className="button-form" type="submit">
            Login
          </Button>
          <p className="footer-form">
            Ainda não possui uma conta? <Link to="/">Faça seu cadastro</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
