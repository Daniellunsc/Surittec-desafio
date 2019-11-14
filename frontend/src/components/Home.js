import React from "react";
import { getAllClientes } from "../api/clientes";
import ClienteList from "./ClienteList";

class Home extends React.Component {
  state = {
    loading: true,
    listClients: []
  };

  componentDidMount() {
    getAllClientes().then(res => this.setState({ listClients: res }));
  }

  render() {
    const { listClients } = this.state;
    return (
      <div class="card card-clientes">
        <h5 class="card-header">Clientes</h5>
        <div class="card-body card-clientes-body">
          <ul class="list-group list-group-flush text-left">
            {listClients.map(c => (
              <ClienteList cliente={c}/>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Home;
