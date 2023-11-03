@module("../../ReScriptShow.module.scss") external css: {..} = "default"

@react.component
let make = (~errorMsg: string) => {
  let nodeRef = React.useRef(Js.Nullable.null)

  let cssTransitionGroupClassNames: ReactTransitionGroup.CSSTransition.t = {
    enter: css["elementEnter"],
    enterActive: css["elementEnterActive"],
    exit: css["elementLeave"],
    exitActive: css["elementLeaveActive"],
  }

  // The 500 must correspond to the 0.5s in:
  //   ../../RescriptShow.module.scss:9
  <ReactTransitionGroup.CSSTransition
    key="commentFetchError"
    nodeRef={nodeRef}
    timeout={500}
    classNames={cssTransitionGroupClassNames}>
    <div
      className="bg-pink-100 p-4 mb-4 border border-pink-200 rounded text-red-800 prose-strong:text-red-800 prose-ul:my-1">
      <strong> {errorMsg->React.string} </strong>
    </div>
  </ReactTransitionGroup.CSSTransition>
}
