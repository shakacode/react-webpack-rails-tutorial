@module("./Comment.module.scss") external css: {..} = "default"

@react.component
let make = (~comment: Actions.Fetch.t, ~cssTransitionGroupClassNames) => {
  let rawMarkup = Marked.marked(comment.text, {gfm: true})
  let innerHTML = { "__html": rawMarkup }
  let nodeRef = React.useRef(Js.Nullable.null)
  
  // The 500 must correspond to the 0.5s in:
  //   ../../RescriptPage.module.scss:9
  <CSSAnimation.CSSTransition
    key={"component_" ++ Belt.Int.toString(comment.id) }
    timeout={500}
    nodeRef={nodeRef}
    classNames=cssTransitionGroupClassNames
  >
    <div className=css["comment"] ref={ReactDOM.Ref.domRef(nodeRef)}>
      <h2 className=css["commentAuthor"] > {comment.author->React.string} </h2>
      <span dangerouslySetInnerHTML=innerHTML />
    </div>
  </CSSAnimation.CSSTransition>
  
}
