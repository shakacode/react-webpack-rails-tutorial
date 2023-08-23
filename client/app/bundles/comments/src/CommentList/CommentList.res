@module("../RescriptPage.module.scss") external css: {..} = "default"

module TransitionGroup = {
  @react.component @module("react-transition-group")
  external make: (
    ~children: React.element,
    ~className: string,
    ~component: string
  ) => React.element = "TransitionGroup"
}

type cssTransitionGroupClassNamesT = {
  enter: string,
  enterActive: string,
  exit: string,
  exitActive: string
}

module CSSTransition = {
  @react.component @module("react-transition-group")
  external make: (
    ~children: React.element, 
    ~key: string, 
    ~timeout: int, 
    ~nodeRef: React.ref<Js.Nullable.t<'a>>, 
    ~classNames: cssTransitionGroupClassNamesT
  ) => React.element = "CSSTransition"
}

@react.component
let make = (~comments: Actions.Api.comments, ~error: bool) => {
  let cssTransitionGroupClassNames = {
    enter: css["elementEnter"],
    enterActive: css["elementEnterActive"],
    exit: css["elementLeave"],
    exitActive: css["elementLeaveActive"]
  }

  let errorMsg = switch error {
  | true => (() => {
      let nodeRef = React.useRef(Js.Nullable.null)
      
      // The 500 must correspond to the 0.5s in:
      //   ../RescriptPage.module.scss:8
      <CSSTransition
        key="commentFetchError"
        nodeRef={nodeRef}
        timeout={500}
        classNames={cssTransitionGroupClassNames}
      >
        <div className="alert alert-danger">
          <strong>{React.string("Your comment was not saved!")}</strong>
        </div>
      </CSSTransition>
    })()
  | false => <></>
  }

  let commentsElements = Belt.Array.map(
    comments,
    comment => {
      let nodeRef = React.useRef(Js.Nullable.null)
      
      // The 500 must correspond to the 0.5s in:
      //   ../RescriptPage.module.scss:8
      <CSSTransition
        key={"component_" ++ Belt.Int.toString(comment.id) }
        timeout={500}
        nodeRef={nodeRef}
        classNames=cssTransitionGroupClassNames
      >
        <Comment comment=comment nodeRef=nodeRef/>
      </CSSTransition>
    });

  <div>
    errorMsg
    <TransitionGroup className="commentList" component="div">
      {React.array(commentsElements)}
    </TransitionGroup>
  </div>
}
