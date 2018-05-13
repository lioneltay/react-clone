import {
  isTextualJSX,
  isTextualVDOM,
  isElementVDOM,
  isElementJSX,
  isClassVDOM,
  isEmptyVDOM,
  isFunctionVDOM,
} from "../validation"

const patch = (jsx, vdom) => {
  if (isTextualJSX(jsx)) {
    if (isTextualVDOM(vdom) && jsx === vdom.text) {
      return vdom
    }

    return {
      type: "string",
      text: jsx,
    }
  }

  if (isElementJSX(jsx)) {
    if (!isElementVDOM(vdom)) {
      // full render
    }

    if (isElementVDOM(vdom)) {
    }
  }
  //
  console.log("@@ patch")
}

export class Component {
  constructor(props) {
    if (typeof props !== "object") {
      throw Error("Make sure you call super(props) in constructor")
    }

    // console.log("constructor", props)
    // Component
  }

  static patch = instance => {
    const vdom = instance.vdomNode
    const dom = vdom.domNode
    console.log(vdom)
    console.log(dom)

    patch(instance.render(), vdom)
  }

  setState = (updater, callback) => {
    const nextState =
      typeof updater === "function" ? updater(this.state) : updater

    this.state = { ...this.state, ...nextState }

    Component.patch(this)

    // console.log("settingState", nextState)

    callback && callback()
  }

  componentDidMount() {
    return null
  }

  shouldComponentUpdate() {
    return true
  }
}
