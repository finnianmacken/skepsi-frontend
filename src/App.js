import React, {useEffect, useState } from 'react'
import "semantic-ui-css/semantic.min.css"

// FONTS
import WebFont from 'webfontloader'

// AUTHORIZATION
// ANNOTATIONS
// import PageManager from './components/PageManager/PageManager.js'

// NAVIGATION

// ROUTERS
// import TopicsRouter from './components/routers/topics-router.js'
// import SignupRouter from './components/routers/signup-router.js'
// import SignupAndTopicsRouter from './components/routers/signup-and-topics-router.js'
import Router from './components/Routers/MasterRouter.js'

import {useAuth0} from "@auth0/auth0-react"

import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client"
import TexProvider from "components/Providers/Tex/TexProvider"

// STYLES

export const UserContext = React.createContext()
export const AuthenticationContext = React.createContext()

function App() {

    const {isAuthenticated, getAccessTokenSilently, isLoading, user } = useAuth0()
    const [token, setToken] = useState("")

    useEffect(() => {
      WebFont.load({
        google: {
          families: ['Roboto',
          "Spartan: 300,400,500,600,700,800,900",
          "Open Sans: 300,400,500,600,700,800,900",
          "Alegreya: 300,400,500,600,700,800,900",
          "Lato: 300,400,500,600,700,800,900"
          ]
        },
        custom: {
          families: ['Computer Modern'],
          urls: ['https://cdn.rawgit.com/dreampulse/computer-modern-web-font/master/fonts.css']
        }
      })
    }, [])

    useEffect(() => {
        if (isAuthenticated) {
            getAccessTokenSilently()
                .then(token_data => {
                    setToken(token_data)
                })
        }
    }, [isAuthenticated, getAccessTokenSilently])

    const client = new ApolloClient({
        uri: process.env.REACT_APP_API_AUDIENCE,
        cache: new InMemoryCache(),
        headers: {
            authorization: isAuthenticated ? token : ""
        }
    })


    // throttles the entire site until the access token loads
    if (isLoading) {
        return <div/>
    }

  return (
    <ApolloProvider client={client}>
        <TexProvider>
            <div className="App">
              <UserContext.Provider value={user ? user : {}}>
                <AuthenticationContext.Provider value={isAuthenticated ? isAuthenticated : ""}>
                <Router />
                </AuthenticationContext.Provider>
              </UserContext.Provider>
            </div>
        </TexProvider>
    </ApolloProvider>
  );
}

export default App
