// Cliente.js

import React from "react";
import { getClienteById, createCliente, deleteCliente } from "../api/clientes";
import TelefoneForm from "./Forms/TelefoneForm";
import EmailForm from "./Forms/EmailForm";
import EnderecoForm from "./Forms/EnderecoForm";
import ClienteForm from "./Forms/ClienteForm";
import Divider from "./Divider";
import { connect } from 'react-redux';
import { setClient, clearStore } from "../actions";
import ProtectedComponent from "./ProtectedComponent";

// Componente responsável por gerenciar TODOS os formulários e dados do cliente.
// Cada formulário é separado em um componente, porém todos os dados vêm desse componente vinculado a Store.
class Cliente extends React.Component {
  state = {
    clientData: {},
    loading: true,
    errors: [],
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
    const { clientData } = this.props;
    if (prevProps.clientData !== clientData) {
      this.setState({ clientData: clientData, loading: false })
    }
  }

  createOrDeleteClient = () => {

    const { match, clearStoreContent } = this.props;
    // Verifica se está na tela de cliente ou de criação de cliente
    if (match.params.id) {
      const confirmation = window.confirm('Você deseja deletar esse cliente?')
      if (confirmation) {
        // Deleta o cliente se confirmado.
        deleteCliente(match.params.id).then(res => {
          if (res.id) {
            clearStoreContent()
            window.location.href = "/"
            
          }
        })
      }
      // Está na tela de criação de cliente
    } else {
      // Realiza as validações antes de criar o cliente
      let validationResults = this.validateToInsert();
      if (validationResults.length > 0) {
        this.setState({ errors: validationResults })
        return
      }

      const { clientData, clearStoreContent } = this.props;
      const { nome, cpf, endereco, emails, telefones } = clientData;
      // Cria o cliente, redireciona e limpa a store.
      createCliente(nome, cpf, endereco, telefones, emails).then(res => {
        if (res.id) {
          clearStoreContent();
          window.location.href = "/"
        }
      })
    }


  }

  // Realiza todas as validações importantes novamente para garantir
  // a integridade dos dados.
  // Emails e Telefones não são validados pois eles precisam 
  //estar válidos para estarem na lista antes de serem inseridos.
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

    // Verifica se existe ao menos um telefone na lista válido.
    if (telefones.length === 0 || telefones.filter(telefone => telefone.tipo === "").length > 0) {
      errors.push('Ao menos um telefone deve ser registrado')
    }

    // Verifica se existe ao menos um telefone na lista válido.
    if (emails.length === 0 || emails.filter(email => email.email === "").length > 0) {
      errors.push('Ao menos um email deve ser registrado')
    }


    return errors;
  }

  render() {
    const { clientData, loading, errors } = this.state;
    const { match } = this.props;

    return (
      <div
        class={`card ${!loading && "card-unico-cliente"} ${errors.length > 0 && 'border-warning'}`}
        style={{ width: "18rem" }}
      >
        <div class="card-header">
          <a href="/">voltar</a>
        </div>
        {
          errors.length > 0 && (
            <div class="alert alert-warning alert-dismissible" role="alert">
              <strong>Ops!</strong> Verifique os campos
              <ul>
                {errors.map(error => <li>{error}</li>)}
              </ul>
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
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
                    creating={!match.params.id ? true : false}
                    emails={clientData.emails}
                    key={email.id}
                    client={clientData.id || null}
                    emailData={email}
                  />
                ))}
            </>
          )}
        </div>

        <div className="card-footer">
          {match.params.id && !loading
            ?
            <ProtectedComponent allowedUsers={['admin']}>
              <div>
                <button
                  className="btn btn-danger"
                  onClick={() => this.createOrDeleteClient()}>Deletar cliente</button>
              </div>

            </ProtectedComponent>
            :
            <ProtectedComponent allowedUsers={['admin']}>
              <div>
                <button
                  className="btn btn-success"
                  onClick={() => this.createOrDeleteClient()}>Criar cliente</button>
              </div>

            </ProtectedComponent>
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
  return {
    setClient: (clientData) => dispatch(setClient(clientData)),
    clearStoreContent: () => dispatch(clearStore())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cliente);
