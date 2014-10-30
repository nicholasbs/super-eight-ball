var SuperEightBall = React.createClass({
  getInitialState: function () {
    return {buffer: "", display: ""};
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
      <div id="super-eight-ball">
        <input ref="input" value={this.state.buffer} onChange={this.updateBuffer} />
        <em>{this.state.display}</em>
      </div>
    );
  },

  updateBuffer: function (e) {
    this.setState({buffer: e.target.value});
  },

  handleKeyDown: function (e) {
    if (e.keyCode === 13) { // Return
      this.setState({display: this.state.buffer, buffer: ""});
    }
  }
});

React.render(<SuperEightBall />, document.getElementById("container"));
