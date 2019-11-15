import React from 'react';
import { searchCep } from '../../api/viacep';
import { editEndereco } from '../../api/endereco';
import { connect } from 'react-redux';
import { saveEnderecoData } from '../../actions';
import NumberFormat from 'react-number-format';
import InputLabel from '../InputLabel'

class EnderecoForm extends React.Component {

    state = {
        hovering: false,
        editing: false,
        errors: [],
        cep: '',
        logradouro: '',
        bairro: '',
        cidade: '',
        uf: '',
        complemento: '',
    }

    componentDidMount() {
        const { cep, logradouro, bairro, cidade, uf, complemento } = this.props;
        this.setState({
            cep: cep,
            logradouro: logradouro,
            bairro: bairro,
            cidade: cidade,
            uf: uf,
            complemento: complemento
        })
    }

    handleChange = (e) => {
        const { target } = e;
        this.setState({ [target.name]: target.value })
        if (target.name === "cep") {
            let cepMatch = target.value
            if (cepMatch.match(/[0-9]{5}-[0-9]{3}/)) {
                searchCep(target.value).then(res => {
                    if (res.erro) {
                        alert('CEP Inválido ou não encontrado')
                        return;
                    }
                    this.setState({ ...res, cidade: res.localidade })
                })
            }
        }
    }

    setEdit = () => {
        const { editing } = this.state;
        this.setState({ editing: !editing })
    }

    saveEndereco = () => {
        const { saveEndereco, creating, enderecoData, clienteId } = this.props;
        const { cep, logradouro, bairro, cidade, uf, complemento } = this.state;
        let validationResult = this.validateFields();
        if (validationResult.length > 0) {
            this.setState({ errors: validationResult })
            return
        }
        saveEndereco(cep, logradouro, bairro, cidade, uf, complemento, enderecoData.id || null)
        this.setState({ editing: false, errors: [] })
        if(!creating && enderecoData){
            editEndereco({cep, logradouro, bairro, cidade, uf, complemento, cliente: clienteId}, enderecoData.id)
        }
    }

    validateFields = () => {
        let errors = [];
        const { cep, logradouro, bairro, cidade, uf } = this.state;
        if (!cep) {
            errors.push('Cep deve ser preenchido');
        }

        if (!cep.match(/[0-9]{5}-[0-9]{3}/)) {
            errors.push('Cep em formato inválido')
        }

        if (!logradouro) {
            errors.push('Logradouro deve ser preenchido')
        }

        if (!bairro) {
            errors.push('Bairro deve ser preenchido')
        }

        if (!cidade) {
            errors.push('Cidade deve ser preenchido')
        }

        if (!uf) {
            errors.push('UF deve ser preenchido')
        }

        return errors;
    }

    render() {
        const { hovering, editing, cep,
            logradouro, bairro, cidade, uf, complemento, errors } = this.state;
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
                            <div className="d-flex justify-content-end">
                                <div className="btn btn-group m-0 p-0">
                                    {!editing && <button className="btn btn-outline-primary" onClick={this.setEdit}>editar</button>}
                                    {editing && <button className="btn btn-outline-success" onClick={this.saveEndereco}>salvar</button>}
                                </div>
                            </div>
                        )
                    }
                    <div className="row">
                        <div className="col-md-4">
                            <InputLabel text="CEP" required />
                            <NumberFormat
                                disabled={!editing}
                                value={cep}
                                name="cep"
                                onChange={this.handleChange}
                                type="text"
                                class="form-control"
                                placeholder="00000-000"
                                format={"#####-###"}
                                mask="_"
                            />
                        </div>

                        <div className="col-md-8">
                            <InputLabel text="Logradouro" required />
                            <input disabled={!editing} value={logradouro} name="logradouro" onChange={this.handleChange} type="text" class="form-control" placeholder="Logradouro" />
                        </div>
                    </div>

                    <div className="row my-3">
                        <div className="col-md-5">
                            <InputLabel text="Bairro" required />
                            <input disabled={!editing} value={bairro} name="bairro" onChange={this.handleChange} type="text" class="form-control" placeholder="Bairro" />
                        </div>

                        <div className="col-md-5">
                            <InputLabel text="Cidade" required />
                            <input disabled={!editing} value={cidade} name="cidade" onChange={this.handleChange} type="text" class="form-control" placeholder="Cidade" />
                        </div>

                        <div className="col-md-2">
                            <InputLabel text="UF" required />
                            <input disabled={!editing} value={uf} name="uf" onChange={this.handleChange} type="text" class="form-control" placeholder="UF" />
                        </div>
                    </div>

                    <div className="row my-3">
                        <div className="col-md-12">
                            <InputLabel text="Complemento" />
                            <textarea disabled={!editing} value={complemento} name="complemento" onChange={this.handleChange} type="text" class="form-control" placeholder="complemento" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ clienteReducer }) => {
    return {
        cep: clienteReducer.endereco.cep,
        logradouro: clienteReducer.endereco.logradouro,
        bairro: clienteReducer.endereco.bairro,
        cidade: clienteReducer.endereco.bairro,
        uf: clienteReducer.endereco.bairro,
        complemento: clienteReducer.endereco.complemento
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveEndereco: (cep, logradouro, bairro, cidade, uf, complemento, id) => dispatch(saveEnderecoData(cep, logradouro, bairro, cidade, uf, complemento, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EnderecoForm);