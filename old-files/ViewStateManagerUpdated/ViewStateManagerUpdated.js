import React, {useEffect, useRef} from "react"

import PaperViewer from "../PaperViewer/PaperViewer"
import Navbar from "../Navbar/Navbar"
import { Loader, Dimmer, Divider, Icon, Button } from 'semantic-ui-react'
import ScoreMetadata from '../ScoreMetadata/ScoreMetadata.js'
import { Link } from 'react-router-dom'
import NavbarHomepage from '../NavbarHomepage/NavbarHomepage.js'
import { Fade } from "react-awesome-reveal";

import * as styles from "./ViewStateManagerUpdated.module.css"

const ViewStateManager = (props) => {
    const {md, ...paperMetadata} = props.document
    const ref = useRef(null)

    const scrollToTop = () => {
        if (ref.current){
            ref.current.scroll({top: 0, behavior: "smooth"})
        }
    }

    return (
        <div ref={ref} className={styles.main}>
          <div style={{height: "60px"}}>
              <NavbarHomepage />
          </div>
          <Fade triggerOnce>
          <div className={styles.coverContainer}>
            <div className={styles.paperWrapper}>
              {/*}
              <div className={styles.backButtonWrapper}>
                <Button icon circular inverted>
                  <Link to={`/${props.document.topic.slug}`}>
                    <Icon name='angle left' color='black' fitted size='large' />
                  </Link>
                </Button>
              </div>
              */}
              <div style={{flex: 1}}></div>
              <div className={styles.paperContentWrapper}>
                <p className={styles.titleLabel}>{paperMetadata.journal || "JOURNAL"}</p>
                <div className={styles.paperTitleWrapper}>
                  <h1 className={styles.paperTitle}>{paperMetadata.title || "TITLE"}</h1>
                </div>
                <div className={styles.metadataWrapper}>
                  <div className={styles.metadataInnerWrapper}>
                    <p className={styles.metadata}>{paperMetadata.createdDate ? paperMetadata.createdDate.split(" ").slice(-1).join(" ") || "No date" : "DATE"}</p>
                    <p className={styles.metadataSmall}>{paperMetadata.createdDate ? paperMetadata.createdDate.split(" ").slice(0, 2).join(" ") || "No date" : "DATE"}</p>
                  </div>
                  <div className={styles.metadataInnerWrapper}>
                  <p className={styles.metadata}>{paperMetadata.topic ? paperMetadata.topic.header : "HEADER"}</p>
                  <p className={styles.metadataSmall}></p>
                  </div>
                  <div className={styles.metadataInnerWrapper} id={styles.authorsInnerWrapper}>
                  <p className={styles.metadata}>{paperMetadata.authors || "AUTHOR"}</p>
                  <p className={styles.metadataSmall}>{paperMetadata.doi || "x"}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.annotationWrapper}>
              <ScoreMetadata
                scores={props.scores}
                loading={props.loading}
                />
            </div>
            <div>
            </div>
          </div>

          <PaperViewer
            document={props.document}
            annotations={props.annotations}
            scrollToTop={scrollToTop}/>

        </Fade>
        </div>
    )
}

export default ViewStateManager
