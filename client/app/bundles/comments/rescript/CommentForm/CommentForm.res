type formDisplay = Horizontal | Inline | Stacked

type commentsStoreStatus = Idle | BusyLoading | StoreError

type formData = {
  formName: string,
  formType: formDisplay,
}

type state = {
  author: string,
  text: string,
  form: formDisplay,
  commentsStoreStatus: commentsStoreStatus,
}

type action =
  | SetAuthor(string)
  | SetText(string)
  | SetFormType(formDisplay)
  | SetStoreError
  | ClearStoreError
  | SetStoreStatusLoading

let reducer = (state: state, action: action): state => {
  switch action {
  | SetAuthor(author) => {...state, author}
  | SetText(text) => {...state, text}
  | SetFormType(form) => {...state, form}
  | SetStoreError => {...state, commentsStoreStatus: StoreError}
  | ClearStoreError => {...state, commentsStoreStatus: Idle}
  | SetStoreStatusLoading => {...state, commentsStoreStatus: BusyLoading}
  }
}

@react.component
let make = ( ~fetchData ) => {
  let (state, dispatch) = React.useReducer(
    reducer,
    {
      author: "",
      text: "",
      form: Horizontal,
      commentsStoreStatus: Idle,
    },
  )

  let disabled = React.useMemo1(() => {switch state.commentsStoreStatus {
                                      | BusyLoading => true
                                      | Idle
                                      | StoreError => false
                                      }}, [state.commentsStoreStatus])

  let storeComment = (newComment: Actions.Create.t) => {
    SetStoreStatusLoading->dispatch
    let saveAndFetchComments = async () => {
      try {
        let _ = await Actions.Create.storeComment(newComment)
        ClearStoreError->dispatch

        await fetchData();
      } catch {
      | _ => SetStoreError->dispatch
      }
    }
    saveAndFetchComments()->ignore
  }

  let handleAuthorChange = event => {
    let value = ReactEvent.Form.currentTarget(event)["value"]
    SetAuthor(value)->dispatch
  }

  let handleTextChange = event => {
    let value = ReactEvent.Form.currentTarget(event)["value"]
    SetText(value)->dispatch
  }

  let handleSubmit = event => {
    ReactEvent.Form.preventDefault(event)
    storeComment({author: state.author, text: state.text})
  }

  let forms: array<formData> = [
    {formName: "Horizontal Form", formType: Horizontal},
    {formName: "Inline Form", formType: Inline},
    {formName: "Stacked Form", formType: Stacked},
  ]

  <div>
    <div className="flex gap-1 not-prose">
      {forms
      ->Array.map(form =>
        <button
          key={`form_${form.formName}`}
          className={`px-6 py-2 font-semibold border-0 rounded ${state.form == form.formType
              ? "text-sky-50 bg-sky-600"
              : "text-sky-600 hover:bg-gray-100"}`}
          onClick={event => SetFormType(form.formType)->dispatch}>
          {form.formName->React.string}
        </button>
      )
      ->React.array}
    </div>
    <hr />
    {switch state.form {
    | Horizontal =>
      <HorizontalForm
        author={state.author}
        handleAuthorChange
        text={state.text}
        handleTextChange
        handleSubmit
        disabled
      />
    | Stacked =>
      <StackedFrom
        author={state.author}
        handleAuthorChange
        text={state.text}
        handleTextChange
        handleSubmit
        disabled
      />
    | Inline =>
      <InlineForm
        author={state.author}
        handleAuthorChange
        text={state.text}
        handleTextChange
        handleSubmit
        disabled
      />
    }}
    {switch state.commentsStoreStatus {
    | StoreError => <AlertError errorMsg="Can't store the comment!" />
    | Idle
    | BusyLoading => React.null
    }}
  </div>
}
