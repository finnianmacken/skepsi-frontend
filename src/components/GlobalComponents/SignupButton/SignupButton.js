import React from 'react';
import { Button } from "semantic-ui-react";
import { Link } from 'react-router-dom'
import styles from './SignupButton.module.css'

const SignupButton = () => {
  return (
    <Link to='/signup'>
      <Button className={styles.signupButton}>
        Signup
      </Button>
    </Link>
  );
};

export default SignupButton;
