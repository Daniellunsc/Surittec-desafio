import React from "react";
import { getClienteById } from "../api/clientes";

class Cliente extends React.Component {
  state = {
    clientData: {},
    loading: true
  };

  componentDidMount() {
    const { match } = this.props;
    if (match) {
      const { id } = match.params;
      getClienteById(id).then(res => this.setState({clientData: res, loading: false}));
    }
  }

  render() {
    const { clientData, loading } = this.state;
    console.log(clientData);
    return (
      <div class={`card ${!loading && 'card-unico-cliente'}`} style={{ width: "18rem" }}>
        <div class="card-header">
            voltar
        </div>
        <div class="card-body">
          {loading && (
            <>
              <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Carregando cliente</span>
              </div>
              <span className="text-muted">Carregando cliente</span>
            </>
          )}

          {!loading && clientData && (
            <>
              <h5 class="card-title"></h5>
              <h6 class="card-subtitle mb-2 text-muted">{clientData.nome}</h6>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default Cliente;
