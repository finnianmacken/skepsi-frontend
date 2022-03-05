import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import styles from './PaperContainer.module.css'
import Navbar from 'components/GlobalComponents/Navbar/Navbar.js'
import PaperCardTemplate from '../PaperCardTemplate/PaperCardTemplate.js'

const GET_PAPERS_BY_TOPIC = gql`
query getPapersByTopic($slug:String!){
  papersByTopic(slug:$slug){
    id
    title
    authors
    citationMLA
    abstract
    annotationCount
    createdDate
    readingTime
    topic{
      header
      description
      image
    }
  }
}
`

function PaperContainer(){
  const [tokenCard, setTokenCard] = useState(undefined)
  const location = useLocation()
  const {data, error, loading} = useQuery(GET_PAPERS_BY_TOPIC, {variables:{
    slug: location.pathname.replace('/', '')
  }})


  useEffect(()=>{
    console.log('PAPERCARDS:', data)
    console.log("TOKEN CARD", tokenCard)
  }, [data, tokenCard])

  useEffect(()=>{
    if(data){
      setTokenCard(data.papersByTopic[0])
    }
  }, [data])

  if(loading || error || !tokenCard){
    return(
      <div></div>
    )
  }

  if(data && tokenCard){
    return(
      <div>
            <div className={styles.cardGroupWrapper}>
              <div className={styles.cardGroup}>
                {data.papersByTopic.map((card, index) =>
                  <Link to= {`/${card.id}`} key={card.id}>
                    <PaperCardTemplate
                      paperData={card}
                      />
                  </Link>
                )}
              </div>
            </div>
    </div>
    )
  }
}

export default PaperContainer

// <div className={styles.toolBar}>
//   <div className={styles.toolBarFlexFill} />
//   <div className={styles.toolbarIconsWrapper}>
//   </div>
// </div>
//
//
// <div className={styles.underlineWrapper}>
//   <div className={styles.descriptionBoxUnderline}/>
// </div>

//
// <Card key={index}
//       color= {data.papersByTopic.length > colors.length ? "" : colors[index]}
//       style={{margin: '15px'}}
//       style={{margin: '15px', padding: "7px", flex: 1, height: '200px', width: "250px"}}
//       >
//   <Card.Content>
//     <Card.Header>
//       {card.title}
//     </Card.Header>
//     <Card.Meta>
//       {card.authors}
//     </Card.Meta>
//   </Card.Content>
//   <Card.Content extra style={{fontSize: '10px'}}>
//   </Card.Content>
// </Card>
//
