import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import Home from '../components/Home/'
import About from '../components/About/'
import NumberDraw from '../components/draw/pages/NumberDraw'
import HeadOrTailsDraw from '../components/draw/pages/HeadOrTailsDraw'
import ShuffleDraw from '../components/draw/pages/ShuffleDraw'
import Login from '../components/Login/'
import Logout from '../components/Login/Logout'


export default () =>
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/numbers' component={NumberDraw} />
            <Route exact path='/headortails' component={HeadOrTailsDraw} />
            <Route exact path='/shuffle' component={ShuffleDraw} />
            <ProtectedRoute exact path='/about' component={About} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/logout' component={Logout} />
            <Redirect from='*' to='/' />
        </Switch>
    </BrowserRouter>