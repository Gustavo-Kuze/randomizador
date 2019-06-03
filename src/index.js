import React from 'react';
import ReactDOM from 'react-dom';
import './css/bootstrap.min.css'
import './css/index.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import App from './main/components/App.jsx';
import ReduxToastr from 'react-redux-toastr'
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { saveState } from './main/redux/storage/localStorage'
import store from './main/redux/store'

store.subscribe(() => {
    saveState({
        user: store.getState().user,
        login: store.getState().login,
        feedbacks: store.getState().feedbacks,
    })
})

ReactDOM.render(
    <Provider store={store}>
        <App />
        <ReduxToastr
            timeOut={30000}
            newestOnTop={false}
            preventDuplicates
            position="bottom-right"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar
            closeOnToastrClick />
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
