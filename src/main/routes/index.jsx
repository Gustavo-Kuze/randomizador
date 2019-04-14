import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import Home from '../components/Home/'
import About from '../components/About/'
import Login from '../components/Login/'

export default () =>
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/about' component={About} />
            <Route exact path='/login' component={Login} />
            <Redirect from='*' to='/' />
        </Switch>
    </BrowserRouter>