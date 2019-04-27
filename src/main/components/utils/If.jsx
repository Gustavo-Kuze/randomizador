import React from 'react'

const logAndReturnChildren = (children, condition) => {
    let elem = React.Children.only(children) > 1 ? React.Children.only(children[0]) : React.Children.only(children)
    let elemProps = { ...elem.props, className: `${elem.props.className} ${condition ? '' : 'invisible'}` }
    let elemClone = React.cloneElement(elem, elemProps)
    return elemClone
}

export default props => props.cssHide ? logAndReturnChildren(props.children, props.c) : props.c ? props.children : ''