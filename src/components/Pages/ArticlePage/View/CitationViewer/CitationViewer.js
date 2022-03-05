import React, {useEffect, useRef, useState} from 'react';
import {Dropdown, Icon} from 'semantic-ui-react';
import styles from './CitationViewer.module.css'

const dropdownOptions = [
    {
        key: 'APA',
        value: 'APA',
        text: 'APA'
    },
    {
        key: 'MLA',
        value: 'MLA',
        text: 'MLA',
    },
    {
        key: 'Chicago',
        value: 'Chicago',
        text: 'Chicago',
    },
]

function CitationViewer(props) {
    const [activeCitation, setActiveCitation] = useState("APA")
    const citationTextRef = useRef()

    // DEBUG:
    // useEffect(()=>{
    //   console.log('CITATION VIEWER PROPS', props)
    // }, [props])


    function handleChange(data) {
        setActiveCitation(data.target.innerText)
    }

    function switchCitation(parameter) {
        switch (parameter) {
            case 'APA':
                return props.paperMetadata ? props.paperMetadata.citationAPA : "";
            case 'MLA':
                return props.paperMetadata ? props.paperMetadata.citationMLA : "";
            case "Chicago":
                return props.paperMetadata ? props.paperMetadata.citationChicago : "";
            default:
                return "This case is not accepted";
        }

    }

    useEffect(() => {
        console.log('ACTIVE CITATION', activeCitation)
    }, [activeCitation])

    return (
        <div className={styles.citationWrapper}>
            <Dropdown
                item
                options={dropdownOptions}
                selection
                defaultValue="APA"
                onChange={handleChange}
            />
            <div className={styles.citationToolbar}>
                <div className={styles.toolbarFlex}/>
                <div className={styles.copyButtonWrapper}
                     onClick={() => navigator.clipboard.writeText(citationTextRef.current.innerText)}
                >
                    <Icon bordered fitted name="linkify" color="white" style={{pointerEvents: 'none'}}/>
                </div>
            </div>
            <div className={styles.citationBox}>
                <p ref={citationTextRef}>{switchCitation(activeCitation)}</p>
            </div>
        </div>
    )
}

export default CitationViewer
