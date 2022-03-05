import React, { useEffect, useState } from 'react'
import styles from './HomepageFinal.module.css'
import { Carousel } from 'react-responsive-carousel';
import style from 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Button, Icon, Card } from 'semantic-ui-react'
import PaperContainer from '../PaperContainer/PaperContainer.js'
import PaperCardTemplate from '../PaperCardTemplate/PaperCardTemplate.js'
import { Link } from 'react-router-dom'
import Pluralize from 'react-pluralize'
import NavbarHomepage from '../NavbarHomepage/NavbarHomepage.js'
import { Fade } from "react-awesome-reveal";

function GlassHomepageCover(props){
  return(
    <div>
      <img className={styles.image} src={`${process.env.REACT_APP_API_AUDIENCE}media/${props.topic.image}`}></img>
      <div className={styles.topicInfoWrapper}>
        <div className={styles.topicTitle}>
          <h1 className={styles.topicTitleText}>{props.topic.header}</h1>
        </div>
        <div className={styles.topicFlexParent}>
          <div className={styles.topicMetadata}>
            <p className={styles.metricText}><b>
              <Pluralize singular={'paper'} plural={'papers'} count={props.topic.paperCount} showCount={true} />
            </b></p>
            <p className={styles.metricText}><b>
              <Pluralize singular={'annotation'} plural={'annotations'} count={props.topic.annotationCount} showCount={true} />
            </b></p>
            <p className={styles.metricText}><b>
              <Pluralize singular={'scientist'} plural={'scientists'} count={props.topic.scientistCount} showCount={true} />
            </b></p>

          </div>
          <div className={styles.topicDescription}>
            <p className={styles.topicDescriptionText}>{props.topic.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function WhitespaceHomepageCover(props){
  return(
    <div>
    <div className={styles.whitespaceTitleWrapper}>
      <div className={styles.whitespaceTitleFlexWrapper}>
      <p className={styles.whitespaceTitleIndex}>0{props.index+1} </p>
      <h1 className={styles.whitespaceTitle}>{props.topic.header}</h1>
      </div>
    </div>
    <div className={styles.whitespaceTitleUnderscore}/>
    <div className={styles.whitespaceDescriptionWrapper}>
      <p className={styles.whitespaceDescription}>{props.topic.description}</p>
    </div>
    <div className={styles.whitespaceMetadataRow}>
      <div className={styles.whitespaceMetadataWrapper}>
        <h1 className={styles.whitespaceMetadataNumber} id={styles.whitespacePaperCount}>{props.topic.paperCount}</h1>
        <p className={styles.whitespaceMetadataText}><b>
          <Pluralize singular={'paper'} plural={'papers'} count={props.topic.paperCount} showCount={false} />
        </b></p>
      </div>
      <div className={styles.whitespaceMetadataWrapper}>
        <h1 className={styles.whitespaceMetadataNumber} id={styles.whitespaceAnnotationCount}>{props.topic.annotationCount}</h1>
        <p className={styles.whitespaceMetadataText}><b>
          <Pluralize singular={'annotation'} plural={'annotations'} count={props.topic.annotationCount} showCount={false} />
        </b></p>

      </div>
      <div className={styles.whitespaceMetadataWrapper}>
        <h1 className={styles.whitespaceMetadataNumber} id={styles.whitespaceScientistCount}>{props.topic.scientistCount}</h1>
        <p className={styles.whitespaceMetadataText}><b>
          <Pluralize singular={'scientist'} plural={'scientists'} count={props.topic.scientistCount} showCount={false} />
        </b></p>
      </div>
    </div>
  </div>
  )
}

function HomepageFinal(props){
  const [activeTopicIndex, setActiveTopicIndex] = useState(0)

  function handleChange(e){
    setActiveTopicIndex(e)
  }

  const arrowStyles: CSSProperties = {
        position: 'absolute',
        zIndex: 2,
        top: 'calc(18% - 15px)',
        width: 170,
        cursor: 'pointer',
        border: "none",
        backgroundColor: "transparent"

    };
    const indicatorStyles: CSSProperties = {
        background: '#fff',
        width: 12,
        height: 12,
        borderRadius: '100%',
        display: 'inline-block',
        margin: '0 8px',
    };

    const customRenderThumb = (children) => children.map((item)=>
    <div>
    </div>)

  return(
    <div className={styles.homepageWrapper}>
      <NavbarHomepage />
      <div className={styles.mainTopicContent}>
        <div className={styles.topDivider} />
        <div className={styles.carouselWrapper}>
            <Fade cascade={true} triggerOnce={true}>
            <Carousel
              autoplay={false}
              fade
              infiniteLoop
              onChange={handleChange}
              style={{height: "100vh"}}
              statusFormatter={(current, total) => ""}
              renderArrowPrev={(onClickHandler, hasPrev, label) =>
                   hasPrev && (
                       <button className={styles.navButton} onClick={onClickHandler} title={label} style={{ ...arrowStyles, left: 6 }}>
                         <div className={styles.navButtonInnerPrev}>
                          <div className={styles.prevWrapper}>
                              <p className={styles.nextText}>Previous:</p>
                          </div>
                          <div className={styles.topicNavigationWrapper}>
                            <p className={styles.topicNavigationPrevText}><sup>0{activeTopicIndex === 0 ? props.topics.length: activeTopicIndex}</sup>{activeTopicIndex === 0 ? props.topics[props.topics.length-1].header: props.topics[activeTopicIndex-1].header}</p>
                          </div>
                          <div className={styles.topicInfoNavigationPrevWrapper}>
                            <p className={styles.topicInfoNavigationText}>
                              <Pluralize
                                singular={'paper'}
                                plural={'papers'}
                                count={activeTopicIndex === 0 ? props.topics[props.topics.length-1].paperCount: props.topics[activeTopicIndex-1].paperCount}
                                showCount={true} />
                            </p>
                          </div>
                        </div>
                       </button>
                   )
               }
               renderArrowNext={(onClickHandler, hasNext, label) =>
                   hasNext && (
                       <button className={styles.navButton} type="button" onClick={onClickHandler} title={label} style={{ ...arrowStyles, right: 15, }}>
                         <div className={styles.navButtonInnerNext}>
                          <div className={styles.nextWrapper}>
                              <p className={styles.nextText}>Next:</p>
                          </div>
                          <div className={styles.topicNavigationWrapper}>
                            <p className={styles.topicNavigationText}><sup>0{activeTopicIndex+1 === props.topics.length ? 1 : activeTopicIndex+2}</sup>{activeTopicIndex+1 === props.topics.length ? props.topics[0].header :props.topics[activeTopicIndex+1].header}</p>
                          </div>
                          <div className={styles.topicInfoNavigationWrapper}>
                            <p className={styles.topicInfoNavigationText}>
                              <Pluralize
                                singular={'paper'}
                                plural={'papers'}
                                count={activeTopicIndex+1 === props.topics.length ? props.topics[0].paperCount :props.topics[activeTopicIndex+1].paperCount}
                                showCount={true} />
                            </p>
                          </div>
                         </div>

                            {/*<Icon name='angle right' inverted fitted size='huge' /> */}
                       </button>
                   )
               }
               renderIndicator={(onClickHandler, isSelected, index, label) => {
                   if (isSelected) {
                       return (
                           <li
                               style={{ ...indicatorStyles, background: '#000' }}
                               aria-label={`Selected: ${label} ${index + 1}`}
                               title={`Selected: ${label} ${index + 1}`}
                           />
                       );
                   }
                   return (
                       <li
                           style={indicatorStyles}
                           onClick={onClickHandler}
                           onKeyDown={onClickHandler}
                           value={index}
                           key={index}
                           role="button"
                           tabIndex={0}
                           title={`${label} ${index + 1}`}
                           aria-label={`${label} ${index + 1}`}
                       />
                   );
               }}
               renderThumbs={customRenderThumb}
               showThumbs={false}
              >
               {props.topics.map((topic, index)=>
                <React.Fragment key={index}>
                <div className={styles.topicViewWrapper}>
                  {/*insert homepage cover designs here*/}
                  <WhitespaceHomepageCover
                    topic = {topic}
                    index = {index}
                    activeTopicIndex = {activeTopicIndex}
                    />
                 </div>

                <div className={styles.cardWrapper}>
                  <div>
                  <div className={styles.innerCardWrapper}>
                      {topic.papers.map((card, index) =>
                        <Link to= {`/${card.id}`} key={card.id}>
                          <PaperCardTemplate
                            paperData={card}
                            />
                        </Link>
                      )}
                  </div>
                  </div>
                </div>
                </React.Fragment>
               )}
            </Carousel>
            </Fade>
          </div>
      </div>

    </div>

  )
}
export default HomepageFinal


// <div className={styles.topicDomains}>
//   <p className={styles.topicDomainsText}>Placeholder {topic.domain}</p>
// </div>
//


//
//
// .paperGroupFlexWrapper {
//   /* SELF POSITIONING */
//   position: absolute;
//   width: 100vw;
//   height: 135vh;
//   border: 5px solid red;
//   z-index: 10;
//   top: 65vh;
//
//   /* FLEX BOX */
//   justify-content: center;
// }
//
// .paperGroup {
//
// }
//
// .innerGroup {
//   display: flex;
//   flex-wrap: wrap;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
// }



// <div className={styles.homepageWrapper}>
    // <Carousel
    //   autoplay={false}
    //   infiniteLoop
    //   style={{height: "100vh"}}
    //   statusFormatter={(current, total) => ""}
    //   renderArrowPrev={(onClickHandler, hasPrev, label) =>
    //        hasPrev && (
    //            <button className={styles.navButton} onClick={onClickHandler} title={label} style={{ ...arrowStyles, left: 15 }}>
    //               <Icon name='angle left' inverted fitted size='huge' />
    //            </button>
    //        )
    //    }
    //    renderArrowNext={(onClickHandler, hasNext, label) =>
    //        hasNext && (
    //            <button className={styles.navButton} type="button" onClick={onClickHandler} title={label} style={{ ...arrowStyles, right: 15 }}>
    //                 <Icon name='angle right' inverted fitted size='huge' />
    //            </button>
    //        )
    //    }
    //    renderIndicator={(onClickHandler, isSelected, index, label) => {
    //        if (isSelected) {
    //            return (
    //                <li
    //                    style={{ ...indicatorStyles, background: '#000' }}
    //                    aria-label={`Selected: ${label} ${index + 1}`}
    //                    title={`Selected: ${label} ${index + 1}`}
    //                />
    //            );
    //        }
    //        return (
    //            <li
    //                style={indicatorStyles}
    //                onClick={onClickHandler}
    //                onKeyDown={onClickHandler}
    //                value={index}
    //                key={index}
    //                role="button"
    //                tabIndex={0}
    //                title={`${label} ${index + 1}`}
    //                aria-label={`${label} ${index + 1}`}
    //            />
    //        );
    //    }}
    //    renderThumbs={customRenderThumb}
    //    showThumbs={false}
    //   >
//       {props.topics.map((topic, index)=>
//         <div>
//           <div className={styles.imageWrapper} key={index}>
            // <div className={styles.topicInfoWrapper}>
              // <div className={styles.topicTitle}>
              //   <h1 className={styles.topicTitleText}>{topic.header}</h1>
              // </div>
              // <div className={styles.topicFlexParent}>
              //   <div className={styles.topicMetadata}>
              //     <p className={styles.metricText}><b>
              //       <Pluralize singular={'paper'} plural={'papers'} count={topic.paperCount} showCount={true} />
              //     </b></p>
              //     <p className={styles.metricText}><b>
              //       <Pluralize singular={'annotation'} plural={'annotations'} count={topic.annotationCount} showCount={true} />
              //     </b></p>
              //     <p className={styles.metricText}><b>
              //       <Pluralize singular={'scientist'} plural={'scientists'} count={topic.scientistCount} showCount={true} />
              //     </b></p>
              //
              //   </div>
              //   <div className={styles.topicDomains}>
              //     <p className={styles.topicDomainsText}>Placeholder {topic.domain}</p>
              //   </div>
              //   <div className={styles.topicDescription}>
              //     <p className={styles.topicDescriptionText}>{topic.description}</p>
              //   </div>
              // </div>
//             </div>
//             <img className={styles.image} src={`${process.env.REACT_APP_API_AUDIENCE}media/${topic.image}`}></img>
//           </div>
          // <div className={styles.paperGroupFlexWrapper}>
          //       <div className={styles.paperGroup}>
          //         <div className={styles.innerGroup}>
                  // {topic.papers.map((card, index) =>
                  //   <Link to= {`/${card.id}`} key={card.id}>
                  //     <PaperCardTemplate
                  //       paperData={card}
                  //       />
                  //   </Link>
                  // )}
          //         </div>
          //       </div>
          // </div>
        // </div>
//       )}
//     </Carousel>
//
// </div>





//
// <div className={styles.paperGroupWrapper}>
//   <div className={styles.paperGroup}>
