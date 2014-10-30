var SuperEightBall = React.createClass({displayName: 'SuperEightBall',
  getInitialState: function () {
    return {buffer: ""};
  },

  componentWillMount: function () {
    $(document).on("keydown", this.handleKeyDown);
  },

  componentWillUnmount: function () {
    $(document).off("keydown", this.handleKeyDown);
  },

  componentDidMount: function () {
    this.refs.input.getDOMNode().focus();
  },

  render: function () {
    return (
      React.createElement("div", {id: "super-eight-ball"}, 
        React.createElement("input", {ref: "input", value: this.state.buffer, onChange: this.updateBuffer})
      )
    );
  },

  updateBuffer: function (e) {
    this.setState({buffer: e.target.value});
  },

  handleKeyDown: function (e) {
    if (e.keyCode === 13) { // Return
      ball.setText(this.state.buffer);
      this.setState({buffer: ""});
    }
  }
});

React.render(React.createElement(SuperEightBall, null), document.getElementById("container"));
