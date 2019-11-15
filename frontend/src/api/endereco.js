export const createEndereco = (clienteId, cep, logradouro, bairro, cidade, uf, complemento) => {
    const accessToken = localStorage.getItem("tokenAuth")
    return fetch('http://localhost:8080/clienteEndereco', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({cliente: clienteId, cep, logradouro, bairro, cidade, uf, complemento})
    }).then(res => res.json())
}

export const editEndereco = (fieldsToEdit, enderecoId) => {
    const accessToken = localStorage.getItem("tokenAuth")
    return fetch(`http://localhost:8080/clienteEndereco/${enderecoId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify({...fieldsToEdit})
    }).then(res => res.json())
}

