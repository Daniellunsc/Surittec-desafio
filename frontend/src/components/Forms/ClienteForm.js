import React from "react";
import { editCliente } from "../../api/clientes";
import { connect } from "react-redux";
import { saveClientData } from "../../actions";
import ControlButtons from "./ControlButtons";
import NumberFormat from 'react-number-format'
import InputLabel from "../InputLabel";
import ProtectedComponent from "../ProtectedComponent";

class ClienteForm extends React.Component {
  state = {
    hovering: false,
    editing: true,
    nome: "",
    cpf: "",
    errors: []
  };

  componentDidMount() {
    const { nome, cpf } = this.props;
    this.setState({
      nome: nome,
      cpf: cpf
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
    let resultValidate = this.validateFields()
    if (resultValidate.length > 0) {
      this.setState({ errors: resultValidate })
      return;
    }
    saveData(nome, cpf);
    this.setState({ editing: false, errors: [] });
    if (!creating) {
      editCliente(clienteId, nome, cpf);
    }
  };

  validateFields = () => {
    let errors = []
    const { nome, cpf } = this.state;
    if (nome.length < 3) {
      errors.push('Nome não pode ser menor que 3 caracteres')
    }

    if (nome.length > 100) {
      errors.push('Nome não pode ser maior que 100 caracteres')
    }

    if (!nome.match(/^[a-zA-Z0-9 ]*$/)) {
      errors.push('Só é permitido letras, números e espaços no nome.')
    }

    if (!cpf.match(/[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}/)) {
      errors.push('CPF no formato inválido')
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
