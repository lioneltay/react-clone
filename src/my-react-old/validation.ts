import { Component } from "./Component"

export const isTextualJSX = jsx => ["string", "number"].includes(typeof jsx)
export const isTextualVDOM = vdom =>
  typeof vdom === "object" && vdom.type === "string"

export const isElementJSX = jsx =>
  typeof jsx === "object" &&
  typeof jsx.type === "string" &&
  jsx.type !== "string"
export const isElementVDOM = vdom =>
  typeof vdom === "object" &&
  typeof vdom.type === "string" &&
  vdom.type !== "string"

export const isEmptyVDOM = vdom => typeof vdom === "boolean" || vdom === null

export const isClassVDOM = vdom =>
  typeof vdom === "object" && Component.isPrototypeOf(vdom.type)

export const isFunctionVDOM = vdom =>
  typeof vdom === "object" &&
  typeof vdom.type === "function" &&
  !isClassVDOM(vdom)
