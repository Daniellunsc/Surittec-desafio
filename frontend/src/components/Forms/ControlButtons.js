// ControlButtons.js
import React from 'react';

// Componente que exibe os botões de controle de edição e deleção.
const ControlButtons = ({
  editing, edit, save, deleteAction,
}) => (
  <div className="d-flex justify-content-end">
    <div className="btn btn-group m-0 p-0">
      {!editing && (
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => edit()}
        >
          editar
        </button>
      )}
      {editing && (
        <button
          type="button"
          className="btn btn-outline-success"
          onClick={() => save()}
        >
          salvar
        </button>
      )}

      {deleteAction !== undefined && (<button type="button" className="btn btn-outline-danger" onClick={() => deleteAction()}>excluir</button>)}
    </div>
  </div>
);

export default ControlButtons;
