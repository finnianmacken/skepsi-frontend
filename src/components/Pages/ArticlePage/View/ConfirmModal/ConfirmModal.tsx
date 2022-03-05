import React from "react"
import {Button, Modal} from "semantic-ui-react"
import styles from "./ConfirmModal.module.css"

type ConfirmModalType = {
    isOpen: boolean
    onClose: () => any
    onOpen: () => any
    onYes: () => any
    onNo: () => any
    message: string
}

const ConfirmModal: React.FC<ConfirmModalType> = (props) => {
    return (
        <Modal open={props.isOpen} onOpen={props.onOpen} onClose={props.onClose}>
            <Modal.Content>
                <p className={styles.deleteModalContent}>{props.message}</p>
            </Modal.Content>
            <Modal.Actions>
                <Button basic size='tiny' className={styles.yesButton} onClick={props.onYes}>
                    <span className={styles.buttonText}>Yes</span>
                </Button>
                <Button basic size='tiny' className={styles.noButton} onClick={props.onNo}>
                    <span className={styles.buttonText}> No</span>
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default ConfirmModal
