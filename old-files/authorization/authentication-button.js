import React from 'react';
import LoginButton from './login-button.js'
import LogoutButton from './logout-button.js'

import { Loader, Dimmer, Button } from "semantic-ui-react"
import { useAuth0 } from "@auth0/auth0-react";


function AuthenticationButton(){
  const { isAuthenticated, isLoading } = useAuth0();

  if(isAuthenticated){
    return <LogoutButton />
  } else {
    return <LoginButton />
    }
}

export default AuthenticationButton;
