import React from 'react';
import styles from './AnnotationCardTemplate.module.css'

function AnnotationCardTemplate(){
  return(
    <div>
      <h1>Hi</h1>
      <div className={styles.annotationCard}>
        <div className={styles.cardHeader}>
          <div className={styles.headerIcon}>
            <div className={styles.headerIconCircle}></div>
          </div>
          <div className={styles.headerTextWrapper}>
            <div className={styles.authorNameWrapper}>
              <p className={styles.authorName}>finn</p>
            </div>
            <div className={styles.createdTimeWrapper}>
              <p className={styles.createdTime}>10h</p>
            </div>
          </div>
          <div className={styles.flexComponent}></div>
          <div className={styles.headerButton}>
            <p className={styles.headerButtonText}>[+]</p>
          </div>
        </div>
        <div className={styles.cardBodyAndScores}>
        <div className={styles.annotationCardBody}>
          <div className={styles.scoreIndent}>
          </div>
          <div className={styles.bodyTextWrapper}>
            <p className={styles.responseText}>Hi</p>
          </div>
        </div>
          <div className={styles.annotationCardScore}>
            <div className={styles.scoreIndent}>
              <div className={styles.scoreButtonWrapper}>
                <div className={styles.scoreButton}>
                  <p className={styles.scoreButtonText}>5</p>
                </div>
              </div>
            </div>
            <div className={styles.scoreMainContainer}>
              <div className={styles.scoreLabelWrapper}>
                <p className={styles.scoreLabel}><b>Validity</b></p>
              </div>
              <div className={styles.scoreResponse}>
                <p className={styles.responseText}>As for the experimental side, this is dubious at best. Perhapes someone can chime in with something more enlightening, but here is my verdict. As for the experimental side, this is dubious at best. Perhapes someone can chime in with something more enlightening, but here is my verdict.</p>
              </div>
            </div>
          </div>

          <div className={styles.annotationCardScore}>
            <div className={styles.scoreIndent}>
              <div className={styles.scoreButtonWrapper}>
                <div className={styles.scoreButton}>
                  <p className={styles.scoreButtonText}>5</p>
                </div>
              </div>
            </div>
            <div className={styles.scoreMainContainer}>
              <div className={styles.scoreLabelWrapper}>
                <p className={styles.scoreLabel}><b>Validity</b></p>
              </div>
              <div className={styles.scoreResponse}>
                <p className={styles.responseText}>For one thing, this paper opened my eyes to a new kind of science. No, really. I get it now. Not sure how the computation acutally takes place, but still, noteworthy.</p>
              </div>
            </div>
          </div>

          <div className={styles.annotationCardScore}>
            <div className={styles.scoreIndent}>
              <div className={styles.scoreButtonWrapper}>
                <div className={styles.scoreButton}>
                  <p className={styles.scoreButtonText}>5</p>
                </div>
              </div>
            </div>
            <div className={styles.scoreMainContainer}>
              <div className={styles.scoreLabelWrapper}>
                <p className={styles.scoreLabel}><b>Validity</b></p>
              </div>
              <div className={styles.scoreResponse}>
                <p className={styles.responseText}>The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee.</p>
              </div>
            </div>
          </div>


        </div>

      </div>
    </div>
  )
}

export default AnnotationCardTemplate;
