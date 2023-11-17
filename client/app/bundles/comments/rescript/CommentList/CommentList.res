@module("../ReScriptShow.module.scss") external css: {..} = "default"

@react.component
let make = (~comments: Actions.Fetch.comments) => {
  let cssTransitionGroupClassNames: ReactTransitionGroup.CSSTransition.t = {
    enter: css["elementEnter"],
    enterActive: css["elementEnterActive"],
    exit: css["elementLeave"],
    exitActive: css["elementLeaveActive"],
  }

  <div>
    <ReactTransitionGroup.TransitionGroup className="commentList" component="div">
      {comments
      ->Array.map(comment =>
        <Comment
          comment cssTransitionGroupClassNames key={"comment_" ++ comment.id->Int.toString}
        />
      )
      ->React.array}
    </ReactTransitionGroup.TransitionGroup>
  </div>
}
