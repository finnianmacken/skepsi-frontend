import React from 'react'
import {Card} from 'semantic-ui-react'
import styles from './ReferenceViewer.module.css'

function ReferenceViewer(props) {

    if (!props.paperMetadata) {
        return <div/>
    }

    return (
        <div className={styles.cardOverflowController}>
            <Card.Group centered className={styles.cardContainer}>
                {Array.isArray(props.paperMetadata.references) && props.paperMetadata.references.map((reference, index) =>
                    <Card key={index}>
                        <Card.Header className={styles.cardHeader}>
                            [{reference.paperOrder}] {reference.title}
                        </Card.Header>
                        <Card.Meta>
                            {reference.authors}
                        </Card.Meta>
                        <Card.Content>
                            {reference.citation}
                        </Card.Content>
                    </Card>
                )}
            </Card.Group>
        </div>
    )
}

export default ReferenceViewer
