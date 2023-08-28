@module("../RescriptPage.module.scss") external css: {..} = "default"

@react.component
let make = (~comments: Actions.Api.comments, ~error: bool) => {
  let cssTransitionGroupClassNames: CSSTransition.cssTransitionGroupClassNamesT = {
    enter: css["elementEnter"],
    enterActive: css["elementEnterActive"],
    exit: css["elementLeave"],
    exitActive: css["elementLeaveActive"]
  }

  let errorMsg = switch error {
  | true => <AlertError cssTransitionGroupClassNames=cssTransitionGroupClassNames />
  | false => <></>
  }

  let commentsElements = Belt.Array.map(
    comments,
    comment => <Comment comment=comment cssTransitionGroupClassNames key={"comment_" ++ Belt.Int.toString(comment.id)} />);

  <div>
    errorMsg
    <CSSTransition.TransitionGroup className="commentList" component="div">
      {React.array(commentsElements)}
    </CSSTransition.TransitionGroup>
  </div>
}
