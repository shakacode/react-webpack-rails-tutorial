type commentsStoreStatus = NotStarted | BusyLoading | StoreError

type commentsFetchStatus =
  | FetchError
  | CommentsFetched(Actions.Fetch.comments)

type state = {
  commentsFetchStatus: commentsFetchStatus,
  commentsStoreStatus: commentsStoreStatus,
}

type action =
  | SetComments(Actions.Fetch.comments)
  | SetFetchError
  | SetStoreError
  | ClearStoreError
  | SetStoreStatusLoading

let reducer = (state: state, action: action): state => {
  switch action {
  | SetComments(comments) => {...state, commentsFetchStatus: CommentsFetched(comments)}
  | SetFetchError => {...state, commentsFetchStatus: FetchError}
  | SetStoreError => {...state, commentsStoreStatus: StoreError}
  | ClearStoreError => {...state, commentsStoreStatus: NotStarted}
  | SetStoreStatusLoading => {...state, commentsStoreStatus: BusyLoading}
  }
}

@react.component
let default = () => {
  let (state, dispatch) = React.useReducer(
    reducer,
    {
      commentsFetchStatus: CommentsFetched(([]: Actions.Fetch.comments)),
      commentsStoreStatus: NotStarted,
    },
  )

  let storeComment: CommentForm.storeComment = (newComment: Actions.Create.t) => {
    SetStoreStatusLoading->dispatch
    let saveAndFetchComments = async () => {
      try {
        let _ = await Actions.Create.storeComment(newComment)
        ClearStoreError->dispatch

        let comments = await Actions.Fetch.fetchComments()
        switch comments {
        | Ok(comments) => SetComments(comments)->dispatch
        | Error(_) => SetFetchError->dispatch
        }
      } catch {
      | _ => SetStoreError->dispatch
      }
    }
    saveAndFetchComments()->ignore
  }

  React.useEffect1(_ => {
    let fetchData = async () => {
      let comments = await Actions.Fetch.fetchComments()
      switch comments {
      | Ok(comments) => SetComments(comments)->dispatch
      | Error(_) => SetFetchError->dispatch
      }
    }

    fetchData()->ignore
    None
  }, [])

  <div>
    <h2>
      {"Rescript + Rails Backend (with "->React.string}
      <a href="https://github.com/shakacode/react_on_rails">
        {"react_on_rails gem"->React.string}
      </a>
      {")"->React.string}
    </h2>
    <Header />
    <div className="prose max-w-none prose-a:text-sky-700 prose-li:my-0">
      <h2> {"Comments"->React.string} </h2>
      <ul>
        <li> {"Text supports Github Flavored Markdown."->React.string} </li>
        <li> {"Comments older than 24 hours are deleted."->React.string} </li>
        <li> {"Name is preserved. Text is reset, between submits"->React.string} </li>
        <li>
          {"To see Action Cable instantly update two browsers, open two browsers and submit a comment!"->React.string}
        </li>
      </ul>
      <CommentForm
        storeComment
        disabled={switch state.commentsStoreStatus {
        | BusyLoading => true
        | _ => false
        }}
        storeCommentError={switch state.commentsStoreStatus {
        | StoreError => true
        | _ => false
        }}
      />
      <CommentList
        // TODO: pass the comments fetch status to the CommentList
        // to either render an error messege or the comment list not both
        comments={switch state.commentsFetchStatus {
        | CommentsFetched(comments) => comments
        | _ => []
        }}
        fetchCommentsError={switch state.commentsFetchStatus {
        | FetchError => true
        | _ => false
        }}
      />
    </div>
  </div>
}
