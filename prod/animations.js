var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FlowAnimation = function (_React$Component) {
  _inherits(FlowAnimation, _React$Component);

  function FlowAnimation(props) {
    _classCallCheck(this, FlowAnimation);

    var _this = _possibleConstructorReturn(this, (FlowAnimation.__proto__ || Object.getPrototypeOf(FlowAnimation)).call(this, props));

    _this.state = {
      leftFlowWidth: 0,
      rightFlowWidth: 40,
      offset: 0
    };
    return _this;
  }

  _createClass(FlowAnimation, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.timerID = setInterval(function () {
        return _this2.tick();
      }, 10);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearInterval(this.timerID);
    }
  }, {
    key: "tick",
    value: function tick() {
      if (this.state.offset < 60) {
        this.setState({
          leftFlowWidth: this.state.leftFlowWidth,
          rightFlowWidth: this.state.rightFlowWidth,
          offset: this.state.offset + 1
        });
      } else if (this.state.leftFlowWidth < 40) {

        this.setState({
          leftFlowWidth: this.state.leftFlowWidth + 1,
          rightFlowWidth: this.state.rightFlowWidth - 1,
          offset: this.state.offset
        });
      } else {
        this.setState({
          leftFlowWidth: 0,
          rightFlowWidth: 40,
          offset: 0
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { id: "flow-animation-wrapper" },
        React.createElement("div", { id: "flow-element-left", style: { width: this.state.leftFlowWidth + "%" } }),
        React.createElement("div", { id: "inbetween-flowing-elements", style: { width: this.state.offset + "%" } }),
        React.createElement("div", { id: "flow-element-right", style: { width: this.state.rightFlowWidth + "%" } })
      );
    }
  }]);

  return FlowAnimation;
}(React.Component);

var CheckAnimation = function (_React$Component2) {
  _inherits(CheckAnimation, _React$Component2);

  function CheckAnimation(props) {
    _classCallCheck(this, CheckAnimation);

    var _this3 = _possibleConstructorReturn(this, (CheckAnimation.__proto__ || Object.getPrototypeOf(CheckAnimation)).call(this, props));

    _this3.state = {
      leftWidth: 0,
      rightWidth: 0
    };
    return _this3;
  }

  _createClass(CheckAnimation, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this4 = this;

      this.timerID = setInterval(function () {
        return _this4.tick();
      }, 10);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearInterval(this.timerID);
    }
  }, {
    key: "tick",
    value: function tick() {
      if (this.state.leftWidth < 2) {
        this.setState({
          leftWidth: this.state.leftWidth + 0.1,
          rightWidth: this.state.rightWidth
        });
      } else if (this.state.rightWidth < 5) {
        this.setState({
          leftWidth: this.state.leftWidth,
          rightWidth: this.state.rightWidth + 0.1
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "svg",
          { "class": "checkmark", viewBox: "0 0 52 52", xmlns: "http://www.w3.org/2000/svg" },
          React.createElement("circle", { className: "checkmark-circle", cx: "50", cy: "50", r: "50" }),
          React.createElement("path", { "class": "checkmark-check", fill: "none", d: "M14.1 27.2l7.1 7.2 16.7-16.8" })
        )
      );
    }
  }]);

  return CheckAnimation;
}(React.Component);

ReactDOM.render(React.createElement(CheckAnimation, null), document.getElementById('root'));