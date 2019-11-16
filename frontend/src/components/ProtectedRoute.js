import React from 'react';
import { Redirect } from 'react-router-dom';
import { checkAuth } from '../api/login';

const ProtectedRoute = (Component, allowedUsers = []) => class WithAuth extends React.Component {
        state = {
          loading: true,
          user: {}
        };

        componentDidMount() {
          checkAuth().then((user) => {
            if (user) {
              this.setState({ user: user, loading: false });
            } else {
              throw new Error('Não foi encontrado usuário');
            }
          })
            .catch((err) => {
              console.log(err);
              this.setState({ permissions: [], loading: false });
            });
        }

        render() {
          const { user, loading } = this.state;

          if (loading) {
            return <h1>Carregando...</h1>;
          }

          if (Object.keys(user).length > 0) {
            const canUserGo = allowedUsers
              .filter(() => allowedUsers.includes(user.usuario));

            if (canUserGo.length > 0) {
              return <Component {...this.props} />;
            }
          }
          return <Redirect to="/notauthorized" />;
        }
};


export default ProtectedRoute;