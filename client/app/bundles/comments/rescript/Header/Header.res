@react.component
let make = () => {
  <div
    className="prose max-w-full prose-a:text-sky-700 prose-li:my-0 prose-code:text-rose-600 prose-code:bg-yellow-100 prose-headings:text-gray-700">
    <ul>
      <li>
        <a href="https://blog.shakacode.com/can-shakacode-help-you-4a5b1e5a8a63#.jex6tg9w9">
          {"Can ShakaCode Help You? "->React.string}
        </a>
        {"We're actively seeking new projects with React, React-Native, or Ruby on Rails."->React.string}
      </li>
      <li>
        {"See the "->React.string}
        <a href="https://github.com/shakacode/react-webpack-rails-tutorial/blob/master/README.md">
          {"github.com/shakacode/react-webpack-rails-tutorial/README.md "->React.string}
        </a>
        {"for details of how this example site was built."->React.string}
      </li>
      <li>
        {"Read "->React.string}
        <a href="https://shakacode.gitbooks.io/react-on-rails/content/">
          {"Documentation for React on Rails"->React.string}
        </a>
        <a href="https://www.shakacode.com/blog/the-react-on-rails-doctrine">
          {"The React on Rails Doctrine."->React.string}
        </a>
      </li>
      <li>
        {"See our React Native Client: "->React.string}
        <a href="https://github.com/shakacode/react-native-tutorial">
          {"shakacode/react-native-tutorial"->React.string}
        </a>
        {"."->React.string}
      </li>
      <li>
        {"Watch the "->React.string}
        <a href="https://www.youtube.com/playlist?list=PL5VAKH-U1M6dj84BApfUtvBjvF-0-JfEU">
          {"React On Rails Tutorial Series"->React.string}
        </a>
        {"."->React.string}
      </li>
      <li>
        <a href="http://www.shakacode.com"> {"ShakaCode"->React.string} </a>
        {" is doing support for React on Rails, \
          including a private Slack channel, \
          source code reviews, and pair programming sessions. "->React.string}
        <b>
          <a href="http://www.shakacode.com/work/index.html"> {"Click here"->React.string} </a>
        </b>
        {" for more information."->React.string}
      </li>
    </ul>
    <hr className="border-t my-8" />
  </div>
}
