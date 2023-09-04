type reqOptions = {
  responseType: string,
  headers: {.}
}
@module("axios") external post: (string, Types.storeCommentDataT, reqOptions) => promise<unit> = "post";
