import React from 'react'

const setVisibilityOnC = (children, condition, hideElementClassName = false) => {
    let elem = React.Children.count(children) > 1 ? React.Children.only(children[0]) : React.Children.only(children)
    let elemProps = {
        ...elem.props,
        className: `${hideElementClassName && !condition ? '' : elem.props.className} ${condition ? '' : 'invisible d-none'}`,
        style: condition ? elem.props.style : { height: '0px !important', width: '0px !important' }
    }
    let elemClone = React.cloneElement(elem, elemProps)
    return elemClone
}

export default props => props.cssHide ? setVisibilityOnC(props.children, props.c, props.hideClassName) : props.c ? props.children : ''