import React from "react";
import { getClienteById, createCliente } from "../api/clientes";
import TelefoneForm from "./Forms/TelefoneForm";
import EmailForm from "./Forms/EmailForm";
import EnderecoForm from "./Forms/EnderecoForm";
import ClienteForm from "./Forms/ClienteForm";
import Divider from "./Divider";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { setClient } from "../actions";

class Cliente extends React.Component {
  state = {
    clientData: {},
    loading: true,
    errors: [],
    redirect: {
      to: null,
      should: false,
    },
  };

  componentDidMount() {
    const { match, clientData, setClient } = this.props;
    if (clientData) {
      if (match.params.id) {
        getClienteById(match.params.id)
          .then(res => setClient(res))
      } else {
        this.setState({ clientData: clientData, loading: false })
      }

    }
  }

  componentDidUpdate(prevProps) {
    const {clientData} = this.props;
    if (prevProps.clientData !== clientData) {
      this.setState({ clientData: clientData, loading: false })
    }
  }

  createOrUpdateClient = () => {
    let validationResults = this.validateToInsert();
    if (validationResults.length > 0) {
      this.setState({ errors: validationResults })
      return
    }

    const { clientData } = this.props;
    const { nome, cpf, endereco, emails, telefones } = clientData;
    createCliente(nome, cpf, endereco, telefones, emails).then(res => {
      if (res.id) {
        this.setState({
          redirect: {
            to: res.id,
            should: true
          }
        })
      }
    })
  }

  validateToInsert = () => {
    const errors = [];
    const { clientData } = this.state;
    const { nome, cpf, endereco, emails, telefones } = clientData;

    if (!nome) {
      errors.push('Nome não informado');
    }

    if (!cpf) {
      errors.push('CPF não informado');
    }

    if (!endereco.cep) {
      errors.push('CEP não informado')
    }

    if (!endereco.logradouro) {
      errors.push('Logradouro não informado')
    }

    if (!endereco.bairro) {
      errors.push('Bairro não informado')
    }

    if (!endereco.cidade) {
      errors.push('Cidade não informado')
    }

    if (!endereco.uf) {
      errors.push('UF não informado')
    }

    if (telefones.length === 0 || telefones.filter(telefone => telefone.tipo === "").length > 0) {
      errors.push('Ao menos um telefone deve ser registrado')
    }

    if (emails.length === 0 || emails.filter(email => email.email === "").length > 0) {
      errors.push('Ao menos um email deve ser registrado')
    }


    return errors;
  }

  render() {
    const { clientData, loading, errors, redirect } = this.state;
    const {match} = this.props;
    if (redirect.should) {
      return <Redirect to={`/cliente/${redirect.to}`} />
    }

    return (
      <div
        class={`card ${!loading && "card-unico-cliente"} ${errors.length > 0 && 'border-warning'}`}
        style={{ width: "18rem" }}
      >
        <div class="card-header">voltar</div>
        {
          errors.length > 0 && (
            <div class="alert alert-warning alert-dismissible" role="alert">
              <strong>Ops!</strong> Verifique os campos
                            <ul>
                {errors.map(error => <li>{error}</li>)}
              </ul>
            </div>
          )
        }
        <div class="card-body card-clientes-body my-0 py-0">
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
              <Divider text="Dados do cliente" />
              <ClienteForm
                creating={!match.params.id ? true : false}
                clienteId={match.params.id || null}
              />
              <Divider text="Endereço do cliente" />
              <EnderecoForm
                creating={!match.params.id ? true : false}
                clienteId={match.params.id || null}
                enderecoData={clientData.endereco || null}
              />

              <Divider text="Telefone(s)" type="telefone" />

              {clientData.telefones.length > 0 &&
                clientData.telefones.map(telefone => (
                  <TelefoneForm
                    creating={!match.params.id ? true : false}
                    telefones={clientData.telefones}
                    key={telefone.id}
                    client={clientData.id}
                    telefoneData={telefone}
                  />
                ))}
              <Divider text={"Email(s)"} type="email" />
              {clientData.emails.length > 0 &&
                clientData.emails.map(email => (
                  <EmailForm
                    action={match.params.id ? 'edit' : 'create'}
                    emails={clientData.emails}
                    key={email.id}
                    client={clientData.id || null}
                    emailData={email}
                    reloadCallback={this.reloadCallback}
                    pushToClient={this.pushToClient}
                    removeFromClient={this.removeFromClient}
                  />
                ))}
            </>
          )}
        </div>
        <div className="card-footer">
          {match.params.id 
          ? 
            <button
            className="btn btn-danger"
            onClick={() => this.createOrUpdateClient()}>Deletar cliente</button>
            :
            <button
            className="btn btn-success"
            onClick={() => this.createOrUpdateClient()}>Criar cliente</button>
          }
          
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ clienteReducer }) => {
  return { clientData: clienteReducer }
}

const mapDispatchToProps = (dispatch) => {
  return { setClient: (clientData) => dispatch(setClient(clientData)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cliente);
