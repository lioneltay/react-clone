import { Component } from "./Component"
import { map, evolve } from "ramda"

import {
  JSX,
  JSXChildren,
  VDOM,
  VDOMTextNode,
  JSXTextNode,
  JSXElementNode,
  JSXEmptyNode,
  VDOMEmptyNode,
  VDOMElementNode,
  VDOMStatelessComponent,
  VDOMComponent,
  JSXComponent,
  JSXStatelessComponent,
  Props,
  DOMNode,
} from "./types"

import {
  isJSXTextNode,
  isJSXEmptyNode,
  isJSXElementNode,
  isJSXStatelessComponent,
  isJSXComponent,
  isVDOMTextNode,
  isVDOMEmptyNode,
  isVDOMElementNode,
  isVDOMStatelessComponent,
  isVDOMComponent,
} from "./validation"

import { Children } from "./Children"

function initialiseVDOM(jsx: JSXEmptyNode): VDOMEmptyNode
function initialiseVDOM(jsx: JSXTextNode): VDOMTextNode
function initialiseVDOM(jsx: JSXElementNode): VDOMElementNode
function initialiseVDOM(jsx: JSXStatelessComponent): VDOMStatelessComponent
function initialiseVDOM(jsx: JSXComponent): VDOMComponent
function initialiseVDOM(jsx: JSX): VDOM
function initialiseVDOM(jsx: JSX): VDOM {
  if (isJSXTextNode(jsx)) {
    return {
      type: "string",
      text: jsx,
    }
  }

  if (isJSXEmptyNode(jsx)) {
    return {
      type: "empty",
    }
  }

  if (isJSXElementNode(jsx)) {
    return {
      ...jsx,
      subNodes: Children.map(jsx.children, initialiseVDOM),
    }
  }

  if (isJSXStatelessComponent(jsx)) {
    const props = { ...jsx.props, children: jsx.children }
    return {
      ...jsx,
      subNodes: initialiseVDOM(jsx.type(props)),
    }
  }

  if (isJSXComponent(jsx)) {
    const props = { ...jsx.props, children: jsx.children }
    const instance = new jsx.type(props)
    return {
      ...jsx,
      instance,
      subNodes: initialiseVDOM(instance.render()),
    }
  }

  throw Error("Invalid JSX")
}

const setAttribute = (name: string, value: any, element: Element): void => {
  if (name === "key") {
    return
  } else if (name === "className") {
    element.setAttribute("class", value)
  } else if (typeof value === "function" && name.startsWith("on")) {
    const eventType = name.slice(2).toLowerCase()
    element.__mrc_eventHandlers = element.__mrc_eventHandlers || {}
    element.removeEventListener(
      eventType,
      element.__mrc_eventHandlers[eventType]
    )
    element.__mrc_eventHandlers[eventType] = value
    element.addEventListener(eventType, value)
  }
}

const setAttributes = (props: Props, element: Element): void => {
  Object.keys(props).forEach(propName => {
    setAttribute(propName, props[propName], element)
  })
}

/** mutates vdom */
const createDOM = (vdom: VDOM): DOMNode => {
  if (isVDOMTextNode(vdom)) {
    const domNode = document.createTextNode(vdom.text.toString())
    vdom.domNode = domNode
    return domNode
  }

  if (isVDOMEmptyNode(vdom)) {
    return document.createTextNode("")
  }

  if (isVDOMElementNode(vdom)) {
    const domNode = document.createElement(vdom.type)
    vdom.domNode = domNode

    setAttributes(vdom.props, domNode)
    vdom.renderedChildren
      .map(createDOM)
      .forEach(child => domNode.appendChild(child))

    return domNode
  }

  if (isVDOMStatelessComponent(vdom)) {
    const domNode = createDOM(vdom.rendereredChildren)
    vdom.domNode = domNode
    return domNode
  }

  if (isVDOMComponent(vdom)) {
    const { instance } = vdom
    instance.vdomNode = vdom

    const domNode = createDOM(vdom.renderedChildren)
    vdom.domNode = domNode

    instance.componentDidMount()
    return domNode
  }

  throw Error("Invalid vdom")
}

export const render = (jsx, root) => {
  const vdom = initialiseVDOM(jsx)

  const dom = createDOM(vdom)

  root.appendChild(dom)
  return dom
}
