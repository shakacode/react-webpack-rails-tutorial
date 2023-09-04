@react.component
let make = (
  ~author,
  ~handleAuthorChange,
  ~text,
  ~handleTextChange,
  ~handleSubmit,
  ~isSaving: Types.isSavingT
  ) => {
  <form className="form-inline" onSubmit=handleSubmit disabled={isSaving == BusySaving} >
    <div className="form-group">
      <label className="form-label mr-15"> {"Name"->React.string} </label>
      <input type_="text" className="form-control" placeholder="Your Name" name="comment_author" id="comment_author" value={author} onChange=handleAuthorChange />
    </div>
    <div className="form-group ml-15 mr-15">
      <label className="form-label mr-15"> {"Text"->React.string} </label>
      <input type_="text" className="form-control w-50" placeholder="Say something using markdown..." name="comment_text" id="comment_text" onChange=handleTextChange value={text} />
    </div>
    <div className="form-group">
      <input type_="submit" className="btn btn-primary" onSubmit=handleSubmit value="Post"/>
    </div>
  </form>
}
