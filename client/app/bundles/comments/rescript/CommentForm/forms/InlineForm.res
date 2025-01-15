@react.component
let make = (~author, ~handleAuthorChange, ~text, ~handleTextChange, ~handleSubmit, ~disabled) => {
  <form
    className="form-inline flex flex-col lg:flex-row flex-wrap gap-4"
    onSubmit=handleSubmit
    disabled={disabled}
    ariaLabel="Comment submission form">
    <div className="flex gap-2 items-center">
      <label htmlFor="comment_author"> {"Name"->React.string} </label>
      <input
        type_="text"
        className="px-3 py-1 leading-4 border border-gray-300 rounded"
        placeholder="Your Name"
        name="comment_author"
        id="comment_author"
        value={author}
        onChange=handleAuthorChange
        ariaLabel="Author name"
        ariaRequired=true
      />
    </div>
    <div className="flex gap-2 items-center">
      <label htmlFor="comment_text"> {"Text"->React.string} </label>
      <input
        type_="text"
        className="px-3 py-1 leading-4 border border-gray-300 rounded"
        placeholder="Say something using markdown..."
        name="comment_text"
        id="comment_text"
        onChange=handleTextChange
        value={text}
        ariaLabel="Comment text"
        ariaRequired=true
      />
    </div>
    <div className="flex gap-2">
      <input
        type_="submit"
        className="self-start px-3 py-1 font-semibold border-0 rounded text-sky-50 bg-sky-600 hover:bg-sky-800"
        value="Post"
        ariaLabel="Submit comment"
      />
    </div>
  </form>
}
