import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "semantic-ui-react";
import styles from './LoginButton.module.css'
import { useHistory } from 'react-router-dom'

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button className={styles.loginButton} onClick={() => loginWithRedirect({

      })}>
      Log In
    </Button>
  )
};

export default LoginButton;
