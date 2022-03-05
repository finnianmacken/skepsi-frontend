import React from 'react'
import styles from './NavbarHomepage.module.css'

// import LoginButton from "../LoginButton/LoginButton.js"
// import LogoutButton from "../LogoutButton/LogoutButton.js"
// import SignupButton from "../SignupButton/SignupButton.js"
import PaperSearch from '../PaperSearch/PaperSearch.js'

// import {Button, Icon, Popup} from "semantic-ui-react"
import {Link} from 'react-router-dom'

import {useAuth0} from "@auth0/auth0-react"
import {gql, useQuery} from '@apollo/client'


const ALL_PAPERS = gql`
    query AllPapers{
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

function NavbarHomepage() {
    const {data} = useQuery(ALL_PAPERS)
    const {isAuthenticated, loginWithRedirect} = useAuth0()

    return (
        <div>
            <div className={styles.whitespaceNavbar}>
                <div className={styles.leftNavbar}>
                    <Link to="/">
                        <div className={styles.skepsiWrapper}>
                            <h1 className={styles.skepsiText}>Skepsi</h1>
                        </div>
                    </Link>
                    <Link to="">
                        <div className={styles.featuredAnnotationsWrapper}>
                            {/*<Popup
                style={{boxShadow: "none"}}
                size='small'
                trigger={
              <Link to='/featured-annotations'>
                <Icon name='fire' size='big' style={{color: 'gray'}}/>
              </Link>
              }>
              <h4 className={styles.popupText}>Featured Annotations</h4>
              </Popup>
              */}
                        </div>
                    </Link>
                    {/*<div className={styles.featuredAnnotationsWrapper}>
            <Icon name='search' size='big' color='gray'/>
          </div>
          */}
                </div>
                <div className={styles.navbarFlex}>
                    <PaperSearch
                        papers={data ? data.allPapers : []}
                    />
                </div>
                <div className={styles.rightNavbar}>
                    {isAuthenticated &&
                    <>
                        <div className={styles.rightNavbarButtonWrapper}>
                            <Link to='/featured-annotations'>
                                <button className={styles.authButton} id={styles.pitchButton}>
                                    <p className={styles.authButtonText}>Featured Comments</p>
                                </button>
                            </Link>
                            <Link to="/user-info">
                                <button className={styles.authButton} id={styles.profileButton}>
                                    <p className={styles.authButtonText}>Profile</p>
                                </button>
                            </Link>
                        </div>
                    </>
                    }
                    {!isAuthenticated &&
                    <>
                        <div className={styles.rightNavbarButtonWrapper}>
                            <Link to='/featured-annotations'>
                                <button className={styles.authButton} id={styles.pitchButton}>
                                    <p className={styles.authButtonText}>Featured Comments</p>
                                </button>
                            </Link>
                        </div>
                        <div>
                            <Link to='/signup'>
                                <button className={styles.authButton} id={styles.signupButton}>
                                    <p className={styles.authButtonText}>Sign Up</p>
                                </button>
                            </Link>
                        </div>
                        <div>
                            <button
                                className={styles.authButton}
                                id={styles.loginButton}
                                onClick={() => loginWithRedirect()}>
                                <p className={styles.authButtonText}>Log In</p>
                            </button>
                        </div>
                    </>
                    }
                </div>
            </div>

        </div>)
}

export default NavbarHomepage;
