@module("./CommentForm.module.scss") external css: {..} = "default"

let reducer = (
  state: Types.commentFormState, 
  action: Types.commentFormAction
): Types.commentFormState => {
  switch (action) {
  | SetAuthor(author) => {...state, author}
  | SetText(text) => {...state, text}
  | SetFormType(form) => {...state, form: form}
  }
}


@react.component
let make = (~storeComment: Types.storeCommentAction, ~isSaving: Types.isSaving) => {
  let (state, dispatch) = React.useReducer(
    reducer, {
      author: "",
      text: "",
      form: Horizontal
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

  let forms: array<Types.formData> = 
  [
    {formName: "Horizontal Form", formType: Horizontal},
    {formName: "Inline Form", formType: Inline},
    {formName: "Stacked Form", formType: Stacked}
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
      | Horizontal
        => <HorizontalForm
              author={state.author}
              handleAuthorChange
              text={state.text}
              handleTextChange
              handleSubmit
              isSaving 
            />
      | Stacked
        => <StackedFrom
              author={state.author}
              handleAuthorChange
              text={state.text}
              handleTextChange
              handleSubmit
              isSaving 
            />
      | Inline
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
