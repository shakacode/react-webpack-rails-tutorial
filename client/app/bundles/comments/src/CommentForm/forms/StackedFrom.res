@react.component
let make = (
  ~author,
  ~handleAuthorChange,
  ~text,
  ~handleTextChange,
  ~handleSubmit,
  ~isSaving: Types.isSavingT
  ) => {
  <form onSubmit=handleSubmit disabled={isSaving == BusySaving}>
    <div className="form-group">
        <label className="form-label" > {"Name"->React.string} </label>
        <input type_="text" className="form-control" placeholder="Your Name" name="comment_author" id="comment_author" onChange=handleAuthorChange value={author} />
    </div>
    <div className="form-group">
        <label className="form-label" > {"Name"->React.string} </label>
        <input type_="text" className="form-control" placeholder="Say something using markdown..." name="comment_text" id="comment_text" onChange=handleTextChange value={text} />
    </div>
    <div className="form-group">
        <input type_="submit" className="btn btn-primary" onSubmit=handleSubmit value="Post"/>
    </div>
  </form>
}
