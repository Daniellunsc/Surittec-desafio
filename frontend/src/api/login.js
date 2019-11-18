// login.js
// Este arquivo representa os métodos utilizados para manipular o login.

// Realiza login
// @param usuario: string
// @param senha: string
export const performLogin = (usuario, senha) => fetch('http://localhost:8080/auth', {
  method: 'POST',
  body: JSON.stringify({ usuario, senha }),
}).then((res) => res.json());

// Verifica o usuário que está autenticado
// Caso não exista um token armazenado, automáticamente é retornado false.
export const checkAuth = () => {
  const authToken = localStorage.getItem('tokenAuth');
  return new Promise(async (resolve, reject) => {
    if (authToken) {
      const responseLoggedUser = await fetch('http://localhost:8080/me', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        method: 'GET',
      });
      resolve(await responseLoggedUser.json());
    }
    return resolve(false);
  });

};
