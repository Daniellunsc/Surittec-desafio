// ClienteForm.js

import React from "react";
import { editCliente } from "../../api/clientes";
import { connect } from "react-redux";
import { saveClientData } from "../../actions";
import ControlButtons from "./ControlButtons";
import NumberFormat from 'react-number-format'
import InputLabel from "../InputLabel";
import ProtectedComponent from "../ProtectedComponent";

// Componente responsável por gerenciar os formulários referentes aos dados básicos do cliente (Nome e CPF)
class ClienteForm extends React.Component {
  state = {
    hovering: false,
    editing: false,
    nome: "",
    cpf: "",
    errors: []
  };

  componentDidMount() {
    const { nome, cpf, creating } = this.props;
    this.setState({
      nome: nome,
      cpf: cpf,
      editing: creating
    });
  }

  handleChange = e => {
    const { target } = e;
    this.setState({ [target.name]: target.value });
  };

  setEdit = () => {
    const { editing } = this.state;
    this.setState({ editing: !editing });
  };

  saveCliente = () => {
    const { saveData, creating, clienteId } = this.props;
    const { nome, cpf } = this.state;
    // Realiza a validação dos campos
    let resultValidate = this.validateFields()
    if (resultValidate.length > 0) {
      // Define o estado dos erros que a validação retornou
      this.setState({ errors: resultValidate })
      return;
    }

    // Se não houver errors, salva o cliente na Store.
    saveData(nome, cpf);
    this.setState({ editing: false, errors: [] });

    // Se o componente não estiver no modo de criação: editando um dado do banco de dados
    // Realiza a edição também no banco de dados.
    if (!creating) {
      editCliente(clienteId, nome, cpf);
    }
  };

  // Realiza a validação dos campos do componente
  validateFields = () => {
    let errors = []
    const { nome, cpf } = this.state;
    const { creating } = this.props;
    if (nome.length < 3) {
      errors.push('Nome não pode ser menor que 3 caracteres')
    }

    if (nome.length > 100) {
      errors.push('Nome não pode ser maior que 100 caracteres')
    }

    // Se houver caracteres especiais no nome, o regex não irá dar match.
    if (!nome.match(/^[a-zA-Z0-9 ]*$/)) {
      errors.push('Só é permitido letras, números e espaços no nome.')
    }
    
    if(creating) {
       // Se o CPF não tiver todos os caracteres preenchidos, o regex não irá dar match.
      if (!cpf.match(/[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}/)) {
        errors.push('CPF no formato inválido')
      }
    } else {
       // Se o CPF não tiver todos os caracteres preenchidos, o regex não irá dar match, ou o CPF não mudou e permanece o mesmo do banco
       if (!cpf.match(/[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}/) && !cpf.match(/[0-9]{3}[0-9]{3}[0-9]{3}[0-9]{2}/)) {
        errors.push('CPF no formato inválido')
      }
    }
   

    return errors;
  }

  render() {
    const { hovering, editing, nome, cpf, errors } = this.state;
    return (
      <div
        class={`card my-2 ${errors.length > 0 && 'border-warning'}`}
        onMouseEnter={() => this.setState({ hovering: true })}
        onMouseLeave={() => this.setState({ hovering: false })}
      >
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
        <div class="card-body">
          {hovering && (

            <ProtectedComponent allowedUsers={['admin']}>
              <ControlButtons editing={editing} edit={this.setEdit} save={this.saveCliente} />
            </ProtectedComponent>
          )}
          <div class="form-group">
            <div className="row">
              <div className="col-md-6">
                <InputLabel text="Nome" required />
                <input
                  onChange={this.handleChange}
                  disabled={!editing}
                  value={nome}
                  name="nome"
                  type="text"
                  class="form-control"
                  placeholder="Digite o nome"
                />
              </div>

              <div className="col-md-6">
                <InputLabel text="CPF" required />
                <NumberFormat
                  required
                  onChange={this.handleChange}
                  disabled={!editing}
                  value={cpf}
                  name="cpf"
                  type="text"
                  class="form-control"
                  placeholder="000.000.000-00"
                  format="###.###.###-##"
                  mask="_"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Realiza o map do reducer para as props do componente
const mapStateToProps = ({ clienteReducer }) => {
  return {
    nome: clienteReducer.nome,
    cpf: clienteReducer.cpf
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveData: (nome, cpf) => dispatch(saveClientData(nome, cpf))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClienteForm);
