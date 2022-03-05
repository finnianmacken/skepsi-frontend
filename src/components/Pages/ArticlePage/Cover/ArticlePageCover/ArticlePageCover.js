import React from "react"
import ScoreMetadata from "../ScoreMetadata/ScoreMetadata"
import styles from "./ArticlePageCover.module.css"

const ArticlePageCover = ({paperMetadata, scores, loading}) => {
    return (
        <div className={styles.coverContainer}>
            <div className={styles.paperWrapper}>
                <div style={{flex: 1}}/>
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
                            <p className={styles.metadataSmall}/>
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
                    scores={scores}
                    loading={loading}
                />
            </div>
            <div/>
        </div>
    )
}

export default ArticlePageCover
