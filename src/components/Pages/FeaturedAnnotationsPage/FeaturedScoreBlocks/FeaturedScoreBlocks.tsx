import React from "react"
import {Partial} from "utility/types"
import {Button, Dropdown, Icon} from "semantic-ui-react"
import {titleize} from "utility/StringManipulation"
import {optionizeArray} from "./functions"
import FeaturedTextEditor from "../FeaturedTextEditor/FeaturedTextEditor"

import styles from "./FeaturedScoreBlocks.module.css"

export type ScoreBlockType = {
    id?: number
    field?: string
    scoreNumber?: number
    explanation?: string
}

type ScoreBlocksType = {
    scoreBlocks: ScoreBlockType[]
    beingEdited: boolean
    scoreNumberOptions: number[]
    scoreFieldOptions: string[]
    removeScoreBlock: (sbIndex: number) => void
    editScoreBlock: (sbIndex: number, edits: Partial<ScoreBlockType>) => void
    scoreBlockOpen: (sbIndex: number) => boolean
}

const FeaturedScoreBlocks: React.FC<ScoreBlocksType> = (props) => {
    return (
        <div className={styles.scoreBlockList}>
            {props.scoreBlocks.map((sb, sbIndex) => (
                <div key={sbIndex}>
                    <div className={styles.annotationCardScore}>

                        {/* thing that shows/where you can change the actual score */}
                        <div className={styles.scoreIndent}>
                            <div className={styles.scoreButtonWrapper}>
                                <div className={styles.scoreButton}>
                                    {!props.beingEdited
                                        ?
                                        <p className={styles.scoreButtonText}>{isNaN(sb.scoreNumber || 0) ? "?" : sb.scoreNumber}</p>
                                        : <span className={styles.scoreNumberDropdownText}>
                                            <Dropdown inline basic icon={"dropdown"} value={sb.scoreNumber}
                                                      options={optionizeArray(props.scoreNumberOptions)}
                                                      onChange={(e) =>
                                                          // @ts-ignore
                                                          props.editScoreBlock(sbIndex, {scoreNumber: parseInt(e.target.innerText || "")})
                                                      }/>
                                        </span>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className={styles.scoreMainContainer}>
                            {/* the thing where you can select the field */}
                            <div>
                                {!props.beingEdited
                                    ?
                                    <div className={styles.scoreLabelWrapper}>
                                     <p className={styles.scoreLabel}>
                                        <b>{sb.field ? titleize(sb.field.replace('_', " ")) : "No field selected"}</b></p>
                                    </div>
                                    : <span className={styles.dropdownWrapper}>
                                        <Dropdown inline placeholder={"Please select a field"}
                                                  value={titleize(sb.field)}
                                                  options={optionizeArray(props.scoreFieldOptions)}
                                            // @ts-ignore
                                                  onChange={(e) => props.editScoreBlock(sbIndex, {field: e.target.innerText})}>
                                        </Dropdown>
                                    </span>
                                }
                                {/*
                                  FINN WORK IN PROGRESS
                                  <Dropdown.Menu>
                                  {optionizeArray(props.scoreFieldOptions).map((option, index)=>
                                    <Dropdown.Item key={option.value}
                                      value={option.value}
                                      text={`${option.text}Hi`}
                                      >
                                    </Dropdown.Item>
                                  )}
                                </Dropdown.Menu>
                                 */}
                            </div>

                            {/* score explanation */}
                            <div className={styles.scoreResponse}>
                                {props.scoreBlockOpen(sbIndex) &&
                                <div className={styles.scoreBlockTextContainer}>
                                    <FeaturedTextEditor
                                        editable={props.beingEdited}
                                        value={sb.explanation || ""}
                                        onChange={(md) => props.editScoreBlock(sbIndex, {explanation: md || ""})}
                                        placeholder={"add a note explaining this score..."}
                                    />
                                </div>}
                            </div>

                            <div className={styles.scoreDeleteButtonWrapper}>
                                <div className={styles.flexComponent}/>
                                {props.beingEdited &&
                                <Button icon basic size='mini' style={{marginRight: '5px'}}
                                        onClick={() => props.removeScoreBlock(sbIndex)}>
                                    <Icon name='trash'/>
                                    <span className={styles.buttonText}> Delete Score</span>
                                </Button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default FeaturedScoreBlocks
