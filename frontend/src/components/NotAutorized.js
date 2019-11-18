import React from 'react';

const NotAutorized = () => (
  <div className="card" style={{ width: '18rem' }}>
    <div className="card-body">
      <h5 className="card-title">Parece que você não pode acessar este recurso :(</h5>
      <a href="/home" className="btn btn-primary">Ir para home</a>
      <a href="/" className="btn btn-primary mx-1">Ir para Login</a>
    </div>
  </div>
);


export default NotAutorized;
