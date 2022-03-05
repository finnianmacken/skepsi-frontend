import React, {useEffect, useRef, useState} from "react"
import {VscChevronLeft, VscChevronRight} from "react-icons/vsc"
import {IconContext} from "react-icons"
import Neck from "./neck.svg"
import Gears from "./gears.svg"

import styles from "./Tooltip.module.css"

export const KNOB_DRAG_HANDLE_CLASS = "KNOB_DRAG_HANDLE"

type TooltipType = {
    top: number | (() => number)
    options: [React.ReactElement, React.ReactElement][]
    onPrevious: () => void
    onNext: () => void
    activeResize: boolean
}

const Tooltip: React.FC<TooltipType> = (props) => {

    const [activeTransition, setActiveTransition] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (ref.current){
            const el = ref.current
            const cb = () => setActiveTransition(true)
            el.addEventListener("transitionstart", cb)
            return () => el.removeEventListener("transitionstart", cb)
        }
    }, [ref.current])

    const thumbnails = props.options.map(x => x[0])
    const components = props.options.map(x => x[1])

    const [featureComponentIndex, setFeatureComponentIndex] = useState(NaN)

    const makeClickCallback = (index: number) => () => {
        if (featureComponentIndex === index){
            setFeatureComponentIndex(NaN)
        } else {
            setFeatureComponentIndex(index)
        }
    }

    const minTop = 70

    // if we've been told to freeze, use the saved value, otherwise run the calculation and save the new value
    const [topPrev, setTopPrev] = useState(minTop)
    const getTop = () => {
        if (props.activeResize){
            return topPrev
        } else {
            const val = Math.max((typeof props.top === "function" ? props.top() : props.top) || minTop, minTop)
            if (val !== topPrev){
                setTopPrev(val)
            }
            return val
        }
    }

    return (
        <div className={styles.main}>
            <div
                className={styles.dynamicPosition}
                style={{height: 150, top: getTop()}}
                ref={ref}
                onTransitionEnd={() => setActiveTransition(false)}>
                <IconContext.Provider value={{color: "#E9E9E9"}}>
                    <div className={styles.knob}>
                        <div className={styles.knobNav} onClick={props.onPrevious}>
                            <VscChevronLeft />
                        </div>

                        <div className={styles.knobMain}>
                            <img className={styles.neck} src={Neck} alt={"nav icon"}/>

                            <div className={styles.neckOverlay}>

                                <div className={KNOB_DRAG_HANDLE_CLASS + " " + styles.knobBigButton}>
                                    <div className={styles.knobBigButtonInner}>
                                        {!props.activeResize &&
                                        <img src={Gears} className={activeTransition? styles.gearSpinning : ""} alt={"spinner"}/>}
                                    </div>
                                </div>

                                <div className={styles.knobMenuButtonsHairline}>
                                    <div className={styles.knobMenuButtons}>
                                        {thumbnails.map((thumbnail, i) => (
                                            <IconContext.Provider
                                                key={i}
                                                value={i === featureComponentIndex?
                                                    {color: "#656565", size: "22px"}:
                                                    {color: "#E9E9E9", size: "22px"}}>
                                                <div
                                                    className={
                                                        styles.knobMenuButtonEachContainer + " " +
                                                        (i === featureComponentIndex? styles.knobMenuActive : "")
                                                    }
                                                    key={i}
                                                    onClick={makeClickCallback(i)}>
                                                    {/*{i === featureComponentIndex && <div className={styles.knobMenuActiveInner}/>}*/}
                                                    <div className={styles.thumbnailContainer}>{thumbnail}</div>
                                                </div>
                                            </IconContext.Provider>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className={styles.knobNav} onClick={props.onNext}>
                            <VscChevronRight/>
                        </div>
                    </div>
                </IconContext.Provider>

                {!isNaN(featureComponentIndex) && components[featureComponentIndex] &&
                    <div className={styles.knobFeatureContainer}>
                        {components[featureComponentIndex]}
                    </div>}
            </div>
        </div>
    )
}

export default Tooltip
