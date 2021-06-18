import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoutes = (privateprops) => {
  const { path, id, component: Component } = privateprops;
  return (
    <Route
      path={path}
      render={(props) => {
        return id ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoutes;
