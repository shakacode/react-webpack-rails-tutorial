// ReactOnRails binding
type rorDefault = {
  authenticityHeaders: unit => {.} 
}
type rorModule = {
  default: rorDefault
}
@module("react-on-rails") external ror: rorModule = "default";

type storeCommentData = {
  author: string,
  text: string
}

// axios binding
type reqOptions = {
  responseType: string,
  headers: {.}
}
@module("axios") external post: (string, storeCommentData, reqOptions) => promise<unit> = "post";

module Api = {
  type comment = {
    author: string,
    text: string,
    id: int
  };
  
  type comments = array<comment>

  type commentsRes = {
    comments: comments
  }

  let fetchComments = async (): comments => {
    open Json.Decode;

    let response = await Fetch.get("comments.json")
    let jsonRes = await response->Fetch.Response.json
    
    let jsonComment = Json.Decode.object(field => {
      author: field.required(. "author", string),
      text: field.required(. "text", string),
      id: field.required(. "id", int)
    })

    let jsonComments = Json.Decode.object(field => {
      comments: field.required(. "comments", array(jsonComment)),
    })

    switch jsonRes->Json.decode(jsonComments) {
      | Ok(decodedRes) => decodedRes.comments
      | Error(err) => Js.Exn.raiseError(err)
    }
  }

  let storeComment = async (author: string, text: string) => {
    let _ = await post(
      "comments.json",
      {
        author: author,
        text: text
      },
      {
        responseType: "json",
        headers:ror.default.authenticityHeaders()
      }
    )
    
    
    // setIsSaving(_ => true)
    // try {
    //   let _ = await post(
    //     "comments.json",
    //     {
    //       author: author,
    //       text: text
    //     },
    //     {
    //       responseType: "json",
    //       headers:ror.default.authenticityHeaders()
    //     }
    //   )
      // setIsSaving(_ => false)
      // let comments = await fetchComments()
      // setComments(_ => comments)
    // } catch {
    //   | _ => setError(_ => true)
    // }
  }
}
