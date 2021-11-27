import "./style.css";

export const ModalJobs = ({ setShowJobs }) => {
  return (
    <div className="modal-container">
      <div className="modal-content">
        <div className="modal-header-jobs">
          <p className="modal-header-title">
            Esta funcionalidade será adicionada em breve.
          </p>
          <button
            className="modal-jobs-button "
            onClick={() => setShowJobs(false)}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
