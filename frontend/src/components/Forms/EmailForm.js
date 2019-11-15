import React from 'react';
import { createEmail, editEmail, deleteEmail } from '../../api/emails';
import { setEmail, setDeleteEmail } from '../../actions';
import { connect } from 'react-redux'
import ControlButtons from './ControlButtons';
import InputLabel from '../InputLabel';

class EmailForm extends React.Component {

    state = {
        hovering: false,
        email: '',
        editing: false,
        errors: [],
    }

    componentDidMount() {
        const { emailData } = this.props;
        if (emailData) {
            this.setState({ id: emailData.id, email: emailData.email })
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

        if (validationResults.length > 0) {
            this.setState({ errors: validationResults })
            return;
        }
        saveEmail(id, email)
        this.setState({ editing: false, errors: [] })
        if(!creating) {
            if(emailData.email) {
                editEmail({ email, cliente: client }, emailData.id).then((res) => {
                    if(res) {
                        saveEmail(res.id, res.tipo, res.numero)
                    }
                    this.setState({ editing: false })
                })
            } else {
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
        let reValidEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!email) {
            errors.push('Email deve ser preenchido.')
        }

        if (email && !email.match(reValidEmail)) {
            errors.push('Email não está em um formato válido.')
        }

        return errors;
    }

    deleteEmail = () => {
        const { emailData, creating, emails, action, removeEmail } = this.props;
        const { id } = this.state;
        if(!creating){
            const validEmailsRemaining = emails.filter(email => email.email !== "" && email.id !== emailData.id)
            if(validEmailsRemaining.length >= 1) {
                if(emailData.email !== "") {
                    deleteEmail(emailData.id).then(res => removeEmail(emailData.id))
                } else {
                    removeEmail(emailData.id)
                }
            } else {
                alert('É necessário ao menos um email válido.')
            }
        } else{
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
                        hovering && (
                            <ControlButtons editing={editing} edit={this.setEdit} save={this.saveEmail} deleteAction={this.deleteEmail} />
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
                                placeholder="Email" />
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