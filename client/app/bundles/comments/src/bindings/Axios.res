type reqOptions = {
  responseType: string,
  headers: {.}
}
@module("axios") external post: (string, Types.storeCommentData, reqOptions) => promise<unit> = "post"
