@react.component
let make = (~author, ~handleAuthorChange, ~text, ~handleTextChange, ~handleSubmit, ~disabled) => {
  <form
    onSubmit=handleSubmit
    disabled={disabled}
    className="flex flex-col gap-4"
    ariaLabel="Comment submission form">
    <div className="flex flex-col gap-0">
      <label htmlFor="comment_author" className="w-full"> {"Name"->React.string} </label>
      <input
        type_="text"
        className="px-3 py-1 leading-4 border border-gray-300 rounded w-full"
        placeholder="Your Name"
        name="comment_author"
        id="comment_author"
        onChange=handleAuthorChange
        value={author}
        ariaLabel="Author name"
        ariaRequired=true
      />
    </div>
    <div className="flex flex-col gap-0">
      <label htmlFor="comment_text" className="w-full"> {"Text"->React.string} </label>
      <input
        type_="text"
        className="px-3 py-1 leading-4 border border-gray-300 rounded w-full"
        placeholder="Say something using markdown..."
        name="comment_text"
        id="comment_text"
        onChange=handleTextChange
        value={text}
        ariaLabel="Comment text"
        ariaRequired=true
      />
    </div>
    <div className="flex flex-col gap-0">
      <input
        type_="submit"
        className="self-start px-3 py-1 font-semibold border-0 rounded text-sky-50 bg-sky-600 hover:bg-sky-800"
        value="Post"
        ariaLabel="Submit comment"
      />
    </div>
  </form>
}