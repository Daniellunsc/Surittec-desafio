import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Cliente from './Cliente';
import ProtectedRoute from './ProtectedRoute';
import { checkAuth } from '../api/login';
import {connect} from 'react-redux' ;
import { setUserLoggedIn } from '../actions';
import NotAutorized from './NotAutorized';

class AppContent extends React.Component {

    render(){

        checkAuth().then((user) => {
            if (user) {
                this.props.saveLoggedUser(user)
            } 
          })

        return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/home" component={ProtectedRoute(Home, ['admin', 'comum'])} />
                <Route exact path="/createcliente" component={ProtectedRoute(Cliente, ['admin'])} />
                <Route exact path="/cliente/:id" component={ProtectedRoute(Cliente, ['admin', 'comum'])} />
                <Route exact path="/notauthorized" component={NotAutorized} />
            </Switch>
        </BrowserRouter>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveLoggedUser: (user) => dispatch(setUserLoggedIn(user))
    }
}

export default connect(null, mapDispatchToProps)(AppContent);