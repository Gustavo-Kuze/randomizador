import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import Home from '../components/Home/'
import About from '../components/About/'
import VerifyEmail from '../components/VerifyEmail/'
import MyLists from '../components/draw/pages/MyLists'
import ViewSavedDraw from '../components/draw/pages/ViewSavedDraw'
import MyResults from '../components/draw/pages/MyResults'
import NumberDraw from '../components/draw/pages/NumberDraw'
import HeadOrTailsDraw from '../components/draw/pages/HeadOrTailsDraw'
import ShuffleDraw from '../components/draw/pages/ShuffleDraw'
import Login from '../components/Login/'
import Logout from '../components/Login/Logout'
import Facebook from '../components/draw/pages/FacebookDraw'

export default () =>
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/numbers' component={NumberDraw} />
            <Route exact path='/headortails' component={HeadOrTailsDraw} />
            <Route exact path='/shuffle' component={ShuffleDraw} />
            <Route exact path='/about' component={About} />
            <Route exact path='/verifyemail' component={VerifyEmail} />
            <Route exact path='/facebook' component={Facebook} />
            <Route exact path='/drawn/:id?' component={ViewSavedDraw} />
            <ProtectedRoute exact path='/myresults' component={MyResults} />
            <ProtectedRoute exact path='/user/lists' component={MyLists} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/logout' component={Logout} />
            <Redirect from='*' to='/' />
        </Switch>
    </BrowserRouter>