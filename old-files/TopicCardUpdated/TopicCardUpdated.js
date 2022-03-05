import React, { useEffect } from 'react';
import styles from './TopicCardUpdated.module.css'
import "./TopicCardUpdated.css"
import ProgressBar from './ProgressBar.js'
import { VscAdd } from 'react-icons/vsc'
import Pluralize from 'react-pluralize'
import { Link } from 'react-router-dom'

function TopicCardUpdated(props){

  useEffect(()=>{
    console.log('These are the topic props', props.topics)
  }, [props.topics])

  return(
    <div className={styles.cardGroup}>

      {props.topics.map((topic, index)=>
          <Link to={topic.slug} key={topic.id}>
            <div className={styles.topicCard}>
              <div className={styles.imageWrapper} style={{
                background:`url(${process.env.REACT_APP_API_AUDIENCE}media/${topic.image}) center center`,
                backgroundSize: "cover"
              }}>
                <div className={styles.imageTopBorderLarge}/>
                <div className={styles.imageTopBorderSmall}/>
                <div className={styles.imageFlexWrapper}>
                  <h2 className={styles.topicTitle}>{topic.header}</h2>
                </div>
                <div className={styles.imageBottomBorderSmall}/>
              </div>
              <div className={styles.metadataWrapper}>
                <div className={styles.metricsWrapper}>
                  <div className={styles.buttonConnector}></div>
                  <div className={styles.buttonFlex}>
                    <button className={styles.infoButton} id={styles.notReviewed}>
                      <p className={styles.infoButtonText} id={styles.notReviewedText}>
                        Social Science
                      </p>
                    </button>
                    <button className={styles.infoButton} id={styles.underReview}>
                      <p className={styles.infoButtonText} id={styles.underReviewText}>
                        Economics
                      </p>
                    </button>
                    <button className={styles.infoButton}>
                      <p className={styles.infoButtonText}>
                        Political Science
                      </p>
                    </button>
                  </div>
                </div>
                <div className={styles.summaryWrapper}>
                  <p className={styles.summary}>Ensure healthy lives and promote well-being for all at all ages</p>
                </div>

                <div className={styles.labelWrapper}>
                  <div className={styles.labelPlaceholderLeft} />
                  <div className={styles.labelIconWrapper}>
                      <h2 className={styles.largeNumber}>{topic.paperCount}</h2>
                    <p className={styles.metricText}><b>
                      <Pluralize singular={'paper'} plural={'papers'} count={topic.paperCount} showCount={false} />
                    </b></p>
                  </div>
                  <div className={styles.labelIconWrapper}>
                    <h2 className={styles.largeNumber}>{topic.annotationCount}</h2>
                    <p className={styles.metricText}><b>
                      <Pluralize singular={'annotation'} plural={'annotations'} count={topic.annotationCount} showCount={false} />
                      </b></p>
                </div>
                <div className={styles.labelIconWrapper}>
                    <h2 className={styles.largeNumber}>{topic.scientistCount}</h2>
                  <p className={styles.metricText}><b>
                    <Pluralize singular={'scientist'} plural={'scientists'} count={topic.scientistCount} showCount={false} />
                  </b></p>
                </div>
                <div className={styles.labelPlaceholderRight} />
                </div>

              <div className={styles.annotationProgressWrapper}>
                <div className={styles.plusButtonWrapper}>
                  <button className={styles.plusButton}>
                    <p className={styles.plusIcon}><VscAdd /></p>
                  </button>
                </div>
                <div className={styles.progressBarWrapper}>
                  <ProgressBar completed={45} />
                </div>
                </div>
                </div>
              </div>

            </Link>

      )}
      </div>

  )
}

export default TopicCardUpdated

// <div className={styles.labelIconContainer}>

// <div className={styles.progressBar}></div>
// <div className={styles.progressCompletedBar}></div>
// <div className={styles.beginningCircle} />
// <div className={styles.progressCircle} />
// <div className={styles.endCircle} />





// <Reveal animated='fade'>
//   <Reveal.Content visible style={{height: "400px", width: '240px'}}>
//     <div className={[styles.topicCardWrapper, styles.displayCardWrapper].join(" ")}>
//       <div className={styles.flexWrapper}>
//         <div className={styles.topicTitleWrapper}>
//           <h2 className={styles.topicTitle}>COVID-19</h2>
//         </div>
//       </div>
//     </div>
//   </Reveal.Content>
//   <Reveal.Content hidden>
//     <div className={[styles.topicCardWrapper, styles.hiddenCardWrapper].join(" ")}>
//       <div className={styles.flexWrapper}>
//         <div className={styles.topicTitleWrapper}>
//           <h2 className={styles.topicTitle}>Hi</h2>
//         </div>
//       </div>
//     </div>
//   </Reveal.Content>
//
// </Reveal>
// <Divider />
// <div className={[styles.topicCardWrapper].join(" ")}>
//
//     <div className={styles.hiddenTitleWrapper}>
//       <h2 className={styles.hiddenTitle}>COVID-19</h2>
//     </div>
// </div>
