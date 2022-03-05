import React from 'react';
import {Route, Routes, useRoutes} from 'react-router-dom'
import {gql, useQuery} from "@apollo/client"
import { Divider, Message } from 'semantic-ui-react'
import HomepageManager from '../HomepageManager/HomepageManager.js'
import PaperCards from '../PaperCards/PaperCards.js'
import RoleSelection from '../RoleSelection/RoleSelection.js'
import SignupView from '../SignupView/SignupView.js'
import PageManager from '../PageManager/PageManager.js'
import ProfilePage from '../ProfilePage/ProfilePage.js'
import NavbarHomepage from '../NavbarHomepage/NavbarHomepage.js'
// import PaperCardTemplate from '../PaperCardTemplate/PaperCardTemplate.js'
// import ScientistDomainPicker from '../ScientistDomainPicker/ScientistDomainPicker.js'
// import FeaturedAnnotations from '../FeaturedAnnotations/FeaturedAnnotations.js'
import HomepageUpdated from '../HomepageUpdated/HomepageUpdated.js'
import SkepsiIsBroken from '../SkepsiIsBroken/SkepsiIsBroken.js'
import HomepageFinal from '../HomepageFinal/HomepageFinal.js'

import AnnotationCardTemplate from '../AnnotationCardTemplate/AnnotationCardTemplate.js'
import SignupHook from '../SignupHook/SignupHook.js'
import PitchPage from '../PitchPage/PitchPage.js'
import FeaturedAnnotationsPage from '../FeaturedAnnotationsPage/FeaturedAnnotationsPage.js'

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

function Router() {
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
        <SkepsiIsBroken />
      </div>
    )
  }

    return (
        <Routes>
            {data && data.allTopics.map((topic) =>
                <Route key={topic.id} path={"/".concat(topic.slug)}
                      element = {<React.Fragment><PaperCards /></React.Fragment>}
                />
            )}

            {paperData && paperData.allPapers.map((paper) =>
                <Route key={paper.id} path={"/".concat(paper.id)} element={<PageManager />} />
            )}

            <Route path="/homepage-test" element={<HomepageFinal />}/>

            <Route path='/featured-annotations' element={<FeaturedAnnotationsPage />}/>

            <Route path="/playground" element={<SignupHook />}/>

            <Route path="/about" element={<PitchPage />}/>

            <Route path="/broken" element={<SkepsiIsBroken />}/>

            <Route path='/user-info' element={<React.Fragment><NavbarHomepage /><ProfilePage /></React.Fragment>}/>

            <Route path='/signup' element={<React.Fragment><NavbarHomepage /><RoleSelection /></React.Fragment>}/>

            <Route path='/scientist-signup'
                   element={<React.Fragment><NavbarHomepage /><SignupView/></React.Fragment>}/>

            <Route path='/user-signup'
                   element={<React.Fragment><NavbarHomepage /><SignupView/></React.Fragment>}/>

            <Route path='/expert-signup'
                   element={<React.Fragment><NavbarHomepage /><SignupView/></React.Fragment>}/>

            <Route path="/" element={<React.Fragment><HomepageManager /></React.Fragment>}/>
        </Routes>
    )
}

export default Router
