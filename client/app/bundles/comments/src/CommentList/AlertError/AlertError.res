@react.component
let make = (~cssTransitionGroupClassNames: CSSTransition.cssTransitionGroupClassNamesT) => {
  let nodeRef = React.useRef(Js.Nullable.null)
      
  // The 500 must correspond to the 0.5s in:
  //   ../../RescriptPage.module.scss:9
  <CSSTransition.CSSTransition
    key="commentFetchError"
    nodeRef={nodeRef}
    timeout={500}
    classNames={cssTransitionGroupClassNames}
  >
    <div className="alert alert-danger">
      <strong>{React.string("Your comment was not saved!")}</strong>
    </div>
  </CSSTransition.CSSTransition>
}