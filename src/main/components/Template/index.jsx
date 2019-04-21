import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Template = props => {
    return <>
        <Header />
        <main className="mt-5 pt-5 pb-5 mb-5">
            {props.children}
        </main>
        <Footer />
    </>
}

export default Template
