import React from 'react';
import { createTelefone, deleteTelefone, editTelefone } from '../../api/telefones';

class TelefoneForm extends React.Component {

    state = {
        hovering: false,
        tipo: '',
        numero: '',
        editing: false
    }

    componentDidMount() {
        const { telefoneData } = this.props;
        if (telefoneData) {
            this.setState({ tipo: telefoneData.tipo, numero: telefoneData.numero })
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
        const { telefoneData, client, reloadCallback } = this.props;
        const { tipo, numero } = this.state;
        if (!telefoneData || telefoneData.id === "") {
            createTelefone(client, tipo, numero).then((res) => this.setState({ editing: false })).then(() =>reloadCallback())
        } else {
            editTelefone({ tipo, numero, cliente: client }, telefoneData.id).then((res) => this.setState({ editing: false })).then(() => reloadCallback())
        }
    }

    deleteNumber = () => {
        const { telefoneData, reloadCallback, telefones } = this.props;
        if (telefones.length > 1) {
            if (telefoneData) {
                deleteTelefone(telefoneData.id).then((res) => reloadCallback())
            }
        }
    }

    render() {
        const { hovering, tipo, numero, editing } = this.state;
        const { telefoneData, telefones } = this.props;
        const telefonesValidos = telefones.filter(telefone => telefone.id !== ""); 
        return (
            <div class="card my-2" onMouseEnter={() => this.setState({ hovering: true })} onMouseLeave={() => this.setState({ hovering: false })}>
                <div class="card-body">
                    {
                        hovering && (
                            <div className="d-flex justify-content-end">
                                <div className="btn btn-group m-0 p-0">
                                    {!editing && <button className="btn btn-outline-primary" onClick={this.setEdit}>editar</button>}
                                    {editing && <button className="btn btn-outline-success" onClick={this.saveNumber}>salvar</button>}
                                    {telefoneData && telefonesValidos.length> 1 && (<button className="btn btn-outline-danger" onClick={this.deleteNumber}>excluir</button>)}
                                </div>
                            </div>
                        )
                    }
                    <div className="row my-3">
                        <div className="col-md-3">
                            <label className="text-left">Tipo</label>
                            <input
                                disabled={!editing}
                                onChange={this.handleChange}
                                value={tipo}
                                name="tipo"
                                type="text"
                                class="form-control"
                                placeholder="Tipo do telefone" />
                        </div>
                        <div className="col-md-9">
                            <label className="text-left">Número</label>
                            <input
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

export default TelefoneForm;