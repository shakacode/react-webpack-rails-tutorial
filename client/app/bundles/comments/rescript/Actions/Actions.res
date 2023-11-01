module Create = {
  type t = {
    author: string,
    text: string
  }

  let storeComment = async (comment: t) => {
    let _ = await Axios.post(
      "comments.json",
      {
        author: comment.author,
        text: comment.text
      },
      {
        responseType: "json",
        headers: ReactOnRails.ror.default.authenticityHeaders()
      }
    )
  }
}

module Fetch = {
  type t = {
    author: string,
    text: string,
    id: int
  }

  type comments = array<t>

  type commentsRes = {
    comments: comments
  }

  let fetchComments = async (): result<comments, string> => {
    open Json.Decode

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
      | Ok(decodedRes) => Ok(decodedRes.comments)
      | Error(e) => Error(e)
    }
  }
}
