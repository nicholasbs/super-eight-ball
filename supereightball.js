var SuperEightBall = React.createClass({displayName: 'SuperEightBall',
  getInitialState: function () {
    return {
      predictions: [],
      buffer: "",
      index: 0
    };
  },

  componentWillMount: function () {
    $(document).on("keyup", this.handleKeyUp);
  },

  componentWillUnmount: function () {
    $(document).off("keyup", this.handleKeyUp);
  },

  render: function () {
    return (
      React.createElement("div", {id: "super-eight-ball"}, 
        React.createElement("em", null, this.state.predictions[this.state.index])
      )
    );
  },

  handleKeyUp: function (e) {
    var index = this.state.index,
        predictions = this.state.predictions,
        buffer = this.state.buffer;

    if (e.keyCode === 40 && index < predictions.length - 1) { // Down arrow
      this.setState({index: index + 1});
    } else if (e.keyCode === 38 && index > 0) { // Up arrow
      this.setState({index: index - 1});
    } else if (e.keyCode === 13 && buffer) { // Return
      predictions.push(buffer);
      this.setState({
        predictions: predictions,
        buffer: "",
        index: predictions.length - 1
      });
    } else if (e.keyCode >= 32 && e.keyCode <= 122) {
      buffer += String.fromCharCode(e.keyCode);
      this.setState({buffer: buffer});
    }
  }
});
 
React.render(React.createElement(SuperEightBall, null), document.getElementById("container"));
