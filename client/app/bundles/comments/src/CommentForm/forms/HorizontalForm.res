@react.component
let make = (
  ~author,
  ~handleAuthorChange,
  ~text,
  ~handleTextChange,
  ~handleSubmit,
  ~isSaving: Types.isSavingT
  ) => {
  <form className="form-horizontal"  onSubmit=handleSubmit disabled={isSaving == BusySaving}>
    <div className="form-group">
      <div className="col-sm-2">
        <label className="form-label pull-right">{"Name"->React.string}</label>
      </div>
      <div className="col-sm-10">
        <input type_="text" className="form-control" placeholder="Your Name" name="comment_author" id="comment_author" onChange=handleAuthorChange value={author} />
      </div>
    </div>
    <div className="form-group">
      <div className="col-sm-2">
        <label className="form-label pull-right">{"Text"->React.string}</label>
      </div>
      <div className="col-sm-10">
        <input type_="text" className="form-control" placeholder="Say something using markdown..." name="comment_text" id="comment_text" onChange=handleTextChange value={text} />
      </div>
    </div>
    <div className="form-group">
      <div className="col-sm-10 col-sm-offset-2">
        <input type_="submit" className="btn btn-primary" value="Post"/>
      </div>
    </div>
  </form>
}
