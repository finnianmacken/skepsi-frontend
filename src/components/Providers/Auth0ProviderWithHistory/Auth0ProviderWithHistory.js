import React from 'react'
import {useNavigate} from 'react-router-dom'
import {Auth0Provider} from "@auth0/auth0-react"

const Auth0ProviderWithHistory = ({children}) => {
    const domain = "skepsi.us.auth0.com"
    const clientId = "V1VsPEgl7mgPORdnpFApnJVWLvf4xkbe"

    const history = useNavigate()

    // const [prevHistory, setPrevHistory] = React.useState()
    //
    // React.useEffect(() => {
    //   setPrevHistory(history.location.pathname)
    // }, [history.location.pathname])

    // React.useEffect(()=>{
    //   console.log("HISTORY", history)
    // }, [history])

    const onRedirectCallback = appState => {
        history.push(
            appState && appState.targetUrl
                ? appState.targetUrl
                : window.location.href = process.env.REACT_APP_URL
        )
    }

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            redirectUri={window.location.origin}
            onRedirectCallback={onRedirectCallback}
            audience={process.env.REACT_APP_AUTH_AUDIENCE}
        >
            {children}
        </Auth0Provider>
    )
}

export default Auth0ProviderWithHistory
