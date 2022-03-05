import React, { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client'
import { Loader, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import styles from './ProfilePageAnnotations.module.css'

const GET_ANNOTATIONS_BY_AUTHOR = gql`
  query GetAnnotationsByAuthor($username:String!){
    annotationsByAuthor(username:$username){
      content
      paper{
        title
        id
      }
      scores{
        field
        explanation
        scoreNumber
      }
    }
  }
`
function ProfilePageAnnotations(props){
  const { data, error, loading } = useQuery(GET_ANNOTATIONS_BY_AUTHOR, {
    variables: { "username": props.username}
  })

  useEffect(() => {
    console.log(data)
  }, [data])


  if(loading){
    return(
      <Loader />
    )
  }

  if(error){
    console.log(error)
    return(
      <div>
      </div>
    )
  }

  if(data){
  return(
    <div>
      <Card.Group centered>
      {data.annotationsByAuthor.map((annotation, index)=>
        <Card fluid key={index}>
          <Card.Content className={styles.cardContent}>
            <p className={styles.cardContentText}>{annotation.content}</p>
          </Card.Content>
          <Card.Content extra className={styles.cardContent}>
            <p className={styles.paperLinkText}>In <Link to={annotation.paper.id}><span className={styles.paperLink}>{annotation.paper.title}</span></Link></p>
          </Card.Content>
        </Card>
      )}
      </Card.Group>

    </div>
  )
}
}

export default ProfilePageAnnotations
