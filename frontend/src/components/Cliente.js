import React from "react";
import { getClienteById } from "../api/clientes";
import TelefoneForm from "./Forms/TelefoneForm";
import EmailForm from "./Forms/EmailForm";

class Cliente extends React.Component {
  state = {
    clientData: {},
    loading: true
  };

  componentDidMount() {
    const { match } = this.props;
    if (match) {
      const { id } = match.params;
      getClienteById(id).then(res => this.setState({ clientData: res, loading: false }));
    }
  }

  addItemToArray = (type) => {
    const { clientData } = this.state;
    switch (type) {
      case 'email':
          const emails = clientData.emails;
          const creatingEmails = emails.filter(email => email.id === "")
          if (emails.length === 0 || creatingEmails.length > 0) {
            alert('Já existe um email a ser criado, salve-o antes de adicionar um novo.')
            return;
          }
  
          this.setState({
            clientData: {
              ...clientData,
              emails: [
                ...clientData.emails,
                {
                  id: "",
                  email: "",
                }
              ]
            }
          })
          return;
      case 'telefone':
        if (clientData.telefones.filter(telefone => telefone.id === "").length > 0) {
          alert('Já existe um telefone a ser criado, salve-o antes de adicionar um novo.')
          return;
        }

        this.setState({
          clientData: {
            ...clientData,
            telefones: [
              ...clientData.telefones,
              {
                id: "",
                tipo: "",
                numero: "",
              }
            ]
          }
        })
        return;
      default:
        return;
    }
  }

  reloadCallback = () => {
    const { match } = this.props;
    if (match) {
      const { id } = match.params;
      getClienteById(id).then(res => this.setState({ clientData: res, loading: false }));
    }
  }

  render() {
    const { clientData, loading } = this.state;
    return (
      <div class={`card ${!loading && 'card-unico-cliente'}`} style={{ width: "18rem" }}>
        <div class="card-header">
          voltar
        </div>
        <div class="card-body card-clientes-body">
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
              <h6 class="card-subtitle mb-2 text-muted text-center">Dados do cliente</h6>
              <div className="dropdown-divider" />
              <form>
                <div class="form-group">
                  <div className="row">
                    <div className="col-md-6">
                      <label className="text-left">Nome</label>
                      <input type="text" class="form-control" placeholder="José" />
                    </div>

                    <div className="col-md-6">
                      <label className="text-left">CPF</label>
                      <input type="text" class="form-control" placeholder="000.000.000-00" />
                    </div>
                  </div>



                </div>

                <div className="dropdown-divider" />
                <label className="text-muted text-center">Endereço do cliente</label>
                <div class="form-group">

                </div>
                <div className="row">
                  <div className="col-md-4">
                    <label className="text-left">CEP</label>
                    <input type="text" class="form-control" placeholder="00000-000" />
                  </div>

                  <div className="col-md-8">
                    <label className="text-left">Logradouro</label>
                    <input type="text" class="form-control" placeholder="Logradouro" />
                  </div>
                </div>

                <div className="row my-3">
                  <div className="col-md-5">
                    <label className="text-left">Bairro</label>
                    <input type="text" class="form-control" placeholder="Bairro" />
                  </div>

                  <div className="col-md-5">
                    <label className="text-left">Cidade</label>
                    <input type="text" class="form-control" placeholder="Cidade" />
                  </div>

                  <div className="col-md-2">
                    <label className="text-left">UF</label>
                    <input type="text" class="form-control" placeholder="UF" />
                  </div>
                </div>

                <div className="row my-3">
                  <div className="col-md-12">
                    <label className="text-left">Complemento</label>
                    <textarea type="text" class="form-control" placeholder="complemento" />
                  </div>
                </div>
              </form>

              <div className="dropdown-divider" />
              <div className="d-flex justify-content-between my-2">
                <label className="text-muted text-center">Telefone(s)</label>
                <button className="btn btn-success" onClick={() => this.addItemToArray('telefone')}>Adicionar</button>
              </div>

              {clientData.telefones.length > 0 &&
                (clientData.telefones.map(telefone =>
                  <TelefoneForm
                    telefones={clientData.telefones}
                    key={telefone.id}
                    client={clientData.id}
                    telefoneData={telefone}
                    reloadCallback={this.reloadCallback}
                  />))}

              {clientData.telefones.length === 0 &&
                (<TelefoneForm telefones={clientData.telefones} client={clientData.id} telefoneData={null} reloadCallback={this.reloadCallback} />)}

              <div className="dropdown-divider" />
              <div className="d-flex justify-content-between my-2">
                <label className="text-muted text-center">Email(s)</label>
                <button className="btn btn-success" onClick={() => this.addItemToArray('email')}>Adicionar</button>
              </div>
              {clientData.emails.length > 0 &&
                (clientData.emails.map(email =>
                  <EmailForm
                    emails={clientData.emails}
                    key={email.id}
                    client={clientData.id}
                    emailData={email}
                    reloadCallback={this.reloadCallback}
                  />))}

              {clientData.emails.length === 0 &&
                (<EmailForm
                  emails={clientData.emails}
                  client={clientData.id}
                  emailData={null}
                  reloadCallback={this.reloadCallback}
                />)}

            </>
          )}
        </div>
      </div>
    );
  }
}

export default Cliente;
