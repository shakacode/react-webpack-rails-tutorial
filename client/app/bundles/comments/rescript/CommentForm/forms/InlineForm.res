@react.component
let make = (
  ~author,
  ~handleAuthorChange,
  ~text,
  ~handleTextChange,
  ~handleSubmit,
  ~disabled
  ) => {
  <form 
    className="form-inline flex flex-col lg:flex-row flex-wrap gap-4"
    onSubmit=handleSubmit
    disabled
  >
    <div className="flex gap-2 items-center">
      <label> {"Name"->React.string} </label>
      <input
        type_="text"
        className="px-3 py-1 leading-4 border border-gray-300 rounded"
        placeholder="Your Name"
        name="comment_author"
        id="comment_author"
        value={author}
        onChange=handleAuthorChange
      />
    </div>

    <div className="flex gap-2 items-center">
      <label> {"Text"->React.string} </label>
      <input
        type_="text"
        className="px-3 py-1 leading-4 border border-gray-300 rounded"
        placeholder="Say something using markdown..."
        name="comment_text"
        id="comment_text"
        onChange=handleTextChange
        value={text}
      />
    </div>

    <div className="flex gap-2">
      <input
        type_="submit"
        className="self-start px-3 py-1 font-semibold border-0 rounded text-sky-50 bg-sky-600 hover:bg-sky-800"
        onSubmit=handleSubmit
        value="Post"
      />
    </div>
  </form>
}
