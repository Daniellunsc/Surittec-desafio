export const searchCep = (cep) => {
    return fetch(`https://viacep.com.br/ws/${cep}/json`, {
        method: 'GET',
    }).then(res => res.json())
}