// EmailForm.js

import React from 'react';
import { createEmail, editEmail, deleteEmail } from '../../api/emails';
import { setEmail, setDeleteEmail } from '../../actions';
import { connect } from 'react-redux'
import ControlButtons from './ControlButtons';
import InputLabel from '../InputLabel';
import ProtectedComponent from '../ProtectedComponent';

// Componente responsável por gerenciar os formulários relacionados a um ÚNICO email do cliente.
class EmailForm extends React.Component {

    state = {
        hovering: false,
        email: '',
        editing: true,
        errors: [],
    }

    componentDidMount() {
        const { emailData, creating } = this.props;
        if (emailData) {
            this.setState({ id: emailData.id, email: emailData.email, editing: creating })
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

    saveEmail = () => {
        const { emailData, client, creating, saveEmail, removeEmail } = this.props;
        const { id, email } = this.state;
        let validationResults = this.validateFields();

        // Se houverem erros na validação, define o estado de errors.
        if (validationResults.length > 0) {
            this.setState({ errors: validationResults })
            return;
        }
        
        // Se não houverem errors na validação, salva o email na Store.
        saveEmail(id, email)
        this.setState({ editing: false, errors: [] })

        // Se não estiver no modo de criação: editando os dados de um cliente do banco de dados
        // Verifica se o email já é um email cadastrado no banco, ou se é apenas um que estava sendo criado.
        if(!creating) {
            // É um email que veio do banco de dados?
            if(emailData.email) {
                // Edita o email no banco de dados e salva na store o seu novo email.
                editEmail({ email, cliente: client }, emailData.id).then((res) => {
                    if(res) {
                        saveEmail(res.id, res.tipo, res.numero)
                    }
                    this.setState({ editing: false })
                })
            } else {
                // Cria o email no banco de dados e salva na store o email criado,
                // retirando o email com ID Falso.
                createEmail(client, email).then(res => {
                    if(res.id) {
                        removeEmail(id)
                        saveEmail(res.id, res.email)
                    }
                })
            }
        }

       
    }

    validateFields = () => {
        const { email } = this.state;
        let errors = [];
        // Regex encontrado na internet que valida o formato do email
        let reValidEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!email) {
            errors.push('Email deve ser preenchido.')
        }
        
        // Se o email não estiver no formato do regex, não irá dar match.
        if (email && !email.match(reValidEmail)) {
            errors.push('Email não está em um formato válido.')
        }

        return errors;
    }

    deleteEmail = () => {
        const { emailData, creating, emails, action, removeEmail } = this.props;
        // Se não estiver no modo de criação: editando os dados de um email do banco
        if(!creating){
            // Verifica se irão sobrar emails válidos do cliente ainda
            const validEmailsRemaining = emails.filter(email => email.email !== "" && email.id !== emailData.id)
            if(validEmailsRemaining.length >= 1) {
                // Se o resultado for maior ou igual a um, verifica se o email é um email com ID falso
                // Ou se é um email que veio do banco de dados.
                if(emailData.email !== "") {
                    // Se for um email do banco de dados, deleta o email e remove da Store.
                    deleteEmail(emailData.id).then(res => removeEmail(emailData.id))
                } else {
                    // Se for um email com ID falso, deleta da Store apenas.
                    removeEmail(emailData.id)
                }
            } else {
                // Se não sobrar ao menos um email depois da deleção, alerta que não é possível remover o email.
                alert('É necessário ao menos um email válido.')
            }
        } else{
            // Se estiver em modo de criação, deleta o email da Store.
            removeEmail(emailData.id)
        }
    }
    render() {
        const { hovering, email, editing, errors } = this.state;
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
                        hovering
                         && (
                             <ProtectedComponent allowedUsers={['admin']}>
                                 <ControlButtons editing={editing} edit={this.setEdit} save={this.saveEmail} deleteAction={this.deleteEmail} />
                             </ProtectedComponent>
                           
                        )
                    }
                    <div className="row my-3">
                        <div className="col-md-12">
                            <InputLabel text="Email" required/>
                            <input
                                disabled={!editing}
                                onChange={this.handleChange}
                                value={email}
                                name="email"
                                type="email"
                                class="form-control"
                                placeholder="Digite o email" />
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveEmail: (id, email) => dispatch(setEmail(id, email)),
        removeEmail: (id) => dispatch(setDeleteEmail(id))
    }
}


export default connect(null, mapDispatchToProps)(EmailForm);