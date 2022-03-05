import React, { useReducer, useEffect, useState } from 'react';
import { Button, Checkbox, Form, Label, Divider, Icon } from 'semantic-ui-react'
import { gql, useMutation } from "@apollo/client"
import { isValidEmail, isValidPassword, isValidUsername } from "../../utility/user-validators.js"
import { useNavigate } from 'react-router-dom'
import auth0 from "auth0-js"
import { useAuth0 } from "@auth0/auth0-react";
import ScientistDomainPicker from '../ScientistDomainPicker/ScientistDomainPicker.js'

const initialState = {
  username: '',
  email: '',
  password: '',
  checkboxChecked: false,
  emailValid: false,
  usernameValid: false,
  passwordValid: false,
  userError: true, // must be true or the state passes 'if' before it updates
  userExists: false,
  emailError: true, // must be true or the state passes 'if' before it updates
  emailExists: false,
}

function reducer(state, action){
    switch(action.type){
      case 'toggleCheckbox':
        return {...state, checkboxChecked: !state.checkboxChecked}
      case 'usernameChange':
        return {...state, username: action.payload}
      case 'emailChange':
        return {...state, email: action.payload}
      case 'passwordChange':
        return {...state, password: action.payload}
      case 'validEmail':
        return {...state, emailValid: action.payload}
      case 'validUsername':
        return {...state, usernameValid: action.payload}
      case 'validPassword':
        return {...state, passwordValid: action.payload}
      case 'userError':
        return {...state, userError: action.payload}
      case 'userExists':
        return {...state, userExists: action.payload}
      case 'emailError':
        return {...state, emailError: action.payload}
      case 'emailExists':
        return {...state, emailExists: action.payload}
      default:
        console.log("Case Error in SignupForm reducer")
    }
}

const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!, $domains: String){
    createUser(userData:{username: $username, email: $email, password: $password, domains: $domains}){
      user{
        username
      }
    }
  }
`

function UserSignupForm(){
  const [domains, setDomains] = useState()
  const [state, dispatch] = useReducer(reducer, initialState)
  const [addUser] = useMutation(ADD_USER)
  const { loginWithRedirect } = useAuth0();


  function handleChange(e){
    const user_input = e.target.value
    dispatch({type:`${e.target.name}Change`, payload: user_input})
  }

  const history = useNavigate()


  useEffect(() => {
    dispatch({type: 'emailExists', payload: false})
    if(isValidEmail(state.email)){
    dispatch({type:'validEmail', payload: true})
  } else{
    dispatch({type:'validEmail', payload: false})
    dispatch({type: 'userError', payload: false})
  }
},[state.email])

  useEffect(() => {
    if(isValidPassword(state.password)){
    dispatch({type:'validPassword', payload: true})
    } else{
    dispatch({type:'validPassword', payload: false})
    }
  }, [state.password])

  useEffect(() => {
    dispatch({type: 'userExists', payload: false})
    if(isValidUsername(state.username)){
      dispatch({type: 'validUsername', payload: true})
    } else {
      dispatch({type: 'validUsername', payload: false})

    }
  }, [state.username])

  const CHECK_FOR_USER_AND_EMAIL = gql`
  mutation CheckForEmail($email: String!, $username:String!){
    checkEmailExists(email: $email){
      exists
    }
    checkUserExists(username:$username){
      exists
    }
  }
    `

    useEffect(()=>{
      if(state.emailValid
        && state.passwordValid
        && state.usernameValid
        && state.checkboxChecked
        && !state.userError
        && !state.emailError){
          var webAuth = new auth0.WebAuth({
            domain: 'skepsi.us.auth0.com',
            clientID: 'V1VsPEgl7mgPORdnpFApnJVWLvf4xkbe',
          });

          //auth0 signup
          webAuth.signup({
            connection: 'Username-Password-Authentication',
            email: state.email,
            username: state.username,
            password: state.password,
            user_metadata: {role: 'expert'},
            }, function (error) {
              if (error){
                dispatch({type: 'userError', payload: true})
              }
            })

          // django signup and redirect
          addUser({variables:{
            username: state.username,
            password: state.password,
            email: state.email,
            domains: domains.value.join(",")
            }
          }).then(response => loginWithRedirect())
        }
        else{
          console.log("No", state)
        }
    }, [state.userError, state.emailError])

  const [UserOrEmailIsInDatabase] = useMutation(CHECK_FOR_USER_AND_EMAIL, {errorPolicy:'all'})

  function handleSubmit(){
    UserOrEmailIsInDatabase({variables:{username:state.username, email:state.email}})
    .then(response=>{
      if(response.data.checkUserExists === null){
        dispatch({type: 'userError', payload: false})
        dispatch({type: 'userExists', payload: false})
      }
      else if(response.data.checkUserExists.exists){
        dispatch({type: 'userError', payload: true})
        dispatch({type: 'userExists', payload: true})
      }

      if(response.data.checkEmailExists === null){
        dispatch({type: 'emailError', payload: false})
      }
      else if(response.data.checkEmailExists.exists){
        dispatch({type: 'emailError', payload: true})
        dispatch({type: 'emailExists', payload: true})
      }
    })
    .catch(error => console.log('Check for User Error:', error))
    } // handleSubmit()


  /* LOGGING STUFF FOR DEBUG */
  useEffect(() => {
    console.log(state)
  }, [state])

  return(
    <div style={{margin: '4em'}}>
    <Form onSubmit = {handleSubmit}>

      <Form.Field>
        <label>Username</label>
        <input
          name='username'
          placeholder='Username'
          onChange={handleChange}
          />
        {!state.usernameValid &&
          <Label basic color="red" pointing>
          Usernames must be 5 characters or more
        </Label>}
        {state.userExists &&
          <Label basic color="red" pointing>
          This user already exists
        </Label>}
      </Form.Field>

      <Form.Field>
        <label>Email</label>
        <input
          name='email'
          placeholder='Email'
          onChange={handleChange}
          />
        {!state.emailValid &&
          <Label basic color="red" pointing>
          This is not a valid email
        </Label>}
        {state.emailExists &&
          <Label basic color="red" pointing>
          This email address is already associated with a user account
        </Label>}
      </Form.Field>


      <Form.Field>
        <label>Password</label>
        <div style={{display: "flex", flexDirection: "row"}}>
          <input
            name='password'
            type='password'
            placeholder='Password'
            onChange={handleChange}
            />
        </div>
        {!state.passwordValid &&
          <Label basic color="red" pointing>
          Passwords must be 9 characters or more, and must contain at least one letter and one number

        </Label>}

      </Form.Field>

      <Form.Field>
        <Checkbox
          label='I agree to the Terms and Conditions'
          onChange = {() => dispatch({type: 'toggleCheckbox'})}
          />
        {!state.checkboxChecked &&
          <Label basic color="red">
            Please agree to the terms and conditions
          </Label>}
      </Form.Field>

      <Divider />

      <ScientistDomainPicker
        setDomains={setDomains}
        />

      <Divider />

      <Button type='submit'>Sign Up</Button>
    </Form>
  </div>
  );
}

export default UserSignupForm
