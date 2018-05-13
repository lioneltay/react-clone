import { JSXChildren, JSX } from "./types"

export const Children = {
  map: (children: JSXChildren, fn: (el: JSX) => JSX) => {
    return Array.isArray(children) ? children.map(fn) : fn(children)
  },
  toArray: (children: JSXChildren) => {
    return Array.isArray(children) ? children : [children]
  },
}
