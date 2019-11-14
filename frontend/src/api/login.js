export const performLogin = (usuario, senha) => {
  return fetch("http://localhost:8080/auth", {
    method: "POST",
    body: JSON.stringify({ usuario, senha })
  }).then(res => res.json());
};

export const checkAuth = () => {
  const authToken = localStorage.getItem("tokenAuth");
  return new Promise(async (resolve, reject) => {
    if (authToken) {
        let responseLoggedUser = await fetch("http://localhost:8080/me", {
          headers: {
              Authorization: `Bearer ${authToken}`
          },
          method: "GET"
        })
        resolve(await responseLoggedUser.json())
      }
      return resolve(false);
  })
  
};
