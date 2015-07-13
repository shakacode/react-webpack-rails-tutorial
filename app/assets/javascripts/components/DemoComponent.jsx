var DemoComponent = React.createClass({displayName: 'Demo Component',
  render: function() {
    return <div>Demo Component</div>;
  }
});

// each file will export exactly one component
module.exports = DemoComponent;
