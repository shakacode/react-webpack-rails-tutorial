@react.component
let make = () => {
  <>
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
        {"Read "->React.string} <a href="https://shakacode.gitbooks.io/react-on-rails/content/"> 
        {"Documentation for React on Rails"->React.string}
        </a>
        <a href="https://www.shakacode.com/blog/the-react-on-rails-doctrine">
          {React.string("The React on Rails Doctrine.")}
        </a>
      </li>
      <li>
        {React.string("See our React Native Client: ")}
        <a href="https://github.com/shakacode/react-native-tutorial">
          {React.string("shakacode/react-native-tutorial")}
        </a>
        {React.string(".")}
      </li>
      <li>
        {React.string("Watch the ")}
        <a href="https://www.youtube.com/playlist?list=PL5VAKH-U1M6dj84BApfUtvBjvF-0-JfEU">
          {React.string("React On Rails Tutorial Series")}
        </a>
        {React.string(".")}
      </li>
      <li>
        <a href="http://www.shakacode.com">{"ShakaCode"->React.string}</a>
        {React.string(" is doing support for React on Rails, including a private Slack channel, source code reviews, and pair programming sessions. ")}
        <b>
          <a href="http://www.shakacode.com/work/index.html">{"Click here"->React.string}</a>
        </b>
        {React.string(" for more information.")}
      </li>
    </ul>
    <hr/>
  </>
}