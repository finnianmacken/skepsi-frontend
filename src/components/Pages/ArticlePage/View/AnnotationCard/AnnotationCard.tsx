import React, {useContext, useRef, useState, useEffect} from "react"
import {Button, Icon} from 'semantic-ui-react'
import {useMutation} from '@apollo/client'
import {AuthenticationContext, UserContext} from 'App.js'
import {Link, useLocation} from 'react-router-dom'
import {useStateWithCallbackLazy} from "use-state-with-callback"
import {useAuth0} from "@auth0/auth0-react"

import {GET_PAPER_AND_ANNOTATION_DATA} from '../../ArticlePageManager/ArticlePageManager.js'
import {AnnotationType} from "logic/annotation"
import {range} from "utility/functions"
import {ScoreBlockType} from "../ScoreBlocks/ScoreBlocks"
import {CREATE_ANNOTATION, UPDATE_ANNOTATION, DELETE_ANNOTATION, CREATE_SCORE, UPDATE_SCORE, DELETE_SCORE} from "./queries"

import ConfirmModal from "../ConfirmModal/ConfirmModal"
import TextEditor from "../TextEditor/TextEditor"

import styles from "./AnnotationCard.module.css"
import ScoreBlocks from "../ScoreBlocks/ScoreBlocks"

const basicCatch = (e: any) => {
    console.log(e)
    alert("An error occurred. Please try again or check the console for details.")
}

export type AnnotationCardType = {
    id?: number
    start?: number
    stop?: number
    activeHighlight?: boolean
    author?: string
    date?: string
    text?: string
    scoreBlocks?: ScoreBlockType[]
    beingEdited?: boolean
    userCouldEdit?: boolean
    replies?: AnnotationCardType[]
    onReply?: () => void
    _depth?: number
    activeReply?: false | (() => void)
    annotation?: AnnotationType
    parentId?: number
    width?: number
}

type SecretRealAnnotationCardType = AnnotationCardType & {
    nodeRef?: React.RefObject<HTMLDivElement>
    active?: boolean
    onClick?: React.MouseEventHandler
    killActiveSelection?: () => void
    onChange?: () => void
}

const AnnotationCard: React.FC<SecretRealAnnotationCardType> = (props) => {

    const validScoreNumbers = range(1, 6)
    const validScoreFields = ["Validity", "Novelty", "Domain Importance"]

    const user = useContext(UserContext)
    const isAuthenticated = useContext(AuthenticationContext)
    const location = useLocation()
    const {loginWithRedirect} = useAuth0()

    const [state, _setState] = useStateWithCallbackLazy({
        date: props.date || "",
        text: props.text || "",
        scoreBlocks: props.scoreBlocks || [],
        beingEdited: props.beingEdited || false,
        parentId: props.parentId,
    })

    const stateRevertRef = useRef(state)

    const setState = (val: typeof state | ((current: typeof state) => typeof state)) => {
        const valFunc = typeof val === "function"? val : () => val
        const valSetRevert = (s: typeof state) => {
            const newVal = valFunc(s)
            if (!s.beingEdited && newVal.beingEdited){
                stateRevertRef.current = s
            }
            return newVal
        }
        _setState(valSetRevert, () => props.onChange && props.onChange())
    }

    // when we become active, we show some buttons, so we need to reflow the sidebar
    useEffect(() => props.onChange && props.onChange() , [props.active])

    const childrenIndent = 20
    const width = props.width || 450
    const annotationId = typeof props.id === "number"? props.id: NaN
    const depth = props._depth || 0
    const author = props.author || ""
    const username = user['http://www.skepsi.com/username']
    const currentUserIsAuthor = (author === username) || props.activeHighlight || props.activeReply
    const paperId = location.pathname.replace('/', '')

    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [scoreNumberError, setScoreNumberError] = useState(false)
    const [scoreFieldError, setScoreFieldError] = useState(false)

    const [repliesOpen, setRepliesOpen] = useState(depth < 3)
    const [openScoreBlocks, setOpenScoreBlocks] = useState(Array.isArray(state.scoreBlocks)
        ? state.scoreBlocks.map(() => depth < 2)
        : []
    )

    // const toggleOpen = (sbIndex: number) => setOpenScoreBlocks(open =>
    //     open.map((each, i) => i === sbIndex ? !each : each))

    const [createAnnotation] = useMutation(CREATE_ANNOTATION, {refetchQueries: [{query: GET_PAPER_AND_ANNOTATION_DATA, variables: {paperId: paperId}}]})
    const [createAnnotationWithoutRefetch] = useMutation(CREATE_ANNOTATION)
    const [updateAnnotation] = useMutation(UPDATE_ANNOTATION, {refetchQueries: [{query: GET_PAPER_AND_ANNOTATION_DATA, variables: {paperId: paperId}}]})
    const [deleteAnnotation] = useMutation(DELETE_ANNOTATION, {refetchQueries: [{query: GET_PAPER_AND_ANNOTATION_DATA, variables: {paperId: paperId}}]})
    const [createScore] = useMutation(CREATE_SCORE, {refetchQueries: [{query: GET_PAPER_AND_ANNOTATION_DATA, variables: {paperId: paperId}}]})
    const [updateScore] = useMutation(UPDATE_SCORE, {refetchQueries: [{query: GET_PAPER_AND_ANNOTATION_DATA, variables: {paperId: paperId}}]})
    const [deleteScore] = useMutation(DELETE_SCORE, {refetchQueries: [{query: GET_PAPER_AND_ANNOTATION_DATA, variables: {paperId: paperId}}]})


    const addScoreBlock = () => {
        setState(state => ({
            ...state,
            scoreBlocks: [...state.scoreBlocks, {field: "", scoreNumber: NaN, explanation: ""}]
        }))
        setOpenScoreBlocks(open => [...open, true])
    }


    const removeScoreBlock = (sbIndex: number) => {
        const sbId = state.scoreBlocks[sbIndex].id
        if (sbId) {
            deleteScore({variables: {scoreId: sbId}})
                .catch(basicCatch)
                .then(() => {
                    setState({
                        ...state,
                        scoreBlocks: state.scoreBlocks.slice(0, sbIndex).concat(state.scoreBlocks.slice(sbIndex + 1))
                    })
                    setOpenScoreBlocks(openScoreBlocks.slice(0, sbIndex).concat(openScoreBlocks.slice(sbIndex + 1)))
                })
        }
      else{
        setState({
            ...state,
            scoreBlocks: state.scoreBlocks.slice(0, sbIndex).concat(state.scoreBlocks.slice(sbIndex + 1))
        })
        setOpenScoreBlocks(openScoreBlocks.slice(0, sbIndex).concat(openScoreBlocks.slice(sbIndex + 1)))
      }
    }

    const editScoreBlock = (sbIndex: number, newVals: ScoreBlockType) => {
        setState(prevState => {
            const newScoreBlocks = [...prevState.scoreBlocks]
            newScoreBlocks[sbIndex] = {...newScoreBlocks[sbIndex], ...newVals}
            let state = Object.assign({}, prevState)
            state.scoreBlocks = newScoreBlocks
            return {...state}
        })
    }

    const validateSave = () => {
        let ans = true
        state.scoreBlocks.forEach((sb) => {
            // @ts-ignore
            if (!validScoreNumbers.includes(sb.scoreNumber || NaN)){
                setScoreNumberError(true)
                ans = false
            }
            if (!validScoreFields.includes(sb.field || "")){
                setScoreFieldError(true)
                ans = false
            }
        })
        return ans
    }

    const saveScoreBlocks = (aId: number) => {
        return Promise.all(
            state.scoreBlocks.map((score) => {
                const info = {explanation: score.explanation || "", field: score.field, scoreNumber: score.scoreNumber}
                return score.id && score.field && score.scoreNumber !== undefined
                    ? updateScore({variables: {...info, scoreId: score.id}})
                    : createScore({variables: {...info, author: username, annotationId: aId}})
            })
        )
    }

    const saveAndCreateNew = () => {
        const data = {
            author: username,
            start: props.start || 0,
            stop: props.stop || 0,
            quote: "",
            content: state.text,
            paperId: paperId,
            parentId: state.parentId ? state.parentId : -1
        }
        if(state.scoreBlocks.length > 0){
          return createAnnotationWithoutRefetch({variables: data})
          .then(response => response && response.data && response.data.createAnnotation.annotation.id)
          .then(parseInt)
        }
        else{
          return createAnnotation({variables: data})
              .then(response => response && response.data && response.data.createAnnotation.annotation.id)
              .then(parseInt)
        }
    }

    const saveAndUpdate = () => {
        return updateAnnotation({
            variables: {
                id: annotationId,
                quote: "",
                content: state.text
            }
        }).then(() => annotationId)
    }

    const onSave = () => {
        // resets error messages so it can check them again
        setScoreNumberError(false)
        setScoreFieldError(false)

        if (!isAuthenticated){
            alert("You must sign in to save annotations")
            return
        } else if (!validateSave()) {
            return
        }

        // both of these options return promises which resolve to annotation ids
        (props.activeHighlight || props.activeReply ? saveAndCreateNew() : saveAndUpdate())
            .then(aId => saveScoreBlocks(aId))
            .then(() => {
                if ((props.activeHighlight || props.activeReply) && props.killActiveSelection) {
                    props.killActiveSelection()
                }
                if (props.activeReply){
                    props.activeReply()
                }
                setState(state => ({...state, beingEdited: false}))
            })
            .catch(basicCatch)
    }

    const onDelete = () => deleteAnnotation({variables: {annotationId: annotationId}}).catch(basicCatch)

    const onBack = () => {
        if (props.activeHighlight){
            props.killActiveSelection && props.killActiveSelection()
        } else if (props.activeReply){
            // this is a poison pill
            props.activeReply()
        } else {
            setState(stateRevertRef.current)
        }
    }

    return (
        <div
            ref={props.nodeRef}
            className={styles.annotationCard}
            onClick={props.onClick}
            style={{
                backgroundColor: depth % 2 === 1 ? "lightgrey" : "white",
                borderWidth: props.active ? 2 : 1,
                width: width,
            }}>

            <div className={styles.cardHeader}>
                <div className={styles.headerIcon}><div className={styles.headerIconCircle}/></div>
                <div className={styles.headerTextWrapper}>
                    <div className={styles.authorNameWrapper}>
                        <p className={styles.authorName}>{currentUserIsAuthor ? "me" : author}</p>
                    </div>
                    <div className={styles.createdTimeWrapper}>
                        <p className={styles.createdTime}>{state.date}</p>
                    </div>
                </div>
                <div className={styles.flexComponent}/>
                <div className={styles.headerButton}>
                    <p className={styles.headerButtonText}>[+]</p>
                </div>
            </div>

            <div className={styles.cardBodyAndScores}>
                {/* BODY */}
                <div className={styles.annotationCardBody}>
                    <div className={styles.scoreIndent}>
                    </div>
                    <div className={styles.bodyTextWrapper}>
                        {scoreNumberError &&
                        <div className={styles.scoreInnerWarningBox}>
                            <p className={styles.scoreInnerWarningText}>At least one of your scores doesn't have a
                                value</p>
                        </div>}

                        {scoreFieldError &&
                        <div className={styles.scoreInnerWarningBox}>
                            <p className={styles.scoreInnerWarningText}>At least one of your scores doesn't have a
                                field</p>
                        </div>}

                        <p className={styles.responseText}>
                            <TextEditor
                                editable={state.beingEdited}
                                value={state.text}
                                onChange={md => setState(state => ({...state, text: md || ""}))}
                                placeholder={"what do you think?"}
                            />

                            {!isAuthenticated &&
                            <>
                                <div className={styles.errorDivider}/>
                                <div className={styles.logInErrorWrapper}>
                                    <p className={styles.logInErrorText}>Please
                                        <span className={styles.authText}
                                              onClick={() => loginWithRedirect()}> log in </span>
                                        or
                                        <Link to='/signup'><span className={styles.authText}> sign up </span></Link>
                                        to annotate
                                    </p>
                                </div>
                            </>}
                        </p>
                    </div>
                </div>

                <ScoreBlocks
                    scoreBlocks={state.scoreBlocks}
                    beingEdited={state.beingEdited}
                    scoreNumberOptions={validScoreNumbers}
                    scoreFieldOptions={validScoreFields}
                    removeScoreBlock={removeScoreBlock}
                    editScoreBlock={editScoreBlock}
                    scoreBlockOpen={i => openScoreBlocks[i]}/>

                {isAuthenticated && props.active &&
                <div className={styles.buttonRow}>

                    {/* close/expand ScoreBlock explanations */}
                    {Boolean(state.scoreBlocks && (state.scoreBlocks.length > 0)) && ((() => {
                        // jesus the work you go through to get a closure in this language
                        const anyOpen = openScoreBlocks.filter(x => x).length > 0
                        return (
                        <Button icon basic size={"mini"} className={styles.editButton}
                                onClick={() => setOpenScoreBlocks(open => open.map(() => !anyOpen))}>
                            <Icon name={anyOpen? "compress": "expand"} />
                            <span className={styles.buttonText}> {anyOpen? "Close": "Expand"} All Scores</span>
                        </Button>
                        )
                    })())}

                    <div className={styles.buttonFlex}/>
                    {state.beingEdited
                        ? <>
                            <div className={styles.buttonRowWrapper}>
                                <Button icon basic style={{marginRight: "5px"}} size='mini' className={styles.editButton} onClick={isAuthenticated ? addScoreBlock : () => alert("You must sign in to comment.")}>
                                    <Icon name='add'/>
                                    <span className={styles.buttonText}> Add Score</span>
                                </Button>
                                <Button icon basic style={{marginRight: "5px"}} size='mini' className={styles.editButton} onClick={onSave}>
                                    <Icon name='save'/>
                                    <span className={styles.buttonText}> Save</span>
                                </Button>
                                <Button icon basic size='mini' className={styles.editButton} onClick={onBack}>
                                    <Icon name='arrow left'/>
                                    <span className={styles.buttonText}> Back</span>
                                </Button>
                            </div>
                        </>
                        : <>
                            <div>
                                {currentUserIsAuthor &&
                                <Button icon basic size='mini' style={{marginRight: "5px"}} className={styles.editButton}
                                    onClick={() => {
                                        setState({...state, beingEdited: true})
                                        setOpenScoreBlocks(x => x.map(() => true))
                                    }}>
                                    <Icon name='edit'/>
                                    <span className={styles.buttonText}> Edit</span>
                                </Button>
                                }

                                <Button icon size='mini' basic style={{marginRight: "5px"}} className={styles.replyButton}
                                    onClick={isAuthenticated
                                        ? props.onReply
                                        : () => alert('Please log in or sign up to comment')}>
                                    <Icon name='reply'/>
                                    <span className={styles.buttonText}> Reply</span>
                                </Button>
                            </div>

                            {currentUserIsAuthor &&
                            <>
                                <Button icon basic size='mini' className={styles.editButton} onClick={() => setDeleteModalOpen(true)}>
                                    <Icon name='delete'/>
                                    <span className={styles.buttonText}> Delete</span>
                                </Button>

                                <ConfirmModal
                                    isOpen={deleteModalOpen}
                                    onClose={() => setDeleteModalOpen(false)}
                                    onOpen={() => setDeleteModalOpen(true)}
                                    onYes={() => {
                                        setDeleteModalOpen(false)
                                        onDelete().catch(basicCatch)
                                    }}
                                    onNo={() => setDeleteModalOpen(false)}
                                    message={"Are you sure you want to delete this annotation?"}/>
                            </>
                            }
                        </>
                    }

                </div>
                }

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

                {Boolean(props.replies && props.replies.length) &&
                    (repliesOpen
                        ?
                        <Button icon basic size={"mini"}
                          className={styles.editButton}
                          style={{margin: "10px"}}
                          onClick={() => setRepliesOpen(false)}>
                            <Icon name="compress" />
                            <span className={styles.buttonText}> Hide Replies</span>
                        </Button>
                        :
                        <Button icon basic size={"mini"}
                          className={styles.editButton}
                          style={{margin: "10px"}}
                          onClick={() => setRepliesOpen(true)}>
                            <Icon name="expand" />
                            <span className={styles.buttonText}> Show Replies</span>
                        </Button>
                )}
            </div>
        </div>
    )
}

export default AnnotationCard
