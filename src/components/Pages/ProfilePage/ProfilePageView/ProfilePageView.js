import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Divider, Tab } from 'semantic-ui-react';

import styles from './ProfilePageView.module.css'
import ProfilePageAnnotations from '../ProfilePageAnnotations/ProfilePageAnnotations.js'
import ProfileInfo from "../ProfileInfo/ProfileInfo.js"


function ProfilePageView(){
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState("")

  useEffect(()=>{
    if(isAuthenticated){
      try{
        getAccessTokenSilently({
        })
        .then(token_data => setAccessToken(token_data))
      }
      catch{
        console.error("Silent Token error") // TODO:
      }
    }
  }, [getAccessTokenSilently, isAuthenticated])

  const panes = [
    {menuItem: "User Profile", render: ()=> <Tab.Pane>
      <ProfileInfo
        isLoading={isLoading}
        user={user}
        accessToken={accessToken}
        />
    </Tab.Pane>},
    {menuItem: "Annotations", render: ()=> <Tab.Pane>
      <ProfilePageAnnotations
        username={user["http://www.skepsi.com/username"]}
        />
    </Tab.Pane>},
  ]

  if (isLoading) {
    return <div>Loading ...</div> // TODO:
  }

  return (
    isAuthenticated && (
      <div className={styles.profilePageWrapper}>
        <div className={styles.mainInfoFlexbox}>
          <div className={styles.usernameWrapper}>
            <h1 id={styles.username}>{user["http://www.skepsi.com/username"]}</h1>
            <h5 id={styles.roles}><em>{user["http://www.skepsi.com/roles"].join(',')}</em></h5>
          </div>
          <div className={styles.flexComponent}></div>

        </div>
        <Divider/>
      <Tab className={styles.tabs} menu={{fluid:true, vertical: true, tabular: false}} panes={panes}/>
      </div>
    )
  )
}

export default ProfilePageView
