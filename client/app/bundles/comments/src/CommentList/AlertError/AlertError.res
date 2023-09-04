@react.component
let make = (~cssTransitionGroupClassNames: CSSAnimation.CSSTransition.t, ~error: Types.errorT) => {
  let nodeRef = React.useRef(Js.Nullable.null)

  switch error {
  | FailedToSaveComment => 
    // The 500 must correspond to the 0.5s in:
    //   ../../RescriptPage.module.scss:9
    <CSSAnimation.CSSTransition
      key="commentFetchError"
      nodeRef={nodeRef}
      timeout={500}
      classNames={cssTransitionGroupClassNames}
    >
      <div className="alert alert-danger">
        <strong>{"Your comment was not saved!"->React.string}</strong>
      </div>
    </CSSAnimation.CSSTransition>
  | FailedToFetchComments =>
    // The 500 must correspond to the 0.5s in:
    //   ../../RescriptPage.module.scss:9
    <CSSAnimation.CSSTransition
      key="commentFetchError"
      nodeRef={nodeRef}
      timeout={500}
      classNames={cssTransitionGroupClassNames}
    >
      <div className="alert alert-danger">
        <strong>{"Can't fetch the comments!"->React.string}</strong>
      </div>
    </CSSAnimation.CSSTransition>
  | NoError => React.null
  }
}
