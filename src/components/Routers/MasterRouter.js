import React from 'react';
import {Route, Routes, useRoutes} from 'react-router-dom'
import {gql, useQuery} from "@apollo/client"
import { Divider, Message } from 'semantic-ui-react'

// Pages
import HomepageManager from 'components/Pages/Homepage/HomepageManager/HomepageManager.js'
import ErrorPageView from 'components/Pages/ErrorPage/ErrorPageView/ErrorPageView.js'
import ArticlePageManager from 'components/Pages/ArticlePage/ArticlePageManager/ArticlePageManager.js'
import FeaturedAnnotationsPageView from 'components/Pages/FeaturedAnnotationsPage/FeaturedAnnotationsPageView/FeaturedAnnotationsPageView.js'



// import PaperCards from 'components/Pages/Homepage/PaperCards/PaperCards.js'
import RoleSelection from '../RoleSelection/RoleSelection.js'
import SignupView from '../SignupView/SignupView.js'
import ProfilePage from '../ProfilePage/ProfilePage.js'
import Navbar from 'components/GlobalComponents/Navbar/Navbar.js'
// import PaperCardTemplate from '../PaperCardTemplate/PaperCardTemplate.js'
// import ScientistDomainPicker from '../ScientistDomainPicker/ScientistDomainPicker.js'
// import FeaturedAnnotations from '../FeaturedAnnotations/FeaturedAnnotations.js'

import AnnotationCardTemplate from '../AnnotationCardTemplate/AnnotationCardTemplate.js'
import SignupHook from '../SignupHook/SignupHook.js'

const GET_ALL_TOPIC_SLUGS = gql`
    query{
        allTopics{
            slug
            id
        }
    }
`

const GET_ALL_PAPERS = gql`
    query{
        allPapers{
            id
        }
    }
`

function MasterRouter() {
    const {data, loading, error} = useQuery(GET_ALL_TOPIC_SLUGS)
    const {data: paperData, loading: paperLoading, error: paperError} = useQuery(GET_ALL_PAPERS)

  if(paperLoading || loading){
    console.log("Loading")
    return(
      <div>
      </div>
    )
  }

  if(error || paperError){
    console.log(error)
    console.log(paperError)
    return(
      <div>
        <ErrorPageView />
      </div>
    )
  }

    return (
        <Routes>

            {paperData && paperData.allPapers.map((paper) =>
                <Route key={paper.id} path={"/".concat(paper.id)} element={<ArticlePageManager />} />
            )}

            <Route path="/homepage-test" element={<HomepageManager />}/>

            <Route path='/featured-annotations' element={<FeaturedAnnotationsPageView />}/>

            <Route path="/playground" element={<SignupHook />}/>

            <Route path="/broken" element={<ErrorPageView />}/>

            <Route path='/user-info' element={<React.Fragment><Navbar /><ProfilePage /></React.Fragment>}/>

            <Route path='/signup' element={<React.Fragment><Navbar /><RoleSelection /></React.Fragment>}/>

            <Route path='/scientist-signup'
                   element={<React.Fragment><Navbar /><SignupView/></React.Fragment>}/>

            <Route path='/user-signup'
                   element={<React.Fragment><Navbar /><SignupView/></React.Fragment>}/>

            <Route path='/expert-signup'
                   element={<React.Fragment><Navbar /><SignupView/></React.Fragment>}/>

            <Route path="/" element={<React.Fragment><HomepageManager /></React.Fragment>}/>
        </Routes>
    )
}

export default MasterRouter
