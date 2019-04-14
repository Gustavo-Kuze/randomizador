import React from 'react'
import Header from './Header'

const Template = props => {
    return <>
        <Header />
        <main>
            {props.children}
        </main>
    </>
}

export default Template
