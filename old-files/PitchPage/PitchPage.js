import React from 'react';
import styles from './PitchPage.module.css'
import Navbar from 'components/GlobalComponents/Navbar/Navbar.js'
import { Fade } from "react-awesome-reveal";

const peerReviewPitchCards = [
  {
    title: "Slow",
    content: "Over two million articles are published every year, and peer review often takes half a year per paper",
    backgroundColor: "rgba(168, 146, 103, 1)",
    borderColor: "rgba(225, 220, 213, 1)"
  },
  {
    title: "Opaque",
    content: "Peer review has no version control, and comments are almost never made public",
    backgroundColor: "rgba(215, 186, 160, 1)",
    borderColor: "rgba(234, 228, 223, 1)"
  },
  {
    title: "Binary",
    content: "Papers are either accepted or denied, leaving no room for nuance or iterative criticism",
    backgroundColor: "rgba(240, 223, 206, 1)",
    borderColor: "rgba(239, 236, 232, 1)"
  },
]

function PitchPage(){
  return(
  <div>
    <Navbar />

    <Fade direction="up">
    <div className={styles.hookWrapper}>
      <h2 className={styles.hookText}>To tackle the world’s most pressing social issues, scientists need research that is valid, extensible and transparent.</h2>
    </div>
    </Fade>

    <Fade direction="up" delay={2000}>
    <div className={styles.hookWrapper}>
      <h2 className={styles.secondaryHookText}>Peer review is not enough</h2>
    </div>
    </Fade>

    <div className={styles.pitchCardGroup}>
      <Fade cascade={true} direction="up" delay={3000}>
      {peerReviewPitchCards.map((card, index)=>
        <div className={styles.pitchCardWrapper} key={index} style={{backgroundColor: `${card.backgroundColor}`, border: `7px solid ${card.borderColor}`}}>
          <div className={styles.pitchCardTitleWrapper}>
            <h3 className={styles.pitchCardTitle}>{card.title}</h3>
          </div>
          <div className={styles.pitchCardContentWrapper}>
            <p className={styles.pitchCardContent}>{card.content}</p>
          </div>
        </div>
      )}
      </Fade>
    </div>
  </div>
  )
}

export default PitchPage
