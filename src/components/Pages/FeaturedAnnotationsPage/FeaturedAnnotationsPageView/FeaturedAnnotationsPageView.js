import React, { useState, useEffect} from 'react';
import styles from './FeaturedAnnotationsPageView.module.css'
import './FeaturedAnnotationsPageView.css'
import { gql, useQuery, useLazyQuery } from '@apollo/client';
import _ from 'underscore';
import { useAuth0 } from '@auth0/auth0-react';
import { Dropdown } from 'semantic-ui-react';
import {titleize} from "utility/StringManipulation"

import FeaturedAnnotationsTemplate from '../FeaturedAnnotationsTemplate/FeaturedAnnotationsTemplate.js'
import Navbar from 'components/GlobalComponents/Navbar/Navbar.js'

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
    scores{
      scoreNumber
      field
      explanation
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

const sepiaPalette = [
  "#A89267",
  "#D7BAA0",
  "#E3DBD4",
  "#F0E0CD",
  "#FFF5E8"
]

function FeaturedAnnotationsPageView(){
  const { user, isAuthenticated } = useAuth0()
  const { data, error, loading } = useQuery(GET_ALL_ANNOTATIONS)
  const [getUserByUsername, {data: userData, error: userError, loading: userLoading}] = useLazyQuery(GET_USER_BY_USERNAME)
  const [annotationTopics, setAnnotationTopics] = useState([])
  const [sortedTopics, setSortedTopics] = useState([])
  const [userTopicInfo, setUserTopicInfo] = useState()
  const [userTopicInfoArray, setUserTopicInfoArray] = useState()
  const [activeTopic, setActiveTopic] = useState()
  const [topicDropdownOptions, setTopicDropdownOptions] = useState()

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
    else{
      setActiveTopic("Behavioural and Social Sciences")
    }
}, [isAuthenticated, userData])

//USER TOPIC STUFF
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

useEffect(()=>{
  // console.log("All annotations", data ? data.allAnnotations: undefined)
  // console.log('Annotation Data:', data.allAnnotations ? data.allAnnotations['2'].aiData.split(':')['2'].slice(0, -10) : "")
  if(data && activeTopic){
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

  // loads user topic preferences into state
  useEffect(()=>{
    console.log('This is the userData', userData ? userData.userByUsername.profile['0'].domains.split(',') : "")
    setUserTopicInfo(userData ? userData.userByUsername.profile['0'].domains.split(',') : "")
  }, [userData])

  useEffect(()=>{
    console.log("ACTIVE TOPIC", activeTopic)
    console.log("USER INFO TOPIC ARRAY", userTopicInfoArray)
    console.log("SORTED TOPICS", sortedTopics)
    console.log("ALL ANNOTATIONS", data)
    console.log("ANNOTATION TOPICS", annotationTopics)
    console.log("TOPIC DROPDOWN OPTIONS", topicDropdownOptions)
  }, [activeTopic, userTopicInfoArray, sortedTopics, data, annotationTopics, topicDropdownOptions])


  useEffect(()=>{
    let objArray = []
    if(annotationTopics.length !== 0){
      for(let i of Object.keys(sortedTopics[0]).sort()){
        if(i !== 'annotation'){
        let obj = {}
        obj["key"] = titleize(i)
        obj["value"] = titleize(i)
        obj["text"] = titleize(i)
        objArray.push(obj)
        }
      }
      setTopicDropdownOptions(objArray)
    }
  }, [annotationTopics])

  if(loading){
    return(
      <div>
    </div>
    )
  }

  if(sortedTopics){
    return(
      <div>
        <Navbar />
        <div className={styles.topDivider}/>
        <div className={styles.userSelectionWrapper}>
          <div className={styles.userSelectionTitleWrapper}>
            <h1 className={styles.userSelectionTitle}>Your Interests</h1>
            <div className={styles.userSelectionTitleUnderscore}/>
          </div>
          <div className={styles.buttonOuterGroup}>
            <div className={styles.buttonInnerGroup}>
              {userTopicInfoArray && userTopicInfoArray.map((topic, index)=>
                <button
                  className={styles.activeTopicButton}
                  onClick={()=>setActiveTopic(topic.value)}
                  >
                  <p className={styles.activeTopicButtonText}>{topic.value}</p>
                </button>
              )}
              {!userTopicInfoArray &&
                <h4>Please sign in to view personalised topics</h4>
              }
            </div>
          </div>
          <div className={styles.allTopicsWrapper}>
            <h1 className={styles.userSelectionTitle}>All Topics</h1>
            <div className={styles.userSelectionTitleUnderscore}/>
            <Dropdown
              selection
              options={topicDropdownOptions}
              onChange={(e, {value})=>setActiveTopic(value)}
              placeholder={activeTopic}
              />

          </div>
        </div>
        <div className={styles.annotationListFlexWrapper}>
          <div className={styles.annotationListWrapper}>
            {sortedTopics.map((topic, index)=>
            <div style={{margin: "15px"}}>
            <FeaturedAnnotationsTemplate
              topic={topic}
              index={index}
              activeTopic={activeTopic}
              options={topicDropdownOptions ? topicDropdownOptions : []}
              />
            </div>
            )}
          </div>
        </div>
      </div>
    )
  }
  else{
    console.log(error, userError)
  }
  return(
    <>
    <Navbar />
    </>
  )
}

export default FeaturedAnnotationsPageView


// TODO:
//
//
// Better page formatting
//
// Highlighting what the page actually does
// Better buttons
// Capping maximum number of loaded annotations
//
//
// Implemeneting search feature in navbar
//
// HomepageNavbar better buttons (look at what I was using before)
