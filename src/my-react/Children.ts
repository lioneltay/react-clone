import { JSXChildren, JSX } from "./types"

export const Children = {
  map: <T, U>(children: T | T[], fn: (el: T) => U) => {
    return Array.isArray(children) ? children.map(fn) : fn(children)
  },
  toArray: <T>(children: T | T[]) => {
    return Array.isArray(children) ? children : [children]
  },
}
