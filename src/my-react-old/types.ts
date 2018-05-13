import { Component } from "./Component"

interface Props {
  [key: string]: any
}

export type JSXChildren = JSX | JSX[]

export interface JSX {
  type: any
  key?: string | number
  props?: Props
  children?: JSXChildren
}

export interface VDOMTextNode {
  type: "string"
  text: string
}

type DOMElementIdentifier =
  | "div"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "span"
  | "input"

export interface VDOMElement {
  type: DOMElementIdentifier
  children: JSX | JSX[]
  renderedChildren: VDOMNode | VDOMNode[]
}

export interface VDOMStatelessComponent {
  type: (props: Props) => JSX
  children: JSX | JSX[]
  renderedChildren: VDOMNode | VDOMNode[]
}

export type VDOMNode =
  | VDOMTextNode
  | VDOMElement
  | VDOMStatelessComponent
  | Component
