// TelefoneForm.js

import React from 'react';
import { deleteTelefone, editTelefone, createTelefone } from '../../api/telefones';
import { connect } from 'react-redux'
import { setTelefone, setDeleteTelefone } from '../../actions';
import ControlButtons from './ControlButtons';
import InputLabel from '../InputLabel';
import NumberFormat from 'react-number-format';
import ProtectedComponent from '../ProtectedComponent';

// Componente responsável por gerenciar o formulário de um ÚNICO telefone.
class TelefoneForm extends React.Component {

    state = {
        id: '',
        tipo: '',
        numero: '',
        hovering: false,
        editing: true,
        errors: []
    }

    componentDidMount() {
        const { telefoneData, creating } = this.props;
        if (telefoneData) {
            this.setState({ id: telefoneData.id, tipo: telefoneData.tipo, numero: telefoneData.numero, editing: creating })
        }
    }

    handleChange = (e) => {
        const { target } = e;
        this.setState({ [target.name]: target.value })
    }

    setEdit = () => {
        const { editing } = this.state;
        this.setState({ editing: !editing })
    }

    saveNumber = () => {
        const { telefoneData, client, creating, saveTelefone, removeTelefone } = this.props;
        const { id, tipo, numero } = this.state;
        

        let validationResults = this.validateFields();

        // Se houverem erros na validação, define o estado de errors.
        if (validationResults.length > 0) {
            this.setState({ errors: validationResults })
            return
        }

          // Se não houverem errors na validação, salva o telefone na Store.
        saveTelefone(id, tipo, numero)
        this.setState({ editing: false, errors: [] })
        
         // Se não estiver no modo de criação: editando os dados de um cliente do banco de dados
        // Verifica se o telefone já é um telefone cadastrado no banco, ou se é apenas um que estava sendo criado.
        if(!creating) {
             // É um telefone que veio do banco de dados?
            if(telefoneData.numero) {
                 // Edita o telefone no banco de dados e salva na store o seu novo telefone.
                editTelefone({ tipo, numero, cliente: client }, telefoneData.id).then((res) => {
                    if(res) {
                        saveTelefone(res.id, res.tipo, res.numero)
                    }
                    this.setState({ editing: false })
                })
            } else {
                // Cria o telefone no banco de dados e salva na store o telefone criado,
                // retirando o telefone com ID Falso.
                createTelefone(client, tipo, numero).then(res => {
                    if(res.id) {
                        removeTelefone(id)
                        saveTelefone(res.id, res.tipo, res.numero)
                    }
                })
            }
        }

       
    }

    deleteNumber = () => {
        const { telefoneData, creating, telefones, removeTelefone } = this.props;
        const { id } = this.state;

        // Se não estiver no modo de criação: editando os dados de um telefone do banco
        if(!creating){

            // Verifica se irão sobrar telefones válidos do cliente ainda
            const validTelephonesRemaining = telefones.filter(telefone => telefone.numero !== "" && telefone.id !== telefoneData.id)
            if(validTelephonesRemaining.length >= 1) {
                // Se o resultado for maior ou igual a um, verifica se o telefone é um telefone com ID falso
                // Ou se é um telefone que veio do banco de dados.
                if(telefoneData.numero !== "") {
                    // Se for um telefone do banco de dados, deleta o telefone e remove da Store.
                    deleteTelefone(telefoneData.id).then(res => removeTelefone(telefoneData.id))
                } else {
                     // Se for um telefone com ID falso, deleta da Store apenas.
                    removeTelefone(telefoneData.id)
                }
            } else {
                // Se não sobrar ao menos um telefone depois da deleção, alerta que não é possível remover o telefone.
                alert('É necessário ao menos um telefone válido.')
            }
        } else{
             // Se estiver em modo de criação, deleta o telefone da Store.
            removeTelefone(id)
        }
    }

    validateFields = () => {
        const { tipo, numero } = this.state;
        const {creating} = this.props;
        let errors = []

        if (!tipo) {
            errors.push('Um tipo deve ser selecionado para este número')
        }

        if (!numero) {
            errors.push('Um numero deve ser informado')
        }

        if(creating) {
            if ((tipo === "residencial" || tipo === "comercial")
            && numero && !numero.match(/\(\d{2,}\) \d{4,}\-\d{4}/)) {
            errors.push('Telefone não está compatível com o tipo informado')
            }

            if ((tipo === "celular")
                && numero && !numero.match(/\(\d{2,}\) \d{1,} \d{4,}\-\d{4}/)) {
                errors.push('Telefone não está compatível com o tipo informado')
            }
        } else {
            if ((tipo === "residencial" || tipo === "comercial")
            && numero && !numero.match(/\(\d{2,}\) \d{4,}\-\d{4}/) && !numero.match(/\d{2,}\d{4,}\d{4}/)) {
            errors.push('Telefone não está compatível com o tipo informado')
            }

            if ((tipo === "celular")
                && numero && !numero.match(/\(\d{2,}\) \d{1,} \d{4,}\-\d{4}/) && !numero.match(/\d{2,}\d{4,}\d{4}/)) {
                errors.push('Telefone não está compatível com o tipo informado')
            }
        }

       

        return errors;
    }

    render() {
        const { hovering, tipo, numero, editing, errors } = this.state;
        return (
            <div class={`card my-2 ${errors.length > 0 && 'border-warning'}`} onMouseEnter={() => this.setState({ hovering: true })} onMouseLeave={() => this.setState({ hovering: false })}>
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
                    {
                        hovering && (
                            <ProtectedComponent allowedUsers={['admin']}>
                                <ControlButtons editing={editing} edit={this.setEdit} save={this.saveNumber} deleteAction={this.deleteNumber} />
                            </ProtectedComponent>
                            
                        )
                    }
                    <div className="row my-3">
                        <div className="col-md-4">
                            <InputLabel text="Tipo" required />
                            <select name="tipo" value={tipo} onChange={this.handleChange} class="custom-select" id="inputGroupSelect01" disabled={!editing}>
                                <option selected>Tipo</option>
                                <option value="residencial">Residencial</option>
                                <option value="comercial">Comercial</option>
                                <option value="celular">Celular</option>
                            </select>
                        </div>
                        <div className="col-md-8">
                            <InputLabel text="Telefone" required />
                            <NumberFormat
                                format={tipo === "celular" ? "(##) # ####-####" : "(##) ####-####"}
                                mask="_"
                                disabled={!editing}
                                onChange={this.handleChange}
                                value={numero}
                                name="numero"
                                type="text"
                                class="form-control"
                                placeholder="Número do telefone" />

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveTelefone: (id, tipo, numero) => dispatch(setTelefone(id, tipo, numero)),
        removeTelefone: (id) => dispatch(setDeleteTelefone(id))
    }
}

export default connect(null, mapDispatchToProps)(TelefoneForm);