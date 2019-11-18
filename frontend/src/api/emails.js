// clientes.js
// Este arquivo representa os métodos utilizados para manipular a API de emails


// Cria um email vinculado a um cliente
// @param clienteId: string
// @param email: string
export const createEmail = (clienteId, email) => {
  const accessToken = localStorage.getItem('tokenAuth');
  return fetch('http://localhost:8080/clienteEmails', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ cliente: clienteId, email }),
  }).then((res) => res.json());
};


// Edita um email baseado em um Id
// @param fieldsToEdit: object
// @param emailId: string
export const editEmail = (fieldsToEdit, emailId) => {
  const accessToken = localStorage.getItem('tokenAuth');
  return fetch(`http://localhost:8080/clienteEmails/${emailId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify({ ...fieldsToEdit }),
  }).then((res) => res.json());
};

// Deleta um email baseado em um Id
// @param emailId: string
export const deleteEmail = (emailId) => {
  const accessToken = localStorage.getItem('tokenAuth');
  return fetch(`http://localhost:8080/clienteEmails/${emailId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
  }).then((res) => res.json());
};
