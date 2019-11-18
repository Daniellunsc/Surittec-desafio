// login.js
// Este arquivo representa os métodos utilizados para manipular a API de telefones.

// Cria um telefone vinculado ao cliente
// @param tipo: string
// @param numero: string
export const createTelefone = (clienteId, tipo, numero) => {
  const accessToken = localStorage.getItem('tokenAuth');
  return fetch('http://localhost:8080/clienteTelefones', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ cliente: clienteId, tipo, numero }),
  }).then((res) => res.json());
};

// Edita um telefone.
// @param fieldsToEdit: object
// @param telefoneId: string
export const editTelefone = (fieldsToEdit, telefoneId) => {
  const accessToken = localStorage.getItem('tokenAuth');
  return fetch(`http://localhost:8080/clienteTelefones/${telefoneId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify({ ...fieldsToEdit }),
  }).then((res) => res.json());
};

// Deleta um telefone.
// @param telefoneId: string
export const deleteTelefone = (telefoneId) => {
  const accessToken = localStorage.getItem('tokenAuth');
  return fetch(`http://localhost:8080/clienteTelefones/${telefoneId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
  }).then((res) => res.json());
};
