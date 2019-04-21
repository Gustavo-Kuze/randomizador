import React, { useState, useEffect } from 'react'
import { Input as ReactstrapInput } from 'reactstrap'

const Input = props => {
    const [inputValue, setInputValue] = useState()
    const [isValid, setValid] = useState(false)
    const [isInputDirty, setInputDirty] = useState(false)

    useEffect(() => {
        if (isInputDirty) {
            setValid(props.isInputValid)
        } else {
            setValid(undefined)
        }
    })

    return <>
        <ReactstrapInput
            {...props}
            className="text-center bg-light"
            type={props.type || "number"}
            invalid={!props.isInputValid}
            valid={props.isInputValid}
            onKeyUp={e => {
                setInputDirty(true)
                if(props.onKeyUp) props.onKeyUp()
            }}
            onChange={(e) => {
                setInputValue(e.target.value)
                if (props.onChange) props.onChange(inputValue)
            }}
        />

    </>
}

export default Input