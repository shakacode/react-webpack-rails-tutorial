@module("./CommentForm.module.scss") external css: {..} = "default"

let reducer = (
  state: Types.commentFormStateT, 
  action: Types.commentFormActionT
): Types.commentFormStateT => {
  switch (action) {
  | SetAuthor(author) => {...state, author}
  | SetText(text) => {...state, text}
  | SetFormType(form) => {...state, form: form}
  };
}


@react.component
let make = (~storeComment: Types.storeCommentActionT, ~isSaving: Types.isSavingT) => {
  let (state, dispatch) = React.useReducer(
    reducer, {
      author: "",
      text: "",
      form: HorizontalForm
    }
  )

  let handleAuthorChange = (event) => {
    let value = ReactEvent.Form.currentTarget(event)["value"]
    SetAuthor(value)->dispatch
  }

  let handleTextChange = (event) => {
    let value = ReactEvent.Form.currentTarget(event)["value"]
    SetText(value)->dispatch
  }

  let handleSubmit = (event) => {
    ReactEvent.Form.preventDefault(event)
    storeComment(state.author, state.text)
  }

  let forms: array<Types.formDataT> = 
  [
    {formName: "Horizontal Form", formType: HorizontalForm},
    {formName: "Inline Form", formType: InlineForm},
    {formName: "Stacked Form", formType: StackedFrom}
  ]

  <div>
    <ul className="nav nav-pills">
      {
        forms
        ->Belt.Array.map(form
          => (
            <li 
              key={"form_" ++ form.formName} 
              className={"nav-item " ++ (state.form == form.formType ? "active" : "")} 
              onClick={event => SetFormType(form.formType)->dispatch}
              role="presentation"
            >
              <a className={css["anchorButton"]} >{form.formName->React.string}</a>
            </li> 
          )
        )->React.array
      }
    </ul>
    <hr />
    {
      switch state.form {
      | HorizontalForm
        => <HorizontalForm
              author={state.author}
              handleAuthorChange
              text={state.text}
              handleTextChange
              handleSubmit
              isSaving 
            />
      | StackedFrom 
        => <StackedFrom
              author={state.author}
              handleAuthorChange
              text={state.text}
              handleTextChange
              handleSubmit
              isSaving 
            />
      | InlineForm
        => <InlineForm
              author={state.author}
              handleAuthorChange
              text={state.text}
              handleTextChange
              handleSubmit
              isSaving 
            />
      }
    }
  </div>
}
