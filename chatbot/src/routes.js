import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from './pages/Login';
import Chatbot from './pages/Chatbot';

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Login} />
                {
                    localStorage.getItem("auth") &&
                        <Route path='/chatbot' exact component={Chatbot} />
                }
            </Switch>
        </BrowserRouter>
    );
}