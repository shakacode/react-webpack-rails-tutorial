@react.component
let make = () => {
  let (comments, setComments) = React.useState(_ => ([] : Actions.Api.comments));
  let (error, setError) = React.useState(_ => false)
  let (isSaving, setIsSaving) = React.useState(_ => false)

  let storeComment = (author, text) => {
    setIsSaving(_ => true)
    let _ = (async() => {
      try {
        let _ = await Actions.Api.storeComment(author, text)
        let comments = await Actions.Api.fetchComments()
        setIsSaving(_ => false)
        setComments(_ => comments)
      } catch {
        | _ => setError(_ => true) 
      }
    })()
  }

  React.useEffect1((_) => {
    let fetchData = async () => {
      let comments = await Actions.Api.fetchComments();
      setComments(_ => comments);
    };

    let _ = fetchData();
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
      <CommentForm storeComment=storeComment isSaving={isSaving} />
      <CommentList comments={comments} error={error} />
    </div>
  </>
}
