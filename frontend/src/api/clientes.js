// clientes.js
// Este arquivo representa os métodos utilizados para manipular a API de clientes

// Realiza um GET de todos os clientes
export const getAllClientes = () => {
  const accessToken = localStorage.getItem('tokenAuth');
  return fetch('http://localhost:8080/clientes', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    method: 'GET',
  }).then((res) => res.json());
};

// Busca um cliente pelo ID
// @param id: string
export const getClienteById = (id) => {
  const accessToken = localStorage.getItem('tokenAuth');
  return fetch(`http://localhost:8080/clientes/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    method: 'GET',
  }).then((res) => res.json());
};

// Cria um novo cliente baseado no nome, cpf, endereço, lista de telefones e de emails.
// @param nome: string
// @param cpf: string
// @param endereco: object
// @param telefones: array
// @param emails: array
export const createCliente = (nome, cpf, endereco = {}, telefones = [], emails = []) => {
  const accessToken = localStorage.getItem('tokenAuth');
  return fetch('http://localhost:8080/clientes', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      nome, cpf, endereco, telefones, emails,
    }),
  }).then((res) => res.json());
};

// Edita um cliente baseado no ID, alterando apenas nome e cpf
// @param nome: string
// @param cpf: string
export const editCliente = (clienteId, nome, cpf) => {
  const accessToken = localStorage.getItem('tokenAuth');
  return fetch(`http://localhost:8080/clientes/${clienteId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify({ nome, cpf }),
  }).then((res) => res.json());
};


// Deleta um cliente baseado no ID
// @param clientId: string
export const deleteCliente = (clienteId) => {
  const accessToken = localStorage.getItem('tokenAuth');
  return fetch(`http://localhost:8080/clientes/${clienteId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
  }).then((res) => res.json());
}
;
