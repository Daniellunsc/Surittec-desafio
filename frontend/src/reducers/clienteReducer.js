import {
    SET_NOME,
    SET_CPF,
    SET_CLIENTE_DATA,
    SET_ENDERECO_DATA,
    ADD_TELEFONE,
    SET_TELEFONE,
    REMOVE_TELEFONE,
    ADD_EMAIL,
    REMOVE_EMAIL,
    SET_EMAIL,
    SET_CLIENT_FULL_DATA,
    CLEAR_STORE
} from "../actions";

let initialState = {
    nome: "",
    cpf: "",
    endereco: {
        cep: "",
        logradouro: "",
        bairro: "",
        cidade: "",
        uf: "",
        complemento: ""
    },
    telefones: [],
    emails: []
};

const clienteReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_CLIENT_FULL_DATA:
            return {
                ...action.clientData
            }

        case SET_CLIENTE_DATA:
            return {
                ...state,
                nome: action.nome,
                cpf: action.cpf
            };
        case SET_ENDERECO_DATA:
            return {
                ...state,
                endereco: {
                    id: action.id,
                    cep: action.cep,
                    logradouro: action.logradouro,
                    bairro: action.bairro,
                    cidade: action.cidade,
                    uf: action.uf,
                    complemento: action.complemento
                }
            };

        case ADD_TELEFONE:
            const telefonesBeingCreated = state.telefones.filter(
                telefone => telefone.numero === "" || telefone.tipo === "").length > 0
            if (telefonesBeingCreated) {
                alert(
                    "Já existe um telefone a ser criado, salve-o antes de adicionar um novo."
                );
                return state;
            }

            return {
                ...state,
                telefones: [
                    {
                        id: Math.random(),
                        tipo: "",
                        numero: ""
                    },
                    ...state.telefones
                ]
            };

        case SET_TELEFONE:
            const telefoneWithoutBeingSaved = state.telefones.filter(telefone => telefone.id !== action.id)
            return {
                ...state,
                telefones: [
                    {
                        id: action.id,
                        tipo: action.tipo,
                        numero: action.numero,
                    },
                    ...telefoneWithoutBeingSaved
                ]
            }

        case REMOVE_TELEFONE:
            const telefonesWithoutOne = state.telefones.filter(telefone => telefone.id !== action.id)
            if(telefonesWithoutOne.length === 0) {
                alert('Ao menos um telefone é necessário!')
                return state;
            }
            return {
                ...state,
                telefones: telefonesWithoutOne
            }

        case ADD_EMAIL:
            const emailsBeingCreated = state.emails.filter(email => email.email === "").length > 0
            if (emailsBeingCreated) {
                alert(
                    "Já existe um email a ser criado, salve-o antes de adicionar um novo."
                );
                return state;
            }

            return {
                ...state,
                emails: [
                    {
                        id: Math.random(),
                        email: "",
                    },
                    ...state.emails
                ]
            };

        case SET_EMAIL:
            const emailWithoutBeingSaved = state.emails.filter(email => email.id !== action.id)
            return {
                ...state,
                emails: [
                    {
                        id: action.id,
                        email: action.email
                    },
                    ...emailWithoutBeingSaved
                ]
            }

        case REMOVE_EMAIL:
            const emailsWithoutOne = state.emails.filter(email => email.id !== action.id)
            if(emailsWithoutOne.length === 0) {
                alert('Ao menos um email é necessário!')
                return state;
            }
            return {
                ...state,
                emails: emailsWithoutOne
            }

        case CLEAR_STORE:
            return {
                ...state,
                ...initialState
            }

        default:
            return state;
    }
};

export default clienteReducer;
