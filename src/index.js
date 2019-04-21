import React from 'react';
import ReactDOM from 'react-dom';
import 'bootswatch/dist/materia/bootstrap.min.css'
import './index.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import App from './main/components/App.jsx';
import ReduxToastr from 'react-redux-toastr'
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import store from './main/redux/core/store'

ReactDOM.render(
    <Provider store={store}>
        <App />
        <ReduxToastr
            timeOut={4000}
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
