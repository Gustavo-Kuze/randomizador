import React from 'react'
import Header from './Header'

const Template = props => {
    return <>
        <Header />
        <main className="mt-5 pt-5">
            {props.children}
        </main>
    </>
}

export default Template
