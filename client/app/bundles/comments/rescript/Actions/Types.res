type formDisplay = Horizontal | Inline | Stacked

type commentFormState = {
  author: string,
  text: string,
  form: formDisplay
}

type commentFormAction =
    | SetAuthor(string)
    | SetText(string)
    | SetFormType(formDisplay)

type formData = {
  formName: string,
  formType: formDisplay
}

type storeCommentAction = (string, string) => unit

type storeCommentData = {
  author: string,
  text: string
}

type error = NoError | FailedToSaveComment | FailedToFetchComments
