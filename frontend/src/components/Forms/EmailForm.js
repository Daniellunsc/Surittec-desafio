import React from 'react';
import { createEmail, editEmail, deleteEmail } from '../../api/emails';

class EmailForm extends React.Component {

    state = {
        hovering: false,
        email: '',
        editing: false
    }

    componentDidMount() {
        const { emailData } = this.props;
        if (emailData) {
            this.setState({ email: emailData.email })
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
        const { emailData, client, reloadCallback } = this.props;
        const { email } = this.state;
        if (!emailData || emailData.id === "") {
            createEmail(client, email).then((res) => this.setState({ editing: false })).then(() =>reloadCallback())
        } else {
            editEmail({ email, cliente: client }, emailData.id).then((res) => this.setState({ editing: false })).then(() => reloadCallback())
        }
    }

    deleteEmail = () => {
        const { emailData, reloadCallback, emails } = this.props;
        if (emails.length > 1) {
            if (emailData) {
                deleteEmail(emailData.id).then((res) => reloadCallback())
            }
        }
    }

    render() {
        const { hovering, email, editing } = this.state;
        const { emailData, emails } = this.props;
        const emailsValidos = emails.filter(email => email.id !== ""); 
        return (
            <div class="card my-2" onMouseEnter={() => this.setState({ hovering: true })} onMouseLeave={() => this.setState({ hovering: false })}>
                <div class="card-body">
                    {
                        hovering && (
                            <div className="d-flex justify-content-end">
                                <div className="btn btn-group m-0 p-0">
                                    {!editing && <button className="btn btn-outline-primary" onClick={this.setEdit}>editar</button>}
                                    {editing && <button className="btn btn-outline-success" onClick={this.saveEmail}>salvar</button>}
                                    {emailData && emailsValidos.length> 1 && (<button className="btn btn-outline-danger" onClick={this.deleteEmail}>excluir</button>)}
                                </div>
                            </div>
                        )
                    }
                    <div className="row my-3">
                        <div className="col-md-12">
                            <label className="text-left">Email</label>
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

export default EmailForm;