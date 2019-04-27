import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import { connect } from 'react-redux'
import firebase from '../services/firebase/'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (true) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location }
              }}
            />
          );
        }
      }}
    />
  );
};

// const mapStateToRest = state => ({
//    email: state.user.email
// })

// export default connect(
//   mapStateToRest
// )(ProtectedRoute)
export default ProtectedRoute