import React, { useState, useEffect } from 'react';
import { gql, useQuery, useLazyQuery } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import _ from 'underscore'
import styles from './FeaturedAnnotations.module.css'
import { Card, Dropdown } from 'semantic-ui-react'

const GET_ALL_ANNOTATIONS = gql`
query AllAnnotations {
  allAnnotations {
    id
    author {
      username
    }
    content
    aiData
    paper {
      id
      title
    }
  }
}
`

const GET_USER_BY_USERNAME = gql`
query GetUserByUsername($username: String!) {
  userByUsername(username: $username) {
    id
    profile {
      domains
    }
  }
}
`

function FeaturedAnnotations(){
  const { user, isAuthenticated } = useAuth0()
  const { data, error, loading } = useQuery(GET_ALL_ANNOTATIONS)
  const [getUserByUsername,
      {data: userData,
      error: userError,
      loading: userLoading}] = useLazyQuery(GET_USER_BY_USERNAME)
  const [annotationTopics, setAnnotationTopics] = useState()
  const [sortedTopics, setSortedTopics] = useState()
  const [userTopicInfo, setUserTopicInfo] = useState()
  const [userTopicInfoArray, setUserTopicInfoArray] = useState()
  const [activeTopic, setActiveTopic] = useState()

  // instigates the network request when the authentication check comes back.
  // ensures that the backend request has the info from auth0 it needs before it fires
  useEffect(()=>{
    if(isAuthenticated){
      getUserByUsername({variables: {
        username: user["http://www.skepsi.com/username"]
      }})
    }
    if(userData){
      setActiveTopic(userData.userByUsername.profile['0'].domains.split(',')['0'])
    }
}, [isAuthenticated, userData])

  // loads user topic preferences into state
  useEffect(()=>{
    console.log('This is the userData', userData ? userData.userByUsername.profile['0'].domains.split(',') : "")
    setUserTopicInfo(userData ? userData.userByUsername.profile['0'].domains.split(',') : "")
  }, [userData])

  // converts userTopicInfo into an array for use in the dropdown
  useEffect(()=>{
    if(userTopicInfo){
    let objArray = []
    for(let i of userTopicInfo){
      let obj = {}
      obj["key"] = i
      obj["value"] = i
      obj["text"] = i
      objArray.push(obj)
    }
    setUserTopicInfoArray(objArray)
    }
  }, [userTopicInfo])

  // converts annotation string from server into arrays that we can work with
  useEffect(()=>{
    // console.log("All annotations", data ? data.allAnnotations: undefined)
    // console.log('Annotation Data:', data.allAnnotations ? data.allAnnotations['2'].aiData.split(':')['2'].slice(0, -10) : "")
    if(data  && activeTopic){
      var annotationTopicArray = []
      for(let annotation of data.allAnnotations){
        let annotationTopics = JSON.parse(annotation.aiData ? annotation.aiData.split(':')['2'].slice(0, -10).replace(/'/g, '"') : "{}");
        let annotationScores = JSON.parse(annotation.aiData ? annotation.aiData.split(":")['3'].slice(0, -1) : "{}")
        let annotationAIData = _.object(annotationTopics, annotationScores)
        annotationAIData['annotation'] = annotation
        annotationTopicArray.push(annotationAIData)
      }
      setAnnotationTopics(annotationTopicArray)
      setSortedTopics(annotationTopicArray.sort((a, b) => (a[activeTopic.toLowerCase()] > b[activeTopic.toLowerCase()]) ? -1 : 1))
    }
  }, [data, activeTopic])

  // debugging loggs
  useEffect(()=>{
    console.log("Active User", user)
    console.log("USERTOPICINFOARRAY", userTopicInfoArray)
    console.log("ACTIVE TOPIC", activeTopic)
  }, [user, userTopicInfoArray, activeTopic])

  // debugging logs
  useEffect(()=>{
    if(sortedTopics && userTopicInfo){
      console.log('SORTED TOPICS', sortedTopics)
      console.log("HI", userTopicInfo.map((topic) => Object.create({"key": topic, "value": topic, "text": topic})))
    }
  }, [sortedTopics, userTopicInfo])

  if(loading){
    console.log("Loading or Error!", loading)
    return(
      <div>

      </div>
    )
  }

  if(sortedTopics && userTopicInfoArray){
    return(
      <div>
        <Dropdown
          selection
          options={userTopicInfoArray}
          onChange={(e, {value}) => setActiveTopic(value)}
          defaultValue={userTopicInfoArray['0'].value}
          />
            {sortedTopics.map((topic, index)=>
              <Card key={index} style={{margin: "10px", height: "200px", width: '250px', overflowY: 'scroll'}}>
                <div className={styles.cardContent}>
                  <p className={styles.cardContentText}>{topic.annotation.content}</p>
                </div>
                <div className={styles.cardContent}>
                  <p className={styles.paperLinkText}>[{activeTopic}]: {topic[activeTopic.toLowerCase()]}</p>
                </div>
              </Card>

            )}


      </div>
    )
  }

  return(
    <div></div>
  )
}

export default FeaturedAnnotations

//
//
// <Card key={index} style={{width:" 200px", height: "250px", margin: "30px"}}>
//   <Card.Header>
//     {topic.annotation.author.username}
//   </Card.Header>
//   <Card.Content>
//     {topic.annotation.content}
//   </Card.Content>
//   <Card.Content extra>
//     {topic[activeTopic.toLowerCase()]}
//   </Card.Content>
// </Card>
