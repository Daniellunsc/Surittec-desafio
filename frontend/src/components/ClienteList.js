import React from "react";

class ClienteList extends React.Component {
  state = {
    hovering: false,
  };

  render() {
    const { cliente } = this.props;
    const { hovering } = this.state;

    return (
      <li
        key={cliente.id}
        onMouseEnter={() => this.setState({ hovering: true })}
        onMouseLeave={() => this.setState({ hovering: false })}
        onClick={() => window.location.href = `/cliente/${cliente.id}`}
        class={`list-group-item ${hovering && "active"}`}
      >
        {cliente.nome}
      </li>
    );
  }
}

export default ClienteList;
