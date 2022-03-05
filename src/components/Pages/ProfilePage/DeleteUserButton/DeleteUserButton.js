import React from 'react';
import { Button } from 'semantic-ui-react';
import { useAuth0 } from "@auth0/auth0-react"
import auth0 from "auth0-js"
import { useMutation, gql } from '@apollo/client'

const DELETE_USER = gql`
mutation DeleteUser($userId: String!, $email: String!){
  deleteUser(userId: $userId, email: $email){
    done
  }
}
`

function DeleteUserButton(){
  const { user } = useAuth0()
  const [deleteUser] = useMutation(DELETE_USER)

  async function handleClick(){
    deleteUser({variables: {
      email: user.email,
      userId: user.sub
    }})
    var webAuth = new auth0.WebAuth({
      domain: 'skepsi.us.auth0.com',
      clientID: 'V1VsPEgl7mgPORdnpFApnJVWLvf4xkbe',
    });
    webAuth.logout({
    returnTo: `${process.env.REACT_APP_URL}`,
    client_id: 'V1VsPEgl7mgPORdnpFApnJVWLvf4xkbe',
  });
  }

  return(
    <Button basic color='gray' style={{border: "1px solid darkgray"}} onClick={handleClick}>
      Delete User
    </Button>
  )
}

export default DeleteUserButton
