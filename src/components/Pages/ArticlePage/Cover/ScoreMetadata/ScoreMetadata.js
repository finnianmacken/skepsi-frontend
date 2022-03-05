import React, {useEffect, useState} from 'react';
import styles from "./ScoreMetadata.module.css"
import {Divider, Dropdown} from 'semantic-ui-react'
import {titleize} from 'utility/StringManipulation.js'
import {std} from 'mathjs'
import VerticalBarChart from './VerticalBarChart.js'
import './ScoreMetadata.css' // TODO(Leo): convert to css module

function ScoreMetadata(props) {
    const fieldSet = new Set(props.scores ? props.scores.map(score => score.field) : {})
    const fieldArray = Array.from(fieldSet)
    const [chart, setChart] = useState(fieldArray[0])
    const [xAxisData, setXAxisData] = useState()

    useEffect(()=>{
      console.log("PROPS.SCORES", props.scores)
      console.log("FIELD SET", fieldSet)
      console.log("FIELD ARRAY", fieldArray)
    }, [props.scores, fieldSet, fieldArray])

    // CALCULATING METADATA
    let scoreArray = []
    let name = ""
    let tempArray = []

    // this is an immediately invoked function expression (IIFE)
    const calculateMetadata = (function () {
            if (props.scores) {
                for (let fieldName of fieldArray) {
                    // console.log(typeof fieldName)
                    name = fieldName
                    let sum = 0
                    let counter = 0
                    for (let score of props.scores) {
                        if (fieldName === score.field) {
                            sum += score.scoreNumber
                            counter += 1
                            tempArray.push(score.scoreNumber)
                        }
                    }
                    // add other metadata calculations to this section
                    let obj = {}
                    obj["field"] = name
                    obj["average"] = Number(sum / counter).toFixed(2)
                    obj["standard_deviation"] = std(tempArray).toFixed(2)
                    scoreArray.push(obj)
                }

                return scoreArray
            } else {
                return null
            }
        }
    )()

    // CREATING HISTOGRAM DATA
    useEffect(() => {
        let scoreDistribution = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        for (let score of props.scores) {
            if(score.field === chart) {
                scoreDistribution[`${score.scoreNumber - 1}`] += 1
            }
        }
        setXAxisData(scoreDistribution)
    }, [chart, props.scores])


    const dropdownOptions = []
    fieldArray.map(field =>
        dropdownOptions.push(
            {
                key: `${field}`,
                value: `${field}`,
                text: field ? titleize(`${field}`) : ""
            }
        )
    )

    //
    // useEffect(()=>{
    //   console.log("This is the x axis data", xAxisData)
    // }, [xAxisData])


    if (xAxisData){
        return (
            <div>
                <div className={styles.barChartWrapper} style={{}}>
                    <div className={styles.wrapperBox}>
                        <div className={"dropdownWrapper"}>
                            <div>
                                <Dropdown
                                    options={dropdownOptions}
                                    selection
                                    onChange={(data, { value }) => setChart(value)}
                                    placeholder={chart ? titleize(chart) : ""}
                                />
                            </div>
                            <div className={styles.horizontalFlex}/>
                            <div className={styles.metaData}>
                                {calculateMetadata.map(function ({field, average, standard_deviation}, index) {
                                        if (field === chart) {
                                            return (
                                                <div key={index}>
                                                    <p className={styles.metadataText}><b>Mean:</b> {average}</p>
                                                    <p className={styles.metadataText}><b>STD:</b> {standard_deviation}</p>
                                                </div>)
                                        }
                                    }
                                )}
                            </div>

                        </div>
                        <Divider/>
                        <VerticalBarChart
                            xAxisData={xAxisData}
                        />
                        {props.scores.length === 0 &&
                        <p className={styles.noScoresText}>There are no annotations with scores</p>
                        }
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div/>
    )
}

export default ScoreMetadata
