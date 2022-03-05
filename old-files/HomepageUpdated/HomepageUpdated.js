import React from 'react';
import styles from './HomepageUpdated.module.css'
import PaperSearch from '../PaperSearch/PaperSearch.js'

function HomepageUpdated(){

  return(
    <div className={styles.main}>
      <div className={styles.landingCover} style={{
        background: `url(${process.env.REACT_APP_API_AUDIENCE}media/media/Roma.jpg) center center`,
        backgroundSize: "cover"
        }}>
        <div className={styles.searchBarWrapper}>
          <div className={styles.logoContainer}></div>
            <div className={styles.flexDivider}></div>
            <PaperSearch />
          <div className={styles.flexDivider}></div>
          <div className={styles.userProfileWrapper}>
            <h3>Signed in as Leo Ware</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomepageUpdated
