type reqOptions = {
  responseType: string,
  headers: {
    "X-CSRF-Token": option<string>,
    "X-Requested-With": string
  } 
}

type commentData = {
  author: string,
  text: string
}

@module("axios") external post: (string, commentData, reqOptions) => promise<unit> = "post"
