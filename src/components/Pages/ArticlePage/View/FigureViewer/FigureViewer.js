import React, {useState} from 'react'
import {Card, Icon, Image, Label, Loader, Modal} from 'semantic-ui-react'
import {Img} from 'react-image'
import styles from './FigureViewer.module.css'

function FigureViewer(props) {
    const [open, setOpen] = useState(false)
    const [activeImage, setActiveImage] = useState("")

    function handleExpandClick(data) {
        setActiveImage(data.target.offsetParent.childNodes[0].firstChild.firstChild.id)
        setOpen(true)

        // DEBUG:
        console.log(data.target.offsetParent.childNodes[0].firstChild.firstChild.id)
    }


    if (props.paperMetadata && Array.isArray(props.paperMetadata.figures)) {
        return (
            <div className={styles.figureWrapper}>
                <Card.Group centered>
                    {props.paperMetadata.figures.map((figure, index) =>

                        <Card className={styles.figureCard} key={index}>
                            <Card.Content>
                                <div className={styles.imageWrapper}>
                                    <Img
                                        className={styles.figureImage}
                                        id={figure.image}
                                        src={`${process.env.REACT_APP_API_AUDIENCE}media/${figure.image}`}
                                        loader={<Loader/>}
                                    />

                                </div>
                            </Card.Content>
                            <Card.Content extra>
                                <div className={styles.titleWrapper}>
                                  <div className={styles.titleInnerWrapper}>
                                    <p className={styles.figureTitle}>
                                        <b>[{figure.figureNumber}]</b> {figure.name}
                                    </p>
                                  </div>
                                  <div style={{flex: 1}}/>
                                  <div className={styles.titleLabelWrapper}>
                                    <Label as="button"
                                           onClick={handleExpandClick}
                                           style={{
                                               zIndex: 10000,
                                           }}><Icon fitted name='expand' style={{pointerEvents: 'none'}}/></Label>
                                  </div>
                                </div>
                                <p className={styles.figureCaption}>
                                    <em>{figure.caption}</em>
                                </p>
                            </Card.Content>

                        </Card>
                    )}
                </Card.Group>
                <Modal
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    centered
                >
                  <div className={styles.modalImageWrapper}>
                    <Image
                        src={`${process.env.REACT_APP_API_AUDIENCE}media/${activeImage}`}>
                    </Image>
                  </div>
                </Modal>
            </div>
        )
    }

    return <div>No Figures to Show</div>
}

export default FigureViewer

//src={`${process.env.REACT_APP_API_AUDIENCE}media/${figure.image}`}

// `${process.env.REACT_APP_API_AUDIENCE}media/${activeImage}`
