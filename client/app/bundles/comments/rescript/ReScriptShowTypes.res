type savingStatus = Free | BusySaving

type status = {
  commentsFetchError: bool,
  commentStoreError: bool,
  saving: savingStatus,
}

type state = {
  comments: Actions.Fetch.comments,
  status: status,
}

type action =
  | SetComments(Actions.Fetch.comments)
  | SetFetchError(bool)
  | SetStoreError(bool)
  | SetSavingStatus(savingStatus)

type storeComment = Actions.Create.t => unit
