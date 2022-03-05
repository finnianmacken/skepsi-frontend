import React from 'react';
import { useLocation } from 'react-router-dom'
import UserSignupForm from '../UserSignupForm/UserSignupForm.js'
import ScientistSignupForm from '../ScientistSignupForm/ScientistSignupForm.js'
import ExpertSignupForm from '../ExpertSignupForm/ExpertSignupForm.js'


function SignupView(){
  const location = useLocation()

  if(location.pathname === '/user-signup'){
  return(
    <div>
      <h1>This is the user signup form!</h1>
      <UserSignupForm />
    </div>
  )
  }
  else if(location.pathname === '/scientist-signup'){
    return(
      <div>
        <h1>This is the scientist signup form!</h1>
        <ScientistSignupForm />
      </div>
    )
  }

  else if(location.pathname === '/expert-signup'){
    return(
      <div>
        <h1>This is the expert signup form!</h1>
        <ExpertSignupForm />
      </div>
    )
  }

  else{
    return(
      <h1>Wrong link :(</h1>
    )
  }
}

export default SignupView
