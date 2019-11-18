// Divider.js

import React from 'react';
import AddButton from './AddButton';
import ProtectedComponent from './ProtectedComponent';

// Componente responsável por exibir um divisor e verificar se deve exibir o botão de adicionar.
const Divider = ({ text, type }) => (
  <>
    <div className="dropdown-divider" />

    <div className="d-flex justify-content-between my-2">
      <label className="text-muted text-center">{text}</label>
      <ProtectedComponent allowedUsers={['admin']}>
        {type ? <AddButton type={type} /> : <div />}
      </ProtectedComponent>

    </div>
  </>
);

export default Divider;
