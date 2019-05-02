import React, {useState} from 'react'
import { Tooltip } from 'reactstrap'

const FilePicker = (props) => {
    const [isTooltipOpen, toggleTooltip] = useState()
    
    const filePicked = () => {
        try {
            const input = document.getElementById(props.id || 'file-upload')
            let reader = new FileReader()
            reader.readAsText(input.files[0], 'ISO-8859-4')
            reader.onload = e => props.onPicked(e.target.result)
        } catch (err) { }
    }

    return <>
        <label id={`${props.id || 'file-upload'}-label`} className="custom-file-label btn btn-outline-primary btn-block px-5" htmlFor={props.id || 'file-upload'}>
            {props.text || 'Escolher arquivo'}
        </label>
        <Tooltip placement="bottom" isOpen={isTooltipOpen} target={`${props.id || 'file-upload'}-label`} toggle={() => toggleTooltip(!isTooltipOpen)}>
            {props.tooltip || 'Carregar arquivo do computador'}
        </Tooltip>
        <input id={props.id || 'file-upload'} type="file" className={`custom-file-input invisible ${props.className}`} onChange={() => filePicked()} accept={`.txt${props.accept || ''}`} />
    </>
}

export default FilePicker