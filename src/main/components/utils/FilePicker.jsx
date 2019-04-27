import React from 'react'

const FilePicker = (props) => {
    const filePicked = () => {
        try {
            const input = document.getElementById(props.id || 'file-upload')
            let reader = new FileReader()
            reader.readAsText(input.files[0], 'UTF-8')
            reader.onload = e => props.onPicked(e.target.result)
        } catch (err) {}
    }

    return <>
        <label className="custom-file-label btn btn-outline-primary px-5" htmlFor={props.id || 'file-upload'}>
            {props.text || 'Escolher arquivo'}
        </label>
        <input id={props.id || 'file-upload'} type="file" className={`custom-file-input invisible ${props.className}`} onChange={() => filePicked()} accept={`.txt${props.accept || ''}`} />
    </>
}

export default FilePicker