import React from "react";
import styles from './ProfileInfo.module.css'
import DeleteUserButton from '../DeleteUserButton/DeleteUserButton.js'
import LogoutButton from '../LogoutButton/LogoutButton.js'

function ProfileInfo(props){

  if(props.user){
  return (
    <div>
      <div>
        <div as="div" className={styles.profileInfoBox}>
          <div className={styles.headerWrapper}>
            <h3 className={styles.infoSectionHeader}>Profile Information</h3>
          </div>
          <div className={styles.contentWrapper}>
            <p className={styles.infoSectionContent}><b>Username:</b> {props.user["http://www.skepsi.com/username"]}</p>
            <p className={styles.infoSectionContent}><b>Email:</b> {props.user.email}</p>
        </div>
      </div>
      </div>

      <div className={styles.profileInfoBox}>
        <div className={styles.headerWrapper}>
          <h3 className={styles.infoSectionHeader}>Dev Information</h3>
        </div>
        <div className={styles.contentWrapper}>
          <p className={styles.infoSectionContent}><b>Login Count:</b> {props.user["http://www.skepsi.com/loginCount"]}</p>
          <p className={styles.infoSectionContent}><b>User Id:</b> {props.user.sub}</p>
          <p className={styles.infoSectionContent}><b>Access Token:</b> <span className={styles.accessToken}>{props.accessToken}</span></p>
        </div>
      </div>

      <div className={styles.profileInfoBox}>
        <div className={styles.headerWrapper}>
          <h3 className={styles.infoSectionHeader}>Profile Controls</h3>
        </div>
        <div className={styles.contentWrapper}>
          <DeleteUserButton />
          <LogoutButton />
        </div>
      </div>
      </div>
    )
  }

  else{
    return(
      <div>

      </div>
    )
  }
}


export default ProfileInfo;
