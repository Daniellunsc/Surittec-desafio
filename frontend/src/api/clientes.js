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