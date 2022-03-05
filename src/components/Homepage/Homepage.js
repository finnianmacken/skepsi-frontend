import React from 'react'

// NAVIGATION
import PaperSearch from '../PaperSearch/PaperSearch.js'
import FeaturedPapers from '../FeaturedPapers/FeaturedPapers.js'

// USER PROFILES

// STYLES
import { Divider } from 'semantic-ui-react'
import styles from './Homepage.module.css'
import './Homepage.css'

import Navbar from '../Navbar/Navbar.js'

import TopicCardUpdated from '../TopicCardUpdated/TopicCardUpdated.js'

import { Fade } from "react-awesome-reveal";


// ANIMATIONS

function Homepage(props) {
  return (
    <div className={styles.main}>

      <div style={{height: 0}}>
        <Navbar usesPageWrapper={true} />
      </div>
      <div className={styles.searchBackground}>
        <div className={styles.contentWrapper}>
        <div className={styles.titleLogoWrapper}>
        </div>
          <Fade duration={2400} direction="up" triggerOnce={true}>
            <div className={styles.pitchTextWrapper}>
              <p className={styles.pitchText}>Towards Better Annotation</p>
            </div>
          </Fade>
        </div>
      </div>
    <div className={styles.homepageFeed}>
      <div className={styles.topicsWrapper}>
        <TopicCardUpdated
          topics={props.topics}
          />
      </div>
      <Divider />
      <div className={styles.marginFeed}>
      <h2 style={{fontFamily: "Roboto"}}>Featured Papers</h2>
      <FeaturedPapers
        papers={props.papers}
        />
      <Divider />
    </div>
    <PaperSearch
      papers={props.papers}
      />
    </div>
    </div>
  )
}

export default Homepage;
