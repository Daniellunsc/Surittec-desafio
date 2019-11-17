//ProtectedComponent.js

import React from 'react';
import { connect } from 'react-redux';

// Componente responsável por gerenciar 
//se um componente filho pode ser exibido ou não baseado nos usuários informados como permitidos.
class ProtectedComponent extends React.Component {
    state = {};

    render() {
        const { user, allowedUsers } = this.props;
        if (user) {
            if (Object.keys(user).length > 0) {
                const canUserGo = allowedUsers
                    .filter(() => allowedUsers.includes(user.usuario));

                if (canUserGo.length > 0) {
                    return React.cloneElement(this.props.children, { ...this.props });
                } 
            }
        }
        return <div />;
    }
}

const mapStateToProps = ({ userReducer }) => {
    return {
        user: userReducer
    }
}

export default connect(mapStateToProps)(ProtectedComponent);