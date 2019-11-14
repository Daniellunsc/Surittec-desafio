import React from "react";
import {Redirect} from 'react-router-dom';

class ClienteList extends React.Component {
  state = {
    hovering: false,
    redirect: false
  };

  render() {
    const { cliente } = this.props;
    const { hovering, redirect } = this.state;

    if(redirect) {
        return <Redirect to={`/cliente/${cliente.id}`}/>
    }

    return (
      <li
        key={cliente.id}
        onMouseEnter={() => this.setState({ hovering: true })}
        onMouseLeave={() => this.setState({ hovering: false })}
        onClick={() => this.setState({redirect: true})}
        class={`list-group-item ${hovering && "active"}`}
      >
        {cliente.nome}
      </li>
    );
  }
}

export default ClienteList;
