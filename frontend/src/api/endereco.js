// endereco.js
// Este arquivo representa os métodos utilizados para manipular a API de endereços

// Cria um endereço vinculado a um cliente baseado no cep, logradouro, bairro, cidade, uf e complemento
// @param clienteId: string
// @param cep: string
// @param logradouro: string
// @param bairro: string
// @param cidade: string
// @param uf: string
// @param complemento: string
export const createEndereco = (clienteId, cep, logradouro, bairro, cidade, uf, complemento) => {
  const accessToken = localStorage.getItem('tokenAuth');
  return fetch('http://localhost:8080/clienteEndereco', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      cliente: clienteId, cep, logradouro, bairro, cidade, uf, complemento,
    }),
  }).then((res) => res.json());
};

// Edita um endereço baseado no enderecoId
// @param fieldsToEdit: string
// @param enderecoId: string
export const editEndereco = (fieldsToEdit, enderecoId) => {
  const accessToken = localStorage.getItem('tokenAuth');
  return fetch(`http://localhost:8080/clienteEndereco/${enderecoId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify({ ...fieldsToEdit }),
  }).then((res) => res.json());
};

