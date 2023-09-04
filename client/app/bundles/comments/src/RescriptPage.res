type rescriptPageStateT = {
  comments: Actions.Fetch.comments,
  error: Types.errorT,
  isSaving: Types.isSavingT
}

type rescriptPageActionT =
  | SetComments(Actions.Fetch.comments)
  | SetError(Types.errorT)
  | SetIsSaving(Types.isSavingT)


let reducer = (
  state: rescriptPageStateT, 
  action: rescriptPageActionT
): rescriptPageStateT => {
  switch (action) {
  | SetComments(comments) => {...state, comments}
  | SetError(error) => {...state, error}
  | SetIsSaving(isSaving) => {...state, isSaving}
  };
}

@react.component
let make = () => {
  let (state, dispatch) = React.useReducer(
    reducer, {
      comments: ([]: Actions.Fetch.comments),
      error: NoError,
      isSaving: Free
    }
  )

  let storeComment = (author, text) => {
    SetError(NoError)->dispatch 
    SetIsSaving(BusySaving)->dispatch
    let saveAndFetchComments = async () => {
      try {
        let _ = await Actions.Create.storeComment({author, text})
        SetIsSaving(Free)->dispatch

        let comments = await Actions.Fetch.fetchComments()     
        switch comments {
        | Ok(comments) => SetComments(comments)->dispatch
        | Error(e) => SetError(e)->dispatch
        }
      } catch {
        | _ => SetError(FailedToSaveComment)->dispatch 
      }
    }
    saveAndFetchComments()->ignore
  }

  React.useEffect1((_) => {
    let fetchData = async () => {
      let comments = await Actions.Fetch.fetchComments();
      switch comments {
      | Ok(comments) => SetComments(comments)->dispatch
      | Error(e) => SetError(e)->dispatch
      }
    };

    fetchData()->ignore
    None
  }, [])
 
  <>
    <h2>{"Rescript + Rails Backend (with "->React.string}<a href="https://github.com/shakacode/react_on_rails">{"react_on_rails gem"->React.string}</a>{")"->React.string}</h2>
    <Header />
    <div className="container">
      <h2>{"Comments"->React.string}</h2>
      <ul>
        <li>{"Text supports Github Flavored Markdown."->React.string}</li>
        <li>{"Comments older than 24 hours are deleted."->React.string}</li>
        <li>{"Name is preserved. Text is reset, between submits"->React.string}</li>
        <li>{"To see Action Cable instantly update two browsers, open two browsers and submit a comment!"->React.string}</li>
      </ul>
      <CommentForm storeComment=storeComment isSaving={state.isSaving} />
      <CommentList comments={state.comments} error={state.error} />
    </div>
  </>
}

let default = make
