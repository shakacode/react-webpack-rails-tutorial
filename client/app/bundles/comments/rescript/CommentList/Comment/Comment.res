@react.component
let make = (~comment: Actions.Fetch.t, ~cssTransitionGroupClassNames) => {
  let rawMarkup = Marked.marked(comment.text, {gfm: true})
  let innerHTML = {"__html": rawMarkup}
  let nodeRef = React.useRef(Js.Nullable.null)

  // The 500 must correspond to the 0.5s in:
  //   ../../RescriptShow.module.scss:9
  <ReactTransitionGroup.CSSTransition
    key={"component_" ++ Int.toString(comment.id)}
    timeout={500}
    nodeRef={nodeRef}
    classNames=cssTransitionGroupClassNames>
    <div ref={ReactDOM.Ref.domRef(nodeRef)}>
      <h2 className="js-comment-author text-blue-800"> {comment.author->React.string} </h2>
      <span dangerouslySetInnerHTML=innerHTML className="js-comment-text" />
    </div>
  </ReactTransitionGroup.CSSTransition>
}
