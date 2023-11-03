@react.component
let make = (~author, ~handleAuthorChange, ~text, ~handleTextChange, ~handleSubmit, ~disabled) => {
  <form className="form-horizontal flex flex-col gap-4" onSubmit=handleSubmit disabled>
    <div className="flex flex-col gap-0 items-center lg:gap-4 lg:flex-row">
      <label className="w-full lg:w-2/12 lg:text-end shrink-0"> {"Name"->React.string} </label>
      <input
        type_="text"
        className="px-3 py-1 leading-4 border border-gray-300 rounded w-full"
        placeholder="Your Name"
        name="comment_author"
        id="comment_author"
        onChange=handleAuthorChange
        value={author}
      />
    </div>
    <div className="flex flex-col gap-0 items-center lg:gap-4 lg:flex-row">
      <label className="w-full lg:w-2/12 lg:text-end shrink-0"> {"Text"->React.string} </label>
      <input
        type_="text"
        className="px-3 py-1 leading-4 border border-gray-300 rounded w-full"
        placeholder="Say something using markdown..."
        name="comment_text"
        id="comment_text"
        onChange=handleTextChange
        value={text}
      />
    </div>
    <div className="flex flex-col gap-0 lg:gap-4 lg:flex-row">
      <div className="hidden lg:block lg:w-2/12 grow-0" />
      <input
        type_="submit"
        className="self-start px-3 py-1 font-semibold border-0 rounded text-sky-50 bg-sky-600 hover:bg-sky-800"
        value="Post"
      />
    </div>
  </form>
}
