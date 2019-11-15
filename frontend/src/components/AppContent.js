import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Cliente from './Cliente';
 
class AppContent extends React.Component {
    render(){
        return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/createcliente" component={Cliente} />
                <Route exact path="/cliente/:id" component={Cliente} />
            </Switch>
        </BrowserRouter>
        )
    }
}

export default AppContent;