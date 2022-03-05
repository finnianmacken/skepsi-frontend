import React from 'react';
import styles from './FeaturedAnnotationsTemplate.module.css'
import FeaturedTextEditor from "../FeaturedTextEditor/FeaturedTextEditor"
import FeaturedScoreBlocks from "../FeaturedScoreBlocks/FeaturedScoreBlocks"
import {titleize} from "utility/StringManipulation"
import { Link } from 'react-router-dom'


function FeaturedAnnotationsTemplate(props){

  return(
    <div>
      <div className={styles.featuredCardHeader}>
        <div className={styles.indentOverflowWrapper}>
            <div className={styles.featuredCardHeaderIndent}>
              <div className={styles.featuredNumberSquareWrapper}>
                <div className={styles.featuredNumberSquare}>
                  <p className={styles.featuredNumber}>{props.index +1}</p> {/*{props.index+1 < 10 ? `0${props.index+1}` : props.index+1}*/}
                </div>
              </div>
              <div className={styles.featuredHeaderIndentFlexOuter}>
                <div className={styles.featuredHeaderIndentFlex}>
                  <div className={styles.featuredHeaderIndentLineLeft}></div>
                  <div className={styles.featuredHeaderIndentLineRight}></div>
                </div>
              </div>
            </div>
        </div>
        <div className={styles.featuredCardHeaderTextOuterWrapper}>
          <div className={styles.featuredCardHeaderTextInnerWrapper}>
            <div className={styles.featuredAuthorFlexWrapper}>
              <h3 className={styles.featuredAuthorText}>{props.topic.annotation.author ? props.topic.annotation.author.username : "NO USERNAME"} <span style={{fontWeight: "normal"}}>on</span></h3>
              <div style={{flex: 1}}/>
              <p className={styles.featuredScoreText}>{props.activeTopic ? props.activeTopic : ""}: {isNaN(props.topic[props.activeTopic.toLowerCase()]) ? "Not Processed" : `${Math.round(props.topic[props.activeTopic.toLowerCase()]*100)}% match`}</p>
            </div>
            <Link to={props.topic.annotation.paper.id}>
              <h2 className={styles.featuredPaperText}>{props.topic.annotation.paper ? props.topic.annotation.paper.title : "NO PAPER"}</h2>
            </Link>
          </div>

        </div>
      </div>

      <div className={styles.cardBodyAndScores}>
          {/* BODY */}
          <div className={styles.annotationCardBody}>
              <div className={styles.scoreIndent}>
              </div>
              <div className={styles.bodyTextWrapper}>

                  <p className={styles.responseText}>
                      <FeaturedTextEditor
                          editable={false}
                          value={props.topic.annotation.content}
                          placeholder={"what do you think?"}
                      />
                  </p>
              </div>
          </div>

            {props.topic.annotation.scores.map((score, index)=>
              <div className={styles.featuredScores}>
                <div className={styles.featuredScoreIndent}>
                  <div className={styles.featuredScoreButtonWrapper}>
                    <div className={styles.featuredScoreButton}>
                      <p className={styles.featuredScoreButtonText}>{score.scoreNumber ? score.scoreNumber : ""}</p>
                    </div>
                  </div>
                </div>
                <div className={styles.featuredScoreTextWrapper}>
                  <div className={styles.featuredScoreFieldWrapper}>
                    <p className={styles.featuredScoreField}>{score.field ? titleize(score.field) : ""}</p>
                  </div>
                  <div className={styles.featuredScoreExplanationWrapper}>
                    <p className={styles.featuredScoreExplanation}>{score.explanation ? score.explanation : ""}</p>
                  </div>
                </div>
              </div>
          )}

              {/* close/expand ScoreBlock explanations */}
              {/*  {Boolean(state.scoreBlocks && (state.scoreBlocks.length > 0)) && ((() => {
                  // jesus the work you go through to get a closure in this language
                  const anyOpen = openScoreBlocks.filter(x => x).length > 0
                  return (
                  <Button icon basic size={"mini"} className={styles.editButton}
                          onClick={() => setOpenScoreBlocks(open => open.map(() => !anyOpen))}>
                      <Icon name={anyOpen? "compress": "expand"} />
                      <span className={styles.buttonText}> {anyOpen? "Close": "Expand"} All Scores</span>
                  </Button>
                  )
              })())} */}

          {/*
          {repliesOpen &&
              <div className={styles.childrenContainer} style={{marginLeft: childrenIndent}}>
                  {Array.isArray(props.replies) && props.replies.map(each =>
                      <AnnotationCard
                          key={each.id}
                          {...each}
                          _depth={depth + 1}
                          width={width - childrenIndent}
                          onChange={props.onChange}/>
                  )}
              </div>
          }
          */}
      </div>


  </div>)
}

export default FeaturedAnnotationsTemplate






{/*
<div className={styles.cardHeader}>
    <div className={styles.headerIcon}><div className={styles.headerIconCircle}/></div>
    <div className={styles.headerTextWrapper}>
        <div className={styles.authorNameWrapper}>
            <p className={styles.authorName}>"AUTHOR NAME"</p>
        </div>
        <div className={styles.createdTimeWrapper}>
            <p className={styles.createdTime}>"CREATED DATE"</p>
        </div>
    </div>
    <div className={styles.flexComponent}/>
    <div className={styles.headerButton}>
        <p className={styles.headerButtonText}>[+]</p>
    </div>
</div>
*/}
