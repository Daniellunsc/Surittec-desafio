//viacep.js
//Este arquivo representa os métodos utilizados para manipular a API do viaCEP.

// Busca um cep.
// @param cep: string
export const searchCep = (cep) => {
    return fetch(`https://viacep.com.br/ws/${cep}/json`, {
        method: 'GET',
    }).then(res => res.json())
}