import { Component } from "./Component"

interface ComponentConstructor {
  new (props: Props): Component
}

export type DOMNode = HTMLElement | SVGElement | Element | Text

export type DOMElementIdentifier =
  | "div"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "span"
  | "input"

export interface Props {
  [key: string]: any
}

export type Key = string | number

export type JSXChildren = JSX | JSX[]

export type JSXEmptyNode = boolean | null

export type JSXTextNode = string | number

interface JSXWithProps {
  key?: Key
  children: JSX | JSX[]
  props: Props
}

export interface JSXElementNode extends JSXWithProps {
  type: DOMElementIdentifier
}

export interface JSXStatelessComponent extends JSXWithProps {
  type: (props: Props) => JSX
}

export interface JSXComponent extends JSXWithProps {
  type: ComponentConstructor
}

export type JSX =
  | JSXEmptyNode
  | JSXTextNode
  | JSXElementNode
  | JSXStatelessComponent
  | JSXComponent

export interface VDOMEmptyNode {
  type: "empty"
}

export interface VDOMTextNode {
  type: "string"
  text: string | number
}

interface VDOMWithChildren {
  key?: Key
  props: Props
  children: JSX | JSX[]
  subNodes: VDOM | VDOM[]
}

export interface VDOMElementNode extends VDOMWithChildren {
  type: DOMElementIdentifier
}

export interface VDOMStatelessComponent extends VDOMWithChildren {
  type: (props: Props) => JSX
}

export interface VDOMComponent extends VDOMWithChildren {
  type: ComponentConstructor
  instance: Component
}

export type VDOM =
  | VDOMEmptyNode
  | VDOMTextNode
  | VDOMElementNode
  | VDOMStatelessComponent
  | VDOMComponent
