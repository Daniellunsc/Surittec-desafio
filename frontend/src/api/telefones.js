export const createTelefone = (clienteId, tipo, numero) => {
    const accessToken = localStorage.getItem("tokenAuth")
    return fetch('http://localhost:8080/clienteTelefones', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({cliente: clienteId, tipo, numero})
    }).then(res => res.json())
}

export const editTelefone = (fieldsToEdit, telefoneId) => {
    const accessToken = localStorage.getItem("tokenAuth")
    return fetch(`http://localhost:8080/clienteTelefones/${telefoneId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify({...fieldsToEdit})
    }).then(res => res.json())
}

export const deleteTelefone = (telefoneId) => {
    const accessToken = localStorage.getItem("tokenAuth")
    return fetch(`http://localhost:8080/clienteTelefones/${telefoneId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
    }).then(res => res.json())
}
