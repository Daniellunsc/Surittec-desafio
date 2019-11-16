export const getAllClientes = () => {
    const accessToken = localStorage.getItem("tokenAuth")
    return fetch('http://localhost:8080/clientes', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
        method: 'GET'
    }).then(res => res.json())
}

export const getClienteById = (id) => {
    const accessToken = localStorage.getItem("tokenAuth")
    return fetch(`http://localhost:8080/clientes/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
        method: 'GET'
    }).then(res => res.json())
}

export const createCliente = (nome, cpf, endereco={}, telefones=[], emails=[]) => {
    const accessToken = localStorage.getItem("tokenAuth")
    return fetch(`http://localhost:8080/clientes`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({nome, cpf, endereco, telefones, emails})
    }).then(res => res.json())
}

export const editCliente = (clienteId, nome, cpf) => {
    const accessToken = localStorage.getItem("tokenAuth")
    return fetch(`http://localhost:8080/clientes/${clienteId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify({nome, cpf})
    }).then(res => res.json())
}

export const deleteCliente = (clienteId) => {
    const accessToken = localStorage.getItem("tokenAuth")
    return fetch(`http://localhost:8080/clientes/${clienteId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
    }).then(res => res.json())
}