import { JSX, JSXChildren, VDOMNode } from "./types"

import {
  isTextualJSX,
  isTextualVDOM,
  isEmptyVDOM,
  isElementVDOM,
  isFunctionVDOM,
  isClassVDOM,
} from "./validation"
import { Children } from "./Children"

const initialiseVDOM = (jsx: JSX): VDOMNode => {
  if (isTextualJSX(jsx)) {
    return {
      type: "string",
      text: jsx,
    }
  }

  if (isEmptyVDOM(jsx)) {
    return jsx
  }

  if (isElementVDOM(jsx)) {
    return {
      ...jsx,
      renderedChildren: Children.map(jsx.children, initialiseVDOM),
    }
  }

  if (isFunctionVDOM(jsx)) {
    const props = { ...jsx.props, children: jsx.children }
    return {
      ...jsx,
      renderedChildren: initialiseVDOM(jsx.type(props)),
    }
  }

  if (isClassVDOM(jsx)) {
    const props = { ...jsx.props, children: jsx.children }
    const instance = new jsx.type(props)
    return {
      ...jsx,
      instance,
      renderedChildren: initialiseVDOM(instance.render()),
    }
  }

  throw Error("Invalid JSX")
}

const setAttribute = (name, value, element) => {
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

const setAttributes = (props, element) => {
  Object.keys(props).forEach(propName => {
    setAttribute(propName, props[propName], element)
  })
}

/** mutates vdom */
const createDOM = vdom => {
  if (isTextualVDOM(vdom)) {
    const domNode = document.createTextNode(vdom.text)
    vdom.domNode = domNode
    return domNode
  }

  if (isEmptyVDOM(vdom)) {
    return document.createTextNode("")
  }

  if (isElementVDOM(vdom)) {
    const domNode = document.createElement(vdom.type)
    vdom.domNode = domNode

    setAttributes(vdom.props, domNode)
    vdom.renderedChildren
      .map(createDOM)
      .forEach(child => domNode.appendChild(child))

    return domNode
  }

  if (isFunctionVDOM(vdom)) {
    const domNode = createDOM(vdom.rendereredChildren)
    vdom.domNode = domNode
    return domNode
  }

  if (isClassVDOM(vdom)) {
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
