@module("./CommentForm.module.scss") external css: {..} = "default"
type storeCommentAction = (string, string) => unit;

@react.component
let make = (~storeComment: storeCommentAction, ~isSaving: bool) => {
  let (author, setAuthor) = React.useState(_ => "")
  let (text, setText) = React.useState(_ => "")
  let (currformType, setCurrFormType) = React.useState(_ => "Horizontal Form")

  let handleAuthorChange = (e) => {
    setAuthor(ReactEvent.Form.currentTarget(e)["value"])
    ()
  }

  let handleTextChange = (e) => {
    setText(ReactEvent.Form.currentTarget(e)["value"])
    ()
  }

  let handleSubmit = (e) => {
    ReactEvent.Form.preventDefault(e)
    storeComment(author, text)
  }

  let horizontalForm = (
    <form className="form-horizontal"  onSubmit=handleSubmit disabled={isSaving}>
      <div className="form-group">
        <div className="col-sm-2">
          <label className="form-label pull-right">{React.string("Name")}</label>
        </div>
        <div className="col-sm-10">
          <input type_="text" className="form-control" placeholder="Your Name" onChange=handleAuthorChange value={author} />
        </div>
      </div>
      <div className="form-group">
        <div className="col-sm-2">
          <label className="form-label pull-right">{React.string("Text")}</label>
        </div>
        <div className="col-sm-10">
          <input type_="text" className="form-control" placeholder="Say something using markdown..." onChange=handleTextChange value={text} />
        </div>
      </div>
      <div className="form-group">
        <div className="col-sm-10 col-sm-offset-2">
          <input type_="submit" className="btn btn-primary" />
        </div>
      </div>
    </form>
  )

  let inlineForm = (
    <form className="form-inline" onChange=handleAuthorChange >
      <div className="form-group">
        <label className="form-label mr-15"> {React.string("Name")} </label>
        <input type_="text" className="form-control" placeholder="Your Name" value={author} />
      </div>
      <div className="form-group ml-15 mr-15">
        <label className="form-label mr-15"> {React.string("Text")} </label>
        <input type_="text" className="form-control w-50" placeholder="Say something using markdown..." onChange=handleTextChange value={text} />
      </div>
      <div className="form-group">
        <input type_="submit" className="btn btn-primary" onSubmit=handleSubmit/>
      </div>
    </form>
  )

  let stackedForm = (
    <form onChange=handleAuthorChange >
      <div className="form-group">
          <label className="form-label" > {React.string("Name")} </label>
          <input type_="text" className="form-control" placeholder="Your Name" onChange=handleAuthorChange value={author} />
      </div>
      <div className="form-group">
          <label className="form-label" > {React.string("Name")} </label>
          <input type_="text" className="form-control" placeholder="Say something using markdown..." onChange=handleTextChange value={text} />
      </div>
      <div className="form-group">
          <input type_="submit" className="btn btn-primary" onSubmit=handleSubmit />
      </div>
    </form>
  )

  let formTypes: array<string> = [
    "Horizontal Form",
    "Stacked Form",
    "Inline Form"
  ]

  let handleClick = (formType: string): unit => {
    setCurrFormType(_ => formType)
    ();
  }

  let formsNavbarComponent = (
    Belt.Array.map(formTypes, formType => 
      <li key={"form_" ++ formType} className={"nav-item " ++ (currformType == formType ? "active" : "")} onClick=(_=>handleClick(formType)) role="presentation">
         <a className={css["anchorButton"]} >{React.string(formType)}</a>
      </li>
    )
  )

  let form = switch currformType {
  | "Horizontal Form" => horizontalForm
  | "Stacked Form" => stackedForm
  | "Inline Form" => inlineForm
  | _ => horizontalForm
  }

  <div>
    <ul className="nav nav-pills">
      { React.array(formsNavbarComponent) }
    </ul>
    <hr />
    form
  </div>

}