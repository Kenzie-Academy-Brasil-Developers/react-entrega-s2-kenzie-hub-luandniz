import { Button } from "../../Components/Button";
import { useHistory } from "react-router-dom";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./style.css";

export const Signin = () => {
  const history = useHistory();

  const schema = yup.object().shape({
    email: yup.string().email("Email inválido").required("Campo Obrigatório"),
    password: yup
      .string()
      .min(8, "Mínimo de 8 dígitos")
      .required("Campo Obrigatório"),
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

  function onSubmitFunction(data) {
    console.log(data);
  }
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
            label="E-mail"
            style={{ width: 452 }}
            {...register("email")}
          />
          <div className="error-form">{errors.email?.message}</div>
        </div>

        <div className="textfield-form">
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            style={{ width: 452 }}
            {...register("password")}
          />
          <div className="error-form">{errors.password?.message}</div>
        </div>
        <Button className="button-form" type="submit">
          {/* onClick={() => handleNavigation("/dashboard")} */}
          Login
        </Button>
        <p className="footer-form"></p>
      </form>
    </div>
  );
};
