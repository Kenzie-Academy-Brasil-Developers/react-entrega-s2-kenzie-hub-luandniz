import { Redirect, useHistory } from "react-router-dom";
import { ModalTecnology } from "../../Components/ModalTecnology";
import { ModalJobs } from "../../Components/ModalJobs";
import { useState, useEffect } from "react";
import { api } from "../../Services/api";
import { toast } from "react-toastify";
import DisplayTech from "../../Components/DisplayTech";

import "./style.css";

export const Dashboard = ({ authenticated, setAuthenticated }) => {
  const history = useHistory();

  const [showTechs, setShowTechs] = useState(false);
  const [showJobs, setShowJobs] = useState(false);

  const [techs, setTechs] = useState([]);
  const [works, setWorks] = useState([]);

  const idUser = JSON.parse(localStorage.getItem("@kenziehub:id")) || "";
  const User = JSON.parse(localStorage.getItem("@kenziehub:user")) || "";
  const token = JSON.parse(localStorage.getItem("@kenziehub:token")) || "";

  const logout = () => {
    localStorage.clear();
    history.push("/");
    setAuthenticated(false);
  };

  const removeTech = (tech_id) => {
    api
      .delete(`/users/techs/${tech_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        toast.success("Tecnologia Excluída!");
        setTechs(
          techs.filter((curr) => {
            return tech_id !== curr.id;
          })
        );
      })
      .catch((err) => {
        toast.error("Não foi possível excluir!");
      });
  };

  const removeJobs = (tech_id) => {
    api
      .delete(`/users/works/${tech_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        toast.success("Tecnologia Excluída!");
        setWorks(
          works.filter((ele) => {
            return tech_id !== ele.id;
          })
        );
      })
      .catch((err) => {
        toast.error("Não foi possível excluir!");
      });
  };

  const getTechnoly = () => {
    api
      .get(`/users/${idUser}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTechs(response.data.techs);
      });
  };

  useEffect(() => {
    getTechnoly();
  }, []);

  if (!authenticated) {
    return <Redirect to="/signin" />;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="dashboard-logo">
          <h1>Kenzie</h1>
          <h1 className="title-hub">Hub</h1>
        </div>
      </header>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <div className="dashbord-card-header">
            <h3>Minhas Tecnologias</h3>
            {showTechs && (
              <ModalTecnology
                getTechnoly={getTechnoly}
                setShowTechs={setShowTechs}
              />
            )}
            <button
              className="button-add-tech"
              onClick={() => setShowTechs(true)}
            >
              +
            </button>
          </div>
          <ul>
            {techs?.map((curr) => (
              <DisplayTech key={curr.id} curr={curr} removeTech={removeTech} />
            ))}
          </ul>
        </div>

        <div className="dashboard-card">
          <div className="dashbord-card-header">
            <h3>Meus Trabalhos</h3>
            {showJobs && (
              <ModalJobs setShowJobs={setShowJobs} getTechnoly={getTechnoly} />
            )}
            <button
              className="button-add-job"
              onClick={() => setShowJobs(true)}
            >
              +
            </button>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashbord-card-header">
            <h3>Usuário</h3>
          </div>
          <button onClick={logout} className="button-dashboard" type="submit">
            Sair
          </button>
        </div>
      </div>
    </div>
  );
};
