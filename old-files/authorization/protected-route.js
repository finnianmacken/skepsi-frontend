import React from "react";
import { Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Loader, Dimmer } from 'semantic-ui-react';

const ProtectedRoute = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => {
        return(
          <Dimmer active>
            <Loader />
          </Dimmer>
        )
      },
    })}
    {...args}
  />
);

export default ProtectedRoute;
