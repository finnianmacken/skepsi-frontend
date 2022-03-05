import React from 'react';
import { Message } from 'semantic-ui-react'
import styles from './ErrorPageView.module.css'

function ErrorPage(){
  return(
    <div style={{display: "flex", justifyContent: 'center', alignItems: 'center'}}>
      <div>
        <Message centered>
          <h1 style={{fontFamily: "Roboto"}}>Hey, devs here!
            Sorry, Skepsi is either broken or down for maintenance.
            We'll get it back up and running again soon!</h1>
        </Message>
      </div>
  </div>
  )
}

export default ErrorPage
