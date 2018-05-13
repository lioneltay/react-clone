import { Component } from "./Component"
import * as R from "ramda"
import {
  JSX,
  JSXTextNode,
  JSXEmptyNode,
  JSXElementNode,
  VDOMTextNode,
  JSXStatelessComponent,
  JSXComponent,
  DOMElementIdentifier,
  VDOMEmptyNode,
  VDOM,
  VDOMElementNode,
  VDOMStatelessComponent,
  VDOMComponent,
} from "./types"

export const isDOMElementIdentifier = (
  identifier: string
): identifier is DOMElementIdentifier =>
  R.contains(identifier, [
    "div",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "span",
    "input",
  ])

export const isJSXTextNode = (jsx: JSX): jsx is JSXTextNode =>
  R.contains(typeof jsx, ["string", "number"])

export const isJSXEmptyNode = (jsx: JSX): jsx is JSXEmptyNode =>
  typeof jsx === "boolean" || jsx === null

export const isJSXElementNode = (jsx: JSX): jsx is JSXElementNode =>
  typeof jsx === "object" && jsx !== null && typeof jsx.type === "string"

export const isJSXStatelessComponent = (
  jsx: JSX
): jsx is JSXStatelessComponent =>
  typeof jsx === "object" &&
  jsx !== null &&
  typeof jsx.type === "function" &&
  !isJSXComponent(jsx)

export const isJSXComponent = (jsx: JSX): jsx is JSXComponent =>
  typeof jsx === "object" && jsx !== null && Component.isPrototypeOf(jsx.type)

export const isVDOMTextNode = (vdom: VDOM): vdom is VDOMTextNode =>
  typeof vdom === "object" && vdom !== null && vdom.type === "string"

export const isVDOMEmptyNode = (vdom: VDOM): vdom is VDOMEmptyNode =>
  typeof vdom === "object" && vdom.type === "ewnmpty"

export const isVDOMElementNode = (vdom: VDOM): vdom is VDOMElementNode =>
  typeof vdom === "object" &&
  typeof vdom.type === "string" &&
  vdom.type !== "string"

export const isVDOMComponent = (vdom: VDOM): vdom is VDOMComponent =>
  typeof vdom === "object" && Component.isPrototypeOf(vdom.type)

export const isVDOMStatelessComponent = (
  vdom: VDOM
): vdom is VDOMStatelessComponent =>
  typeof vdom === "object" &&
  typeof vdom.type === "function" &&
  !isVDOMComponent(vdom)
