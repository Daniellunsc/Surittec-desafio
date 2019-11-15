export const createEmail = (clienteId, email) => {
    const accessToken = localStorage.getItem("tokenAuth")
    return fetch('http://localhost:8080/clienteEmails', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({cliente: clienteId, email})
    }).then(res => res.json())
}

export const editEmail = (fieldsToEdit, emailId) => {
    const accessToken = localStorage.getItem("tokenAuth")
    return fetch(`http://localhost:8080/clienteEmails/${emailId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify({...fieldsToEdit})
    }).then(res => res.json())
}

export const deleteEmail = (emailId) => {
    const accessToken = localStorage.getItem("tokenAuth")
    return fetch(`http://localhost:8080/clienteEmails/${emailId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
    }).then(res => res.json())
}
