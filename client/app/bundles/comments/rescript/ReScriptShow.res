type commentsFetchStatus =
  | FetchError
  | CommentsFetched(Actions.Fetch.comments)

type state = {commentsFetchStatus: commentsFetchStatus}

type action =
  | SetComments(Actions.Fetch.comments)
  | SetFetchError

let reducer = (_, action: action): state => {
  switch action {
  | SetComments(comments) => {commentsFetchStatus: CommentsFetched(comments)}
  | SetFetchError => {commentsFetchStatus: FetchError}
  }
}

type subscriptionStatus =
  | Disconnected(ActionCable.subscription<unit>)
  | Connected(ActionCable.subscription<unit>)

@react.component
let default = () => {
  let (state, dispatch) = React.useReducer(
    reducer,
    {
      commentsFetchStatus: CommentsFetched(([]: Actions.Fetch.comments)),
    },
  )

  let fetchData = async () => {
    let comments = await Actions.Fetch.fetchComments()
    switch comments {
    | Ok(comments) => SetComments(comments)->dispatch
    | Error(_) => SetFetchError->dispatch
    }
  }

  let subscribeToCommentsChannel = () => {
    let _ = ActionCable.subscribeConsumer(
      "CommentsChannel",
      {
        connected: () => {
          Js.Console.log("Connected")
        },
        received: (data: Actions.Fetch.t) => {
          SetComments([data])->dispatch
        },
        disconnected: () => {
          Js.Console.log("Disconnected")
        },
      },
    )
  }

  subscribeToCommentsChannel()

  React.useEffect1(_ => {
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
      <CommentForm fetchData />
      {switch state.commentsFetchStatus {
      | FetchError => <AlertError errorMsg="Can't fetch the comments!" />
      | CommentsFetched(comments) => <CommentList comments />
      }}
    </div>
  </div>
}
