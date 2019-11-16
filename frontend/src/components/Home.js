import React from "react";
import { getAllClientes } from "../api/clientes";
import ClienteList from "./ClienteList";
import { Redirect } from 'react-router-dom';
import ProtectedComponent from "./ProtectedComponent";

class Home extends React.Component {
  state = {
    loading: true,
    listClients: [],
    redirect: {
      to: "",
      should: false,
    }
  };

  componentDidMount() {
    getAllClientes().then(res => this.setState({ listClients: res }));
  }

  deslogarUsuario = () => {
    const confirmationDeslog = window.confirm('Você deseja deslogar?')
    if (confirmationDeslog) {
      localStorage.removeItem('tokenAuth')
      window.location.href = '/'
    }
  }

  render() {
    const { listClients, redirect } = this.state;

    if (redirect.should) {
      return <Redirect to={redirect.to} />
    }



    return (
      <div class="card card-clientes">
        <div className="card-header d-flex justify-content-between" onClick={() => this.setState({ redirect: { to: '/createcliente', should: true } })}>
          <div>
            <h5>Clientes</h5>
          </div>
          <div className="d-flex justify-content-end">
            <ProtectedComponent allowedUsers={['admin']}>
              <div>
                <button className="btn btn-success mx-2">Adicionar</button>
              </div>
            </ProtectedComponent>

            <div>
              <button className="btn btn-danger" onClick={this.deslogarUsuario}>Deslogar</button>
            </div>
          </div>

        </div>

        <div class="card-body card-clientes-body">
          <ul class="list-group list-group-flush text-left">
            {listClients.map(c => (
              <ClienteList cliente={c} />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Home;
