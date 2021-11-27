import { AiOutlineCodeSandbox } from "react-icons/ai";
import "./style.css";

const DisplayTech = ({ curr, removeTech }) => {
  return (
    <div className="display-tech-container">
      <div className="display-box-icon">
        <AiOutlineCodeSandbox size={50} />
      </div>
      <div className="display-box-info">
        <h3>{curr.title}</h3>
        <p>{curr.status}</p>
      </div>
      <button
        className="display-button-tech"
        onClick={() => removeTech(curr.id)}
      >
        x
      </button>
    </div>
  );
};

export default DisplayTech;
