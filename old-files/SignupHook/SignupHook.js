import React from 'react'
import styles from './SignupHook.module.css'
import {Form, Button, Icon} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

function SignupHook(){
  return(
    <div>
      <h1>This is the signup hook</h1>
      <div className={styles.siblingWrapper}>
        <button className={styles.roleButton}><p className={styles.roleText}>Scientist</p></button>
        <button className={styles.roleButton}><p className={styles.roleText}>General User</p></button>
        <button className={styles.roleButton}><p className={styles.roleText}>Domain Expert</p></button>
      </div>
      <form>
          <div className={styles.siblingWrapper}>
            <input
              name='emailHook'
              placeholder='Enter your email to get started'
              className={styles.emailInput}
              />
              <Link>
                <Button icon>
                  <Icon name='angle right'/>
                </Button>
              </Link>
            </div>
      </form>
    </div>
  )
}

export default SignupHook
