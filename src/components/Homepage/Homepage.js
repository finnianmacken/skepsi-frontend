import React, { useEffect, useState } from 'react'

// NAVIGATION
import PaperSearch from '../PaperSearch/PaperSearch.js'
import TopicCards from '../TopicCards/TopicCards.js'
import FeaturedPapers from '../FeaturedPapers/FeaturedPapers.js'

// USER PROFILES
import WelcomeMessage from '../WelcomeMessage/WelcomeMessage.js'
import ProfileInfo from '../ProfileInfo/ProfileInfo.js'

// STYLES
import { Divider } from 'semantic-ui-react'
import styles from './Homepage.module.css'
import './Homepage.css'

import Navbar from '../Navbar/Navbar.js'

import TopicCardUpdated from '../TopicCardUpdated/TopicCardUpdated.js'

import { Transition } from 'react-transition-group';
import Fade from 'react-reveal/Fade';

import logoGif from '../../media/final-xi.gif'
var GifPlayer = require('react-gif-player');


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
          <GifPlayer
            gif={logoGif}
            autoplay={true}
            style={{
              height: "200px",
              pointerEvents: "none",
            }}
            />
        </div>
          <Fade duration={2400} up>
            <div className={styles.pitchTextWrapper}>
              <p className={styles.pitchText}>Towards Better Science</p>
            </div>
          </Fade>
        </div>
      </div>
    <div className={styles.homepageFeed}>
      <Divider />
      <div className={styles.topicsWrapper}>
        <TopicCards
          topics={props.topics}
          />
      </div>

        <Divider />
          <Divider />



      <h2 style={{fontFamily: "Roboto"}}>Topics</h2>
      <TopicCards
        topics={props.topics}
        />
      <Divider />
      <h2 style={{fontFamily: "Roboto"}}>Featured Papers</h2>
      <FeaturedPapers
        papers={props.papers}
        />
      <Divider />
      <TopicCardUpdated />
    </div>

    </div>
  )
}


export default Homepage;
//

// <WelcomeMessage />
// <Divider />
// <h2 style={{fontFamily: "Roboto"}}>Topics</h2>
// <TopicCards
//   topics={props.topics}
//   />
// <Divider />
// <h2 style={{fontFamily: "Roboto"}}>Featured Papers</h2>
// <FeaturedPapers
//   papers={props.papers}
//   />
// <Divider />
// // <TopicCardUpdated />
// /<div className={styles.paperSearch}>
// <PaperSearch
//   papers={props.papers}
//   />
