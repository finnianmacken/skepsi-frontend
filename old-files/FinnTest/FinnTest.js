import React, { useState } from 'react';
import ScoreAnnotationCards from '../ScoreAnnotationCards/ScoreAnnotationCards.js'
import AnnotationCardForm from '../AnnotationCardForm/AnnotationCardForm.js'
import { Divider, Button } from 'semantic-ui-react'

function FinnTest(){
  const [annotationFormOpen, setAnnotationFormOpen] = useState(false)

  return(
    <React.Fragment>
      <ScoreAnnotationCards />
      <Divider />
      <Button
        onClick={()=>setAnnotationFormOpen(true)}
        >Click me to open annotation</Button>
      {annotationFormOpen &&
        <AnnotationCardForm
        setAnnotationFormOpen={setAnnotationFormOpen}
        />
      }
      <Divider />
    </React.Fragment>

  )
}

export default FinnTest
