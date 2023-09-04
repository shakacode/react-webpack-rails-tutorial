type formDisplayT = HorizontalForm | InlineForm | StackedFrom;

type commentFormStateT = {
  author: string,
  text: string,
  form: formDisplayT
}

type commentFormActionT =
    | SetAuthor(string)
    | SetText(string)
    | SetFormType(formDisplayT);

type formDataT = {
  formName: string,
  formType: formDisplayT
};

type storeCommentActionT = (string, string) => unit;

type storeCommentDataT = {
  author: string,
  text: string
}

type errorT = NoError | FailedToSaveComment | FailedToFetchComments;

type isSavingT = Free | BusySaving;
