// index.js
// Este arquivo armazena as ações disparadas para os Reducers


export const SET_CLIENT_FULL_DATA = 'SET_NOME';
export const SET_NOME = 'SET_NOME';
export const SET_CPF = 'SET_CPF';
export const SET_CLIENTE_DATA = 'SET_CLIENTE_DATA';
export const SET_ENDERECO_DATA = 'SET_ENDERECO_DATA';
export const ADD_TELEFONE = 'ADD_TELEFONE';
export const SET_TELEFONE = 'SET_TELEFONE';
export const REMOVE_TELEFONE = 'REMOVE_TELEFONE';
export const ADD_EMAIL = 'ADD_EMAIL';
export const SET_EMAIL = 'SET_EMAIL';
export const REMOVE_EMAIL = 'REMOVE_EMAIL';
export const SET_USER_LOGGEDIN = 'SET_USER_LOGGEDIN';
export const CLEAR_STORE = 'CLEAR_STORE';

export const setClient = (clientData) => ({
  type: SET_CLIENT_FULL_DATA,
  clientData,
});

export const setNome = (nome) => ({
  type: SET_NOME,
  nome,
});

export const setCPF = (cpf) => ({
  type: SET_CPF,
  cpf,
});

export const saveClientData = (nome, cpf) => ({
  type: SET_CLIENTE_DATA,
  nome,
  cpf,
});

export const saveEnderecoData = (cep, logradouro, bairro, cidade, uf, complemento, id) => ({
  type: SET_ENDERECO_DATA,
  cep,
  logradouro,
  bairro,
  cidade,
  uf,
  complemento,
  id,
});

export const addContent = (contentType) => ({
  type: contentType === 'telefone' ? ADD_TELEFONE : ADD_EMAIL,
});

export const setTelefone = (id, tipo, numero) => ({
  type: SET_TELEFONE,
  id,
  tipo,
  numero,
});

export const setDeleteTelefone = (id) => ({
  type: REMOVE_TELEFONE,
  id,
});

export const setEmail = (id, email) => ({
  type: SET_EMAIL,
  id,
  email,
});

export const setDeleteEmail = (id) => ({
  type: REMOVE_EMAIL,
  id,
});

export const setUserLoggedIn = (user) => ({
  type: SET_USER_LOGGEDIN,
  user,
});

export const clearStore = () => ({
  type: CLEAR_STORE,
})
;
