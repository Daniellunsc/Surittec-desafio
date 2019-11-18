// clienteReducer.js
// Representa o reducer utilizado para manipular os dados do cliente na aplicação.


import {
  SET_CLIENTE_DATA,
  SET_ENDERECO_DATA,
  ADD_TELEFONE,
  SET_TELEFONE,
  REMOVE_TELEFONE,
  ADD_EMAIL,
  REMOVE_EMAIL,
  SET_EMAIL,
  SET_CLIENT_FULL_DATA,
  CLEAR_STORE,
} from '../actions';

const initialState = {
  nome: '',
  cpf: '',
  endereco: {
    cep: '',
    logradouro: '',
    bairro: '',
    cidade: '',
    uf: '',
    complemento: '',
  },
  telefones: [],
  emails: [],
};

const clienteReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CLIENT_FULL_DATA:
      // Define um objeto inteiro de cliente na store.
      return {
        ...action.clientData,
      };

    case SET_CLIENTE_DATA:
      // Define apenas nome e cpf na store.
      return {
        ...state,
        nome: action.nome,
        cpf: action.cpf,
      };
    case SET_ENDERECO_DATA:
      // Define os dados do endereço.
      return {
        ...state,
        endereco: {
          id: action.id,
          cep: action.cep,
          logradouro: action.logradouro,
          bairro: action.bairro,
          cidade: action.cidade,
          uf: action.uf,
          complemento: action.complemento,
        },
      };

    case ADD_TELEFONE:
      // Adiciona um telefone a lista de telefones.

      // Verifica se não existe nenhum telefone sendo editado ou criado.
      const telefonesBeingCreated = state.telefones.filter(
        (telefone) => telefone.numero === '' || telefone.tipo === '',
      ).length > 0;
      if (telefonesBeingCreated) {
        // Se houver telefone sendo criado, alerta que é necessário salvar o telefone antes de adicionar um novo.
        alert(
          'Já existe um telefone a ser criado, salve-o antes de adicionar um novo.',
        );
        return state;
      }

      return {
        ...state,
        telefones: [
          {
            // Aqui é gerado um ID aleatório apenas para que ele possa ser mapeado no componente <Cliente>
            // O id gerado não é inserido no banco de dados.
            id: Math.random(),
            tipo: '',
            numero: '',
          },
          ...state.telefones,
        ],
      };

    case SET_TELEFONE:
      // Define os dados de um telefone

      // Filtra a lista de telefones a fim de retirar o telefone que será atualizado na lista.
      const telefoneWithoutBeingSaved = state.telefones.filter((telefone) => telefone.id !== action.id);
      return {
        ...state,
        telefones: [
          // Adiciona o telefone na lista.
          {
            id: action.id,
            tipo: action.tipo,
            numero: action.numero,
          },
          // Escreve a lista sem o telefone que está sendo editado.
          ...telefoneWithoutBeingSaved,
        ],
      };

    case REMOVE_TELEFONE:
      // Remove um telefone da lista.

      // Filtra a lista de todos os telefones exceto o que está sendo retirado
      const telefonesWithoutOne = state.telefones.filter((telefone) => telefone.id !== action.id);
      if (telefonesWithoutOne.length === 0) {
        // Se for o único telefone a ser retirado,
        // Alerta o usuário que não é possivel retirar o telefone pois é necessário ter um na lista.
        alert('Ao menos um telefone é necessário!');
        return state;
      }
      return {
        ...state,
        telefones: telefonesWithoutOne,
      };

    case ADD_EMAIL:
      // Adiciona um email a lista de emails.

      // Verifica se não existe nenhum email sendo editado ou criado.
      const emailsBeingCreated = state.emails.filter((email) => email.email === '').length > 0;
      if (emailsBeingCreated) {
        // Se houver, alerta o usuário que salve o email antes de prosseguir.
        alert(
          'Já existe um email a ser criado, salve-o antes de adicionar um novo.',
        );
        return state;
      }

      return {
        ...state,
        emails: [
          {
            // Aqui é gerado um ID aleatório apenas para que ele possa ser mapeado no componente <Cliente>
            // O id gerado não é inserido no banco de dados.
            id: Math.random(),
            email: '',
          },
          ...state.emails,
        ],
      };

    case SET_EMAIL:
      // Define os dados de um email

      // Filtra a lista de email a fim de retirar o emails que será atualizado na lista.
      const emailWithoutBeingSaved = state.emails.filter((email) => email.id !== action.id);
      return {
        ...state,
        emails: [
          {
            id: action.id,
            email: action.email,
          },
          ...emailWithoutBeingSaved,
        ],
      };

    case REMOVE_EMAIL:
      // Remove um email da lista.

      // Filtra a lista de todos os emails exceto o que está sendo retirado
      const emailsWithoutOne = state.emails.filter((email) => email.id !== action.id);
      if (emailsWithoutOne.length === 0) {
        // Se for o único telefone a ser retirado,
        // Alerta o usuário que não é possivel retirar o telefone pois é necessário ter um na lista.
        alert('Ao menos um email é necessário!');
        return state;
      }
      return {
        ...state,
        emails: emailsWithoutOne,
      };

    case CLEAR_STORE:
      // Limpa a store para seus dados iniciais
      return {
        ...state,
        ...initialState,
      };

    default:
      return state;
  }
};

export default clienteReducer;
