@module("./Comment.module.scss") external css: {..} = "default"

type markedOptions = {
  gfm: bool
}
@module("marked") external marked: (string, markedOptions) => string = "marked";

@react.component
let make = (~comment: Actions.Api.comment, ~nodeRef) => {
  let rawMarkup = marked(comment.text, {gfm: true})
  let innerHTML = { "__html": rawMarkup }
  
  <div className=css["comment"] ref={ReactDOM.Ref.domRef(nodeRef)}>
    <h2 className=css["commentAuthor"] > {comment.author->React.string} </h2>
    <span dangerouslySetInnerHTML=innerHTML />
  </div>
}