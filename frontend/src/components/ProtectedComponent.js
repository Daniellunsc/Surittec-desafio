import React from 'react';
import { connect } from 'react-redux';

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