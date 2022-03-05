import React, { useState } from 'react';
import styles from './TableAndFigureViewer.module.css'
import TableViewer from '../TableViewer/TableViewer.js'
import FigureViewer from '../FigureViewer/FigureViewer.js'

function TableAndFigureViewer(props){
  const [figuresActive, setFiguresActive] = useState(true)

  return(
    <div className={styles.outerWrapper}>
      <div className={styles.toggleButtonRow}>
        <button className={styles.authButton}
          onClick={()=>setFiguresActive(true)}
          >
          <p className={styles.authButtonText}>Figures</p>
        </button>
        <button className={styles.authButton}
          onClick={()=>setFiguresActive(false)}
          >
          <p className={styles.authButtonText}>Tables</p>
        </button>
      </div>
      {figuresActive &&
        <FigureViewer
          paperMetadata={props.paperMetadata}
          />
      }
      {!figuresActive &&
        <TableViewer
          paperMetadata={props.paperMetadata}
          />
      }

    </div>
  )
}

export default TableAndFigureViewer
