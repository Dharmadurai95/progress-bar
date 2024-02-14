/* eslint-disable react/prop-types */

import { useState, useRef, useEffect } from "react"

const CheckOut = ({ stepConfig = [] }) => {
    const [currentStep, setCurrentStep] = useState(1)
    const [isCompleted, setIsCompleted] = useState(false);
    const [margin,setMargin] = useState({
        marginLeft:0,
        marginRight:0
    })
    const stepRef = useRef([]);
    console.log(stepRef, 'refff')
    const ActiveComponent = stepConfig[currentStep - 1]?.Component;

    function handleNextClick() {
        setCurrentStep((prev) => {
            if (prev !== stepConfig.length) {
                return prev + 1
            } else {
                setIsCompleted(true)
                return prev
            }
        })
    }
    function calculateWidth() {
        return ((currentStep - 1) / (stepConfig.length - 1)) * 100
    }

    useEffect(() => {
        if(stepRef.current){

            setMargin({
              marginLeft:stepRef.current[0].offsetWidth/2,
              marginRight:stepRef.current[stepConfig.length-1].offsetWidth/2
            })
        }
    }, [stepRef,stepConfig])
    
    return (<>
        <div className="stepper">
            {stepConfig.map((item, index) => {
                return (<div key={item.name}
                    ref={(e) => (stepRef.current[index] = e)}
                    className={`step ${isCompleted || currentStep > index + 1 ? 'complete' : ''} ${!isCompleted && currentStep == index + 1 ? "active" : ''}`}>
                    <div className="step-number">{isCompleted || currentStep > index + 1 ? <span>&#10003;</span> : index + 1}</div>
                    <div className="step-name">{item.name}</div>
                </div>)
            })}
            <div className="progress-bar" style={{
                width:`calc(100% - ${margin.marginLeft+margin.marginRight}px)`,
                marginLeft:margin.marginLeft,
                marginRight:margin.marginRight
            }}>
                <div className="progress" style={{ width: `${calculateWidth()}%` }}></div>
            </div>
        </div>
        {ActiveComponent}
        {!isCompleted && <button className="btn" onClick={handleNextClick}>{currentStep === stepConfig.length ? 'Finish' : "Next"}</button>}
    </>
    )
}


export default CheckOut