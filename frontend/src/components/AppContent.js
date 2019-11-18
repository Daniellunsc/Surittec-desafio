// AppContent.js

import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './Login';
import Home from './Home';
import Cliente from './Cliente';
import ProtectedRoute from './ProtectedRoute';
import { checkAuth } from '../api/login';
import { setUserLoggedIn } from '../actions';
import NotAutorized from './NotAutorized';

// Componente responsável por gerenciar todo o conteúdo do app
const AppContent = ({ saveLoggedUser }) => {
  checkAuth().then((user) => {
    if (user) {
      saveLoggedUser(user);
    }
  });

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={ProtectedRoute(Home, ['admin', 'comum'])} />
        <Route exact path="/createcliente" component={ProtectedRoute(Cliente, ['admin'])} />
        <Route exact path="/cliente/:id" component={ProtectedRoute(Cliente, ['admin', 'comum'])} />
        <Route exact path="/notauthorized" component={NotAutorized} />
      </Switch>
    </BrowserRouter>
  );
};

const mapDispatchToProps = (dispatch) => ({
  saveLoggedUser: (user) => dispatch(setUserLoggedIn(user)),
});

export default connect(null, mapDispatchToProps)(AppContent);
