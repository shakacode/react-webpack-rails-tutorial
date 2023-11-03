module Create = {
  type t = {
    author: string,
    text: string,
  }

  let storeComment = async (comment: t) => {
    let _ = await Axios.post(
      "comments.json",
      {
        author: comment.author,
        text: comment.text,
      },
      {
        responseType: "json",
        headers: {
          // see https://github.com/shakacode/react_on_rails/blob/249c69812474e0f532df432581bf5e618df0e1ec/node_package/src/Authenticity.ts#L13C1-L18C1
          "X-CSRF-Token": ReactOnRails.authenticityToken(),
          "X-Requested-With": "XMLHttpRequest",
        },
      },
    )
  }
}

module Fetch = {
  type t = {
    author: string,
    text: string,
    id: int,
  }

  type comments = array<t>

  type commentsRes = {comments: comments}

  let fetchComments = async (): result<comments, string> => {
    open Json.Decode

    let response = await Fetch.get("comments.json")
    let jsonRes = await response->Fetch.Response.json

    let jsonComment = Json.Decode.object(field => {
      author: field.required(. "author", string),
      text: field.required(. "text", string),
      id: field.required(. "id", int),
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
