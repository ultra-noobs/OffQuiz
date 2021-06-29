import React from "react"
import "./Question.scss"
import {Divider} from 'semantic-ui-react'


const Question = (props) => {

    const renderOptions = () => props.options.map((element,key)=>
        <div className="options">
             {String.fromCharCode(key+65)}. {element}
          </div>
      )

    return (
        <div>
            <div className="question">
                Q{props.index}) {props.question}
            </div>
            {renderOptions()}
            <Divider/>
        </div>
    )
}

export default Question;