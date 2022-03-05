import React from 'react'
import HomepageView from '../HomepageView/HomepageView.js'
import { useQuery, gql } from '@apollo/client'

const GET_ALL_TOPICS_AND_PAPERS = gql`
query AllTopicsAndPapers{
  allTopics{
    id
    header
    domain
    paperCount
    slug
    description
    image
    annotationCount
    scientistCount
    papers{
      id
      title
      authors
      citationMLA
      abstract
      annotationCount
      createdDate
      readingTime
    }
  }
  allPapers{
    id
    title
    authors
    citationMLA
    abstract
    annotationCount
    createdDate
    topic{
      header
      description
      image
    }
  }
}
`

function HomepageManager(){
  const { data, error, loading } = useQuery(GET_ALL_TOPICS_AND_PAPERS)

  React.useEffect(()=>{
    console.log('paper and topics', data)
  }, [data])

  // useEffect(()=>{
  //   console.log()
  // }, [data])

  if(loading){
    return(
      <div>
      </div>
    )
  }

  if(error){
    console.log('Homepage Manager Error', error)
    return(
      <div></div>
    )
  }

  if(data){
  return(
    <HomepageView
      topics={data.allTopics}
      papers={data.allPapers}
      />
  )
  }
}

export default HomepageManager
