type reqOptions = {
  responseType: string,
  headers: {
    "X-CSRF-Token": option<string>,
    "X-Requested-With": string
  } 
}
@module("axios") external post: (string, Types.storeCommentData, reqOptions) => promise<unit> = "post"
