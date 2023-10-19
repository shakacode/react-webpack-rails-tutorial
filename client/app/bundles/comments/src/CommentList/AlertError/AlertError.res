@react.component
let make = (~cssTransitionGroupClassNames: CSSAnimation.CSSTransition.t, ~error: Types.error) => {
  let nodeRef = React.useRef(Js.Nullable.null)

  switch error {
  | FailedToSaveComment => 
    // The 500 must correspond to the 0.5s in:
    //   ../../RescriptShow.module.scss:9
    <CSSAnimation.CSSTransition
      key="commentFetchError"
      nodeRef={nodeRef}
      timeout={500}
      classNames={cssTransitionGroupClassNames}
    >
      <div className="bg-pink-100 p-4 mb-4 border border-pink-200 rounded text-red-800 prose-strong:text-red-800 prose-ul:my-1">
        <strong>{"Your comment was not saved!"->React.string}</strong>
      </div>
    </CSSAnimation.CSSTransition>
  | FailedToFetchComments =>
    // The 500 must correspond to the 0.5s in:
    //   ../../RescriptShow.module.scss:9
    <CSSAnimation.CSSTransition
      key="commentFetchError"
      nodeRef={nodeRef}
      timeout={500}
      classNames={cssTransitionGroupClassNames}
    >
      <div className="bg-pink-100 p-4 mb-4 border border-pink-200 rounded text-red-800 prose-strong:text-red-800 prose-ul:my-1">
        <strong>{"Can't fetch the comments!"->React.string}</strong>
      </div>
    </CSSAnimation.CSSTransition>
  | NoError => React.null
  }
}
