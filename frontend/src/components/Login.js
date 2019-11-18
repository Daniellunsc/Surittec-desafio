// Login.js

import React from "react";
import { checkAuth, performLogin } from "../api/login";
import { setUserLoggedIn } from "../actions";
import {connect} from 'react-redux'

// Componente responsável por gerenciar todas funcionalidades de Login.
class Login extends React.Component {
  state = {
    usuario: "",
    senha: "",
    loading: true,
  };

  componentDidMount() {
    const {saveLoggedUser} = this.props;
    checkAuth().then(res => {
      if (!res || res.error) {
        this.setState({ loading: false });
      } else {
        this.setState({loading: false});
        saveLoggedUser({...res})
        window.location.href = "/home"
      }
    });
  }

  handleChange = e => {
    const { target } = e;
    this.setState({ [target.name]: target.value });
  };

  validateFieldsAndLogin = () => {
    const {usuario, senha} = this.state;
    if(!usuario) {
        alert("Usuário faltando")
    }
    if(!senha) {
        alert("Senha faltando")
    }

    this.setState({loading: true});
    performLogin(usuario, senha).then(res => this.validateLoginResult(res))
  }

  validateLoginResult = (loginResponse) => {
    const {saveLoggedUser} = this.props;
    const {usuario} = this.state;
    if(loginResponse) {
        if(loginResponse.token) {
            localStorage.setItem('tokenAuth', loginResponse.token);
            saveLoggedUser({usuario})
            window.location.href = "/home"
        }
    }
  }

  render() {
    const { loading, usuario, senha } = this.state;

    return (
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          {loading && (
            <>
              <div class="spinner-border text-success" role="status">
                <span class="sr-only">Verificando usuário</span>
              </div>
              <span className="text-muted">Verificando usuário</span>
            </>
          )}

          {!loading && (
            <>
              <h5 className="card-title">Realize Login</h5>
              <div class="input-group mb-2 my-1">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Usuário"
                  value={usuario}
                  name="usuario"
                  onChange={this.handleChange}
                />

                <div class="input-group mb-2 my-1">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Senha"
                    value={senha}
                    name="senha"
                    onChange={this.handleChange}
                  />
                </div>

                <button class="btn btn-success btn-block" disabled={!usuario || !senha} onClick={this.validateFieldsAndLogin}>Logar</button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      saveLoggedUser: (user) => dispatch(setUserLoggedIn(user))
  }
}


export default connect(null, mapDispatchToProps)(Login);
