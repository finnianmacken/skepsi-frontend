import React, { useEffect } from 'react';
import styles from './PaperSearchCards.module.css'
import { Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import './PaperSearchCards.css'

function PaperSearchCards(props){
  // const topicSet = new Set(props.data ? props.data.map(paper => paper.topic.header) : null)
  // const topicArray = Array.from(topicSet)

  const colors = ["#F0E0CD", "#D3C7BC", "#CCBA9C", "#9E825E", '#94694B', '#552A11', '#42230D']

  // not robust beyond the length of colors
  const topicObject = Object.assign({}, ...props.topicArray.map((topic, index)=> ({[topic]: colors[index]})))

  useEffect(()=>{
    console.log('paper search card data', props.data)
    console.log("topic object", topicObject)
  }, [props.data, topicObject])

  if(props.data){
    return(
      <div className={styles.resultsWrapper}>
        <div className={styles.columnFlexWrapper}>
          <Link to={`/${props.data.topic.slug}`}>
            <div className={styles.resultsMetadata}>
              <Label id={styles.topicLabel} style={{backgroundColor: topicObject[`${props.data.topic.header}`] }}>{props.data.topic.header}</Label>
            </div>
          </Link>
          <Link to="/1">
          <div className={styles.resultsMainBody}>
            <p className={styles.title}>{props.data.title}</p>
            <div className={styles.flexWrapper}>
              <div>
                <p className={styles.authors}>{props.data.authors}</p>
              </div>
              <div className={styles.flexComponent}/>
            </div>
          </div>
          </Link>
        </div>
      </div>
    )
  }
}

export default PaperSearchCards
