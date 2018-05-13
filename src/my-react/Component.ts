import { Props, JSX } from "./types"

export abstract class Component {
  abstract render(): JSX

  constructor(props: Props) {
    if (typeof props !== "object") {
      throw Error("Make sure you call super(props) in constructor")
    }
  }

  // setState = (updater, callback) => {
  //   const nextState =
  //     typeof updater === "function" ? updater(this.state) : updater

  //   this.state = { ...this.state, ...nextState }

  //   Component.patch(this)

  //   // console.log("settingState", nextState)

  //   callback && callback()
  // }

  componentDidMount() {
    return null
  }

  shouldComponentUpdate() {
    return true
  }
}
