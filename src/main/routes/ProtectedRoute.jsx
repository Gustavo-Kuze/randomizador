import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (rest.email !== '') {
          if (!rest.emailVerified) {
            return (
              <Redirect
                to={{
                  pathname: '/verifyemail',
                  state: {
                    from: props.location,
                  },
                }}
              />
            );
          } else {
            return <Component {...props} />;
          }
        } else {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

const mapStateToRest = state => ({
  email: state.user.email,
  emailVerified: state.user.emailVerified,
});

export default connect(mapStateToRest)(ProtectedRoute);
