import React, {useState} from 'react'
import {Card, Icon, Image, Label, Loader, Modal} from 'semantic-ui-react'
import {Img} from 'react-image'
import styles from './TableViewer.module.css'

function TableViewer(props) {
    const [open, setOpen] = useState(false)
    const [activeImage, setActiveImage] = useState("")

    function handleExpandClick(data) {
        setActiveImage(data.target.offsetParent.childNodes[0].firstChild.firstChild.id)
        setOpen(true)

        // DEBUG:
        console.log(data.target.offsetParent.childNodes[0].firstChild.firstChild.id)
    }

    if (props.paperMetadata && Array.isArray(props.paperMetadata.tables)) {
        return (
            <div className={styles.tableWrapper}>
                <Card.Group centered>
                    {props.paperMetadata.tables.map((table, index) =>

                        <Card className={styles.tableCard} key={index}>
                            <Card.Content>
                                <div className={styles.imageWrapper}>
                                    <Img
                                        className={styles.tableImage}
                                        id={table.image}
                                        src={`${process.env.REACT_APP_API_AUDIENCE}media/${table.image}`}
                                        loader={<Loader/>}
                                    />
                                </div>
                            </Card.Content>
                            <Card.Content extra>
                                <div className={styles.titleWrapper}>
                                  <div className={styles.titleInnerWrapper}>
                                    <p className={styles.tableTitle}>
                                        <b>[{table.tableNumber}]</b> {table.name}
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
                                <p className={styles.tableCaption}>
                                    <em>{table.caption}</em>
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

    return <div>No Tables to Show</div>
}

export default TableViewer

//src={`${process.env.REACT_APP_API_AUDIENCE}media/${figure.image}`}

// `${process.env.REACT_APP_API_AUDIENCE}media/${activeImage}`
