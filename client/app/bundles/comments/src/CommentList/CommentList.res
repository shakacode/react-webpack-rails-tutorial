@module("../ReScriptShow.module.scss") external css: {..} = "default"

@react.component
let make = (~comments: Actions.Fetch.comments, ~error: Types.error) => {
  let cssTransitionGroupClassNames: CSSAnimation.CSSTransition.t = {
    enter: css["elementEnter"],
    enterActive: css["elementEnterActive"],
    exit: css["elementLeave"],
    exitActive: css["elementLeaveActive"]
  }

  <div>
    {
      <AlertError cssTransitionGroupClassNames=cssTransitionGroupClassNames error />
    }
    <CSSAnimation.TransitionGroup className="commentList" component="div">
      {
        comments->Belt.Array.map(
          comment => 
            <Comment
              comment=comment 
              cssTransitionGroupClassNames 
              key={
                "comment_" ++ comment.id->Belt.Int.toString
              }
            />
        )->React.array
      }
    </CSSAnimation.TransitionGroup>
  </div>
}
