import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import Home from '../components/Home/'
import About from '../components/About/'

export default () =>
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/about' component={About} />
            <Redirect from='*' to='/' />
        </Switch>
    </BrowserRouter>