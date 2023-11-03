type formDisplay = Horizontal | Inline | Stacked

type formData = {
  formName: string,
  formType: formDisplay,
}

type state = {
  author: string,
  text: string,
  form: formDisplay,
}

type action =
  | SetAuthor(string)
  | SetText(string)
  | SetFormType(formDisplay)
