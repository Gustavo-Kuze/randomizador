/* eslint-disable no-nested-ternary */
import React from 'react';

const setVisibilityOnC = (
  children,
  condition,
  hideElementClassName = false,
) => {
  const elem =
    React.Children.count(children) > 1
      ? React.Children.only(children[0])
      : React.Children.only(children);
  const elemProps = {
    ...elem.props,
    className: `${
      hideElementClassName && !condition ? '' : elem.props.className
    } ${condition ? '' : 'invisible d-none'}`,
    style: condition
      ? elem.props.style
      : { height: '0px !important', width: '0px !important' },
  };
  const elemClone = React.cloneElement(elem, elemProps);
  return elemClone;
};

export default props =>
  props.cssHide
    ? setVisibilityOnC(props.children, props.c, props.hideClassName)
    : props.c
    ? props.children
    : '';
