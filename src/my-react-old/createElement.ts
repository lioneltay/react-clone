/** @jsx createElement */
import { JSX } from "./types"

export const createElement = (
  type: any,
  _props: any,
  ...children: any[]
): JSX => {
  const props = _props || {}

  delete props.__source
  delete props.__self
  const key = props.key
  delete props.key
  return { type, key, props, children }
}
