import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";

import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import * as yup from "yup";
import { api } from "../../Services/api";
import "./style.css";

export const ModalTecnology = ({ setShowTechs, getTechnoly }) => {
  const [token] = useState(
    JSON.parse(localStorage.getItem("@kenziehub:token")) || ""
  );

  const schema = yup.object().shape({
    title: yup
      .string()
      .required("Campo Obrigatório")
      .matches(
        "[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$",
        "Deve conter apenas letras"
      ),
    status: yup.string().required("Iniciante, intermediário ou avançado"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitFunction = (data) => {
    console.log(data);
    api
      .post(
        "/users/techs",
        {
          title: data.title,
          status: data.status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        getTechnoly();
        toast.success("Tecnologia Criada com Sucesso!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Algum problema ocorreu, e sua tarefa não foi adicionada!");
      });
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Cadastrar Tecnologias</h3>

          <button
            className="modal-tech_close"
            onClick={() => setShowTechs(false)}
          >
            X
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmitFunction)}>
          <div className="modal-form">
            <div className="modal-input">
              <TextField
                className="dashboard-textfield"
                id="outlined-required"
                placeholder="Nome da tech"
                size="small"
                style={{ width: 280 }}
                {...register("title")}
                helperText={errors.title?.message}
              />
            </div>
            <div>
              <TextField
                className="dashboard-textfield"
                id="outlined-required"
                placeholder="Iniciante, intermediário ou avançado"
                size="small"
                style={{ width: 280 }}
                {...register("status")}
                helperText={errors.password?.message}
              />
            </div>
            <button className="button-modal" type="submit">
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
