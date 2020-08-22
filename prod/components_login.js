var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import FlowAnimation from 'animations';


/*
#########################################
##      Globale Variablen/Enums        ##
#########################################
*/
var processSteps = {
  LANDING: 0,
  BEGIN: 1,
  AUSWAHL: 2,
  WAITFORSTICK: 3,
  PIN: 4,
  ABFRAGE: 5,
  SUCCESS: 6,
  DONE: 7
};

var userEvents = {
  ENTERUSB: 0,
  PRESSUSB: 1
};

var siteEvents = {
  START: 0,
  USEUSB: 1,
  ENTERPIN: 2,
  SUCCESS: 3,
  RESTART: 4,
  LOGIN: 5,
  REGISTER: 6
};

var currentStep = processSteps.LANDING;

var usbStickPluggedIn = false;
var registration = false;
var userName = "";
var knownUserName = [];

function handleProcess(event) {
  switch (currentStep) {
    case processSteps.LANDING:
      if (event == siteEvents.REGISTER) {
        currentStep = processSteps.BEGIN;
      } else if (event == siteEvents.LOGIN) {
        userName = document.getElementById("user-name").value;
        if (userName != "") {
          console.log(knownUserName.includes(userName));
          if (!knownUserName.includes(userName)) {
            alert("Der Nutzername ist bisher nicht registriert. Bitte registrieren Sie sich zuerst.");
          } else {
            currentStep = processSteps.AUSWAHL;
            registration = false;
          }
        } else {
          alert("Es wurde kein Nutzername eingegeben.");
        }
      }

      break;
    case processSteps.BEGIN:
      if (event == siteEvents.REGISTER) {
        userName = document.getElementById("user-name").value;
        if (userName != "") {
          currentStep = processSteps.AUSWAHL;
          registration = true;
        } else {
          alert("Es wurde kein Nutzername eingegeben.");
        }
      }
    case processSteps.AUSWAHL:
      if (event == siteEvents.USEUSB) {
        currentStep = processSteps.WAITFORSTICK;
      }
      break;
    case processSteps.WAITFORSTICK:
      if (event == userEvents.PRESSUSB && usbStickPluggedIn) {
        currentStep = processSteps.SUCCESS;
      } else if (event == userEvents.PRESSUSB) {
        alert("USB-Stick ist nicht eingesteckt.");
      }
      break;
    case processSteps.PIN:
      if (event == siteEvents.ENTERPIN) {
        currentStep = processSteps.SUCCESS;
      }
      break;
    case processSteps.SUCCESS:
      if (event == siteEvents.SUCCESS) {
        currentStep = processSteps.DONE;
      }
      break;
    case processSteps.DONE:
      if (event == siteEvents.RESTART) {
        if (registration) {
          registration = false;
          knownUserName.push(userName);
          currentStep = processSteps.LANDING;
        } else {
          registration = false;
          knownUserName = [];
          userName = "";
          currentStep = processSteps.LANDING;
        }
      }
      break;
  }
  ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
}

/*
This component should display a prototype version of the website, with which we can interact.
*/

var PrototypeWebsite = function (_React$Component) {
  _inherits(PrototypeWebsite, _React$Component);

  function PrototypeWebsite(props) {
    _classCallCheck(this, PrototypeWebsite);

    return _possibleConstructorReturn(this, (PrototypeWebsite.__proto__ || Object.getPrototypeOf(PrototypeWebsite)).call(this, props));
  }

  _createClass(PrototypeWebsite, [{
    key: "render",
    value: function render() {
      var popOverVisible = false;
      var showLanding = this.props.isLanding;
      var showData = this.props.isSuccess;

      switch (currentStep) {
        case processSteps.AUSWAHL:
          popOverVisible = true;
          break;
        case processSteps.WAITFORSTICK:
          popOverVisible = true;
          break;
        case processSteps.PIN:
          popOverVisible = true;
          break;
        case processSteps.ABFRAGE:
          popOverVisible = true;
          break;
        case processSteps.SUCCESS:
          popOverVisible = true;
          break;
      }

      return React.createElement(
        "div",
        { id: "website" },
        React.createElement(
          "div",
          { className: "login-box" },
          React.createElement(Popover, { visible: popOverVisible }),
          React.createElement(ProtoHeader, null),
          React.createElement(ProtoMain, { showData: showData, showLanding: showLanding })
        )
      );
    }
  }]);

  return PrototypeWebsite;
}(React.Component);

var ProtoHeader = function (_React$Component2) {
  _inherits(ProtoHeader, _React$Component2);

  function ProtoHeader(props) {
    _classCallCheck(this, ProtoHeader);

    return _possibleConstructorReturn(this, (ProtoHeader.__proto__ || Object.getPrototypeOf(ProtoHeader)).call(this, props));
  }

  _createClass(ProtoHeader, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { id: "proto-header" },
        React.createElement(
          "h1",
          { className: "" },
          React.createElement(
            "span",
            { style: { color: "#3064BF" } },
            "Beispieldienst"
          )
        )
      );
    }
  }]);

  return ProtoHeader;
}(React.Component);

var ProtoMain = function (_React$Component3) {
  _inherits(ProtoMain, _React$Component3);

  function ProtoMain(props) {
    _classCallCheck(this, ProtoMain);

    return _possibleConstructorReturn(this, (ProtoMain.__proto__ || Object.getPrototypeOf(ProtoMain)).call(this, props));
  }

  _createClass(ProtoMain, [{
    key: "start",
    value: function start() {
      handleProcess(siteEvents.START);
    }
  }, {
    key: "render",
    value: function render() {
      if (this.props.showLanding) {
        return React.createElement(
          "div",
          { id: "proto-main" },
          React.createElement(
            "h2",
            { style: { textAlign: "center" } },
            "Bei Ihrem Account anmelden"
          ),
          React.createElement(
            "p",
            { className: "user-name-caption" },
            "E-Mail/Nutzername"
          ),
          React.createElement("input", { id: "user-name", className: "user-name-input", type: "text" }),
          React.createElement(
            "button",
            {
              className: "proto-button",
              onClick: function onClick() {
                return handleProcess(siteEvents.LOGIN);
              }
            },
            "Passwortlos anmelden"
          ),
          React.createElement(Placeholder, { content: "oder" }),
          React.createElement(
            "p",
            { className: "user-name-caption" },
            "Passwort"
          ),
          React.createElement("input", { className: "user-name-input", type: "password" }),
          React.createElement(
            "button",
            {
              className: "proto-button",
              onClick: function onClick() {
                return alert("Diese Funktion steht auf dieser Demoseite nicht zur Verfügung.");
              }
            },
            "Login"
          ),
          React.createElement(
            "p",
            { style: { textAlign: "center" } },
            "Sie haben noch keinen Account? ",
            React.createElement(
              "a",
              { onClick: function onClick() {
                  return handleProcess(siteEvents.REGISTER);
                } },
              "Jetzt hier registrieren"
            )
          )
        );
      } else if (!this.props.showData) {
        return React.createElement(
          "div",
          { id: "proto-main" },
          React.createElement(
            "h2",
            { style: { textAlign: "center" } },
            "Neuen Account registrieren"
          ),
          React.createElement(
            "p",
            { className: "user-name-caption" },
            "E-Mail/Nutzername"
          ),
          React.createElement("input", { id: "user-name", className: "user-name-input", type: "text" }),
          React.createElement(
            "button",
            {
              className: "proto-button",
              onClick: function onClick() {
                return handleProcess(siteEvents.REGISTER);
              }
            },
            "Passwortlos registrieren"
          ),
          React.createElement(Placeholder, { content: "oder" }),
          React.createElement(
            "p",
            { className: "user-name-caption" },
            "Password"
          ),
          React.createElement("input", { className: "user-name-input", type: "password" }),
          React.createElement(
            "button",
            {
              className: "proto-button",
              onClick: function onClick() {
                return alert("Diese Funktion steht auf dieser Demoseite nicht zur Verfügung.");
              }
            },
            "Registrieren"
          )
        );
      } else {
        if (registration) {
          return React.createElement(
            "div",
            { id: "proto-main" },
            React.createElement(
              "h2",
              null,
              "Registrierung erfolgreich"
            ),
            React.createElement(
              "p",
              null,
              "Ihr Account wurde erstellt und mit Ihrem Sicherheitsschl\xFCssel verkn\xFCpft.",
              React.createElement("br", null),
              "Bitte gehen Sie zur\xFCck zum Start und loggen sich ein. "
            ),
            React.createElement(
              "button",
              {
                id: "restart-button",
                className: "proto-button",
                onClick: function onClick() {
                  return handleProcess(siteEvents.RESTART);
                }
              },
              "Zur\xFCck zum Start"
            )
          );
        } else {
          return React.createElement(
            "div",
            { id: "proto-main" },
            React.createElement(
              "h2",
              null,
              "Erfolgreich eingeloggt"
            ),
            React.createElement(
              "p",
              null,
              "Sie k\xF6nnen den Dienst nun wie gewohnt nutzen."
            ),
            React.createElement(
              "button",
              {
                id: "restart-button",
                className: "proto-button",
                onClick: function onClick() {
                  return handleProcess(siteEvents.RESTART);
                }
              },
              "Prototypen neu starten"
            )
          );
        }
      }
    }
  }]);

  return ProtoMain;
}(React.Component);

var Placeholder = function (_React$Component4) {
  _inherits(Placeholder, _React$Component4);

  function Placeholder(props) {
    _classCallCheck(this, Placeholder);

    return _possibleConstructorReturn(this, (Placeholder.__proto__ || Object.getPrototypeOf(Placeholder)).call(this, props));
  }

  _createClass(Placeholder, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "placeholder-wrapper" },
        React.createElement("div", { className: "placeholder-line" }),
        React.createElement(
          "div",
          { className: "placeholder-content" },
          this.props.content
        ),
        React.createElement("div", { className: "placeholder-line" })
      );
    }
  }]);

  return Placeholder;
}(React.Component);

var Footer = function (_React$Component5) {
  _inherits(Footer, _React$Component5);

  function Footer(props) {
    _classCallCheck(this, Footer);

    return _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).call(this, props));
  }

  _createClass(Footer, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { style: { display: "flex", alignItems: "center" } },
          React.createElement(
            "a",
            { href: "https://www.bmbf.de/de/software-sprint-freie-programmierer-unterstuetzen-3512.html" },
            React.createElement("img", { src: "../../../ressourcen/BMBF_gef%C3%AErdert%20vom_deutsch.jpg", height: "90", alt: "BMBF" })
          ),
          React.createElement(
            "a",
            { href: "https://prototypefund.de/" },
            React.createElement("img", { src: "https://i0.wp.com/blog.okfn.org/files/2017/12/22137279_1679687182104997_6759961652435307500_o.jpg", width: "100", alt: "Prototype Fund" })
          )
        ),
        React.createElement(
          "div",
          { "class": "footer" },
          React.createElement(
            "p",
            null,
            "Diese Demo ist Teil des Projekts Identity Stick. Das Projekt Identity Stick ist Finalist der PrototypeFund Runde 7.",
            React.createElement(
              "a",
              { style: { marginLeft: "2em" }, href: "https://identity-stick.github.io/impressum" },
              "Impressum"
            )
          )
        )
      );
    }
  }]);

  return Footer;
}(React.Component);

var UserInputBox = function (_React$Component6) {
  _inherits(UserInputBox, _React$Component6);

  function UserInputBox(props) {
    _classCallCheck(this, UserInputBox);

    return _possibleConstructorReturn(this, (UserInputBox.__proto__ || Object.getPrototypeOf(UserInputBox)).call(this, props));
  }

  _createClass(UserInputBox, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { id: "user-input-box" },
        React.createElement(
          "h2",
          null,
          this.props.title
        ),
        React.createElement(
          "p",
          null,
          this.props.text
        ),
        React.createElement(UserInput, { inactiveMessage: "USB Stick einstecken", activeMessage: "USB Stick entfernen", active: usbStickPluggedIn, position: "left", type: userEvents.ENTERUSB }),
        React.createElement(UserInput, { inactiveMessage: "Knopf dr\xFCcken", position: "middle", type: userEvents.PRESSUSB }),
        React.createElement(Footer, null)
      );
    }
  }]);

  return UserInputBox;
}(React.Component);

var UserInput = function (_React$Component7) {
  _inherits(UserInput, _React$Component7);

  function UserInput(props) {
    _classCallCheck(this, UserInput);

    var _this7 = _possibleConstructorReturn(this, (UserInput.__proto__ || Object.getPrototypeOf(UserInput)).call(this, props));

    _this7.state = { active: false };
    _this7.press = _this7.press.bind(_this7);
    return _this7;
  }

  _createClass(UserInput, [{
    key: "press",
    value: function press() {
      if (this.props.type == userEvents.ENTERUSB) {
        usbStickPluggedIn = !usbStickPluggedIn;
        this.setState({ active: !this.state.active });
      }
      handleProcess(this.props.type);
    }
  }, {
    key: "render",
    value: function render() {
      var classes = void 0;
      var currentState = void 0;
      if (this.state.active) {
        classes = "user-input active " + this.props.position;
        currentState = this.props.activeMessage;
      } else {
        classes = "user-input inactive " + this.props.position;
        currentState = this.props.inactiveMessage;
      }
      return React.createElement(
        "button",
        {
          className: classes,
          onClick: this.press },
        React.createElement(
          "p",
          { style: { fontWeight: "bold" } },
          currentState
        )
      );
    }
  }]);

  return UserInput;
}(React.Component);

var FlowAnimation = function (_React$Component8) {
  _inherits(FlowAnimation, _React$Component8);

  function FlowAnimation(props) {
    _classCallCheck(this, FlowAnimation);

    var _this8 = _possibleConstructorReturn(this, (FlowAnimation.__proto__ || Object.getPrototypeOf(FlowAnimation)).call(this, props));

    _this8.state = {
      leftFlowWidth: 0,
      rightFlowWidth: 40,
      offset: 0
    };
    return _this8;
  }

  _createClass(FlowAnimation, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this9 = this;

      this.timerID = setInterval(function () {
        return _this9.tick();
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

var CheckAnimation = function (_React$Component9) {
  _inherits(CheckAnimation, _React$Component9);

  function CheckAnimation(props) {
    _classCallCheck(this, CheckAnimation);

    return _possibleConstructorReturn(this, (CheckAnimation.__proto__ || Object.getPrototypeOf(CheckAnimation)).call(this, props));
  }

  _createClass(CheckAnimation, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "svg",
          { className: "checkmark", viewBox: "0 0 52 52", xmlns: "http://www.w3.org/2000/svg" },
          React.createElement("circle", { className: "checkmark-circle", cx: "50", cy: "50", r: "50" }),
          React.createElement("path", { className: "checkmark-check", fill: "none", d: " M 14.1 27.2 l 7.1 7.2 16.7-16.8" })
        )
      );
    }
  }]);

  return CheckAnimation;
}(React.Component);

var Popover = function (_React$Component10) {
  _inherits(Popover, _React$Component10);

  function Popover(props) {
    _classCallCheck(this, Popover);

    return _possibleConstructorReturn(this, (Popover.__proto__ || Object.getPrototypeOf(Popover)).call(this, props));
  }

  _createClass(Popover, [{
    key: "render",
    value: function render() {
      var style = {};
      if (!this.props.visible) {
        style = { display: 'none' };
      }
      return React.createElement(
        "div",
        { id: "opaque-overlay", style: style },
        React.createElement(PopoverOverlay, { content: this.props.content })
      );
    }
  }]);

  return Popover;
}(React.Component);

var PopoverOverlay = function (_React$Component11) {
  _inherits(PopoverOverlay, _React$Component11);

  function PopoverOverlay(props) {
    _classCallCheck(this, PopoverOverlay);

    return _possibleConstructorReturn(this, (PopoverOverlay.__proto__ || Object.getPrototypeOf(PopoverOverlay)).call(this, props));
  }

  _createClass(PopoverOverlay, [{
    key: "makeInvisible",
    value: function makeInvisible() {
      if (registration) {
        currentStep = processSteps.BEGIN;
      } else {
        currentStep = processSteps.LANDING;
      }

      handleProcess();
    }
  }, {
    key: "render",
    value: function render() {

      //Create correct button
      var buttonContent = "Abbrechen";
      var buttonAction = this.makeInvisible;
      if (currentStep == processSteps.PIN) {
        buttonContent = "Ok";
        buttonAction = function buttonAction() {
          return handleProcess(siteEvents.ENTERPIN);
        };
      }
      if (currentStep == processSteps.SUCCESS) {
        buttonContent = "Schließen";
        buttonAction = function buttonAction() {
          handleProcess(siteEvents.SUCCESS);
        };
      }

      return React.createElement(
        "div",
        { className: "popover" },
        React.createElement(PopOverlayHeader, null),
        React.createElement(PopOverlayContent, null),
        React.createElement(
          "p",
          { align: "right" },
          React.createElement(
            "button",
            { onClick: buttonAction },
            buttonContent
          )
        )
      );
    }
  }]);

  return PopoverOverlay;
}(React.Component);

var PopOverlayHeader = function (_React$Component12) {
  _inherits(PopOverlayHeader, _React$Component12);

  function PopOverlayHeader(props) {
    _classCallCheck(this, PopOverlayHeader);

    return _possibleConstructorReturn(this, (PopOverlayHeader.__proto__ || Object.getPrototypeOf(PopOverlayHeader)).call(this, props));
  }

  _createClass(PopOverlayHeader, [{
    key: "render",
    value: function render() {
      var content = void 0;
      switch (currentStep) {
        case processSteps.AUSWAHL:
          content = React.createElement(
            "div",
            { className: "popover-wrapper" },
            React.createElement(
              "div",
              { className: "popover-icon" },
              React.createElement("img", { src: "icons/used-key-bg.png", alt: "Schwarzwei\xDFes Icon von einem Schl\xFCssel, der in ein Schl\xFCsselloch gesteckt wird" })
            ),
            React.createElement(
              "p",
              { className: "popover-text" },
              "Pers\xF6nlichen Sicherheitsschl\xFCssel mit beispieldienst.de verwenden."
            )
          );
          break;
        case processSteps.WAITFORSTICK:
          content = React.createElement(
            "div",
            { className: "popover-wrapper" },
            React.createElement(
              "div",
              { className: "popover-icon" },
              React.createElement("img", { src: "icons/usb-stick-bg.png", alt: "Schwarzwei\xDFes Icon von einem USB Stick" })
            ),
            React.createElement(
              "p",
              { className: "popover-text" },
              "Stecken Sie jetzt Ihren USB-Stick ein oder nutzen Sie Bluetooth zur Verbindung"
            )
          );
          break;
        case processSteps.PIN:
          content = React.createElement(
            "div",
            { className: "popover-wrapper" },
            React.createElement(
              "div",
              { className: "popover-icon" },
              React.createElement("img", { src: "icons/bestaetigung-bg.png", alt: "Schwarzwei\xDFes Icon von einem Siegel mit einem Haken darin. Soll ein Vertrauenssymbol darstellen" })
            ),
            React.createElement(
              "p",
              { className: "popover-text" },
              "PIN Eingabe"
            )
          );
          break;
        case processSteps.ABFRAGE:
          content = React.createElement(
            "div",
            { className: "popover-wrapper" },
            React.createElement(
              "div",
              { className: "popover-icon" },
              React.createElement("img", { src: "icons/auswahl-bg.png", alt: "Schwarzwei\xDFes Icon von einem Mauszeiger, der auf ein gestricheltes Quadrat dr\xFCckt" })
            ),
            React.createElement(
              "p",
              { className: "popover-text" },
              "\xDCbertragung Ihrer pers\xF6nlichen Daten"
            )
          );
          break;
        case processSteps.SUCCESS:
          console.log(registration);
          if (registration) {
            content = React.createElement(
              "div",
              { className: "popover-wrapper" },
              React.createElement(
                "div",
                { className: "popover-icon" },
                React.createElement("img", { src: "icons/bestaetigung-bg.png", alt: "Schwarzwei\xDFes Icon von einem Siegel mit einem Haken darin. Soll ein Vertrauenssymbol darstellen" })
              ),
              React.createElement(
                "p",
                { className: "popover-text" },
                "Registrierung erfolgreich!"
              )
            );
          } else {
            content = React.createElement(
              "div",
              { className: "popover-wrapper" },
              React.createElement(
                "div",
                { className: "popover-icon" },
                React.createElement("img", { src: "icons/bestaetigung-bg.png", alt: "Schwarzwei\xDFes Icon von einem Siegel mit einem Haken darin. Soll ein Vertrauenssymbol darstellen" })
              ),
              React.createElement(
                "p",
                { className: "popover-text" },
                "Login erfolgreich!"
              )
            );
          }

          break;
      }
      //Show animation only, when waiting for interaction
      if (currentStep == processSteps.WAITFORSTICK || currentStep == processSteps.ABFRAGE) {

        return React.createElement(
          "div",
          null,
          React.createElement(FlowAnimation, null),
          React.createElement(
            "div",
            { id: "popover-header" },
            content
          )
        );
      } else {
        return React.createElement(
          "div",
          { id: "popover-header", style: { paddingTop: "1.5em" } },
          content
        );
      }
    }
  }]);

  return PopOverlayHeader;
}(React.Component);

var PopOverlayContent = function (_React$Component13) {
  _inherits(PopOverlayContent, _React$Component13);

  function PopOverlayContent(props) {
    _classCallCheck(this, PopOverlayContent);

    return _possibleConstructorReturn(this, (PopOverlayContent.__proto__ || Object.getPrototypeOf(PopOverlayContent)).call(this, props));
  }

  _createClass(PopOverlayContent, [{
    key: "render",
    value: function render() {
      var content = void 0;
      switch (currentStep) {
        case processSteps.AUSWAHL:
          content = React.createElement(
            "div",
            { id: "popover-content" },
            React.createElement(
              "p",
              null,
              "Optionen"
            ),
            React.createElement(
              "div",
              { className: "popover-wrapper" },
              React.createElement(
                "div",
                { className: "popover-icon" },
                React.createElement("img", { src: "icons/usb-stick-bg.png", alt: "Schwarzwei\xDFes Icon von inem USB Stick" })
              ),
              React.createElement(
                "button",
                { className: "popover-user-input-button", onClick: function onClick() {
                    return handleProcess(siteEvents.USEUSB);
                  } },
                "USB-Stick verwenden"
              )
            ),
            React.createElement(
              "div",
              { className: "popover-wrapper" },
              React.createElement(
                "div",
                { className: "popover-icon" },
                React.createElement("img", { src: "icons/fingerabdruck-bg.png", alt: "Schwarzwei\xDFes Icon von einem Fingerabdruck" })
              ),
              React.createElement(
                "button",
                { className: "popover-user-input-button" },
                "Smartphone/Computer verwenden"
              )
            )
          );
          break;
        case processSteps.WAITFORSTICK:
          if (registration) {
            content = React.createElement(
              "div",
              { id: "popover-content" },
              React.createElement(PopoverContentWithIcon, {
                icon: "icons/info-bg.png",
                alt: "Schwarzwei\xDFes Icon aus einem Kreis in dem ein kleines i ist.",
                contentClass: "popover-info",
                content: "Beispieldienst.de m\xF6chte Ihren USB-Stick als Sicherheitsschl\xFCssel registrieren."
              }),
              React.createElement(PopoverContentWithIcon, {
                icon: "icons/usb-stick-bg.png",
                alt: "Schwarzwei\xDFes Icon von einem USB Stick",
                contentClass: "popover-request",
                content: "Tippen Sie jetzt zur Best\xE4tigung auf Ihren USB-Stick."
              })
            );
          } else {
            content = React.createElement(
              "div",
              { id: "popover-content" },
              React.createElement(PopoverContentWithIcon, {
                icon: "icons/info-bg.png",
                alt: "Schwarzwei\xDFes Icon aus einem Kreis in dem ein kleines i ist.",
                contentClass: "popover-info",
                content: "Beispieldienst.de m\xF6chte Sie mit Ihrem USB-Stick einloggen."
              }),
              React.createElement(PopoverContentWithIcon, {
                icon: "icons/usb-stick-bg.png",
                alt: "Schwarzwei\xDFes Icon von einem USB Stick",
                contentClass: "popover-request",
                content: "Tippen Sie jetzt zur Best\xE4tigung auf Ihren USB-Stick."
              })
            );
          }

          break;
        case processSteps.PIN:
          content = React.createElement(
            "div",
            { id: "popover-content" },
            React.createElement(PopoverContentWithIcon, {
              icon: "icons/info-bg.png",
              alt: "Schwarzwei\xDFes Icon aus einem Kreis in dem ein kleines i ist.",
              contentClass: "popover-info",
              content: "Geben Sie jetzt die PIN Ihres pers\xF6nlichen USB-Sticks ein."
            }),
            React.createElement(PinEingabe, null)
          );
          break;
        case processSteps.ABFRAGE:
          content = React.createElement(
            "div",
            { id: "popover-content" },
            React.createElement(PopoverContentWithIcon, {
              icon: "icons/info-bg.png",
              alt: "Schwarzwei\xDFes Icon aus einem Kreis in dem ein kleines i ist.",
              contentClass: "popover-info",
              content: "Beispieldienst.de m\xF6chte folgende Informationen abfragen, um Ihre Identit\xE4t festzustellen:"
            }),
            React.createElement(
              "ul",
              null,
              React.createElement(
                "li",
                null,
                "Vorname(n)"
              ),
              React.createElement(
                "li",
                null,
                "Familienname(n)"
              ),
              React.createElement(
                "li",
                null,
                "Geburtsdatum"
              )
            ),
            React.createElement(PopoverContentWithIcon, {
              icon: "icons/usb-stick-bg.png",
              alt: "Schwarzwei\xDFes Icon von einem USB Stick",
              contentClass: "popover-request",
              content: "Tippen Sie jetzt auf Ihren USB-Stick, um die Informationen zu \xFCbertragen."
            })
          );
          break;
        case processSteps.SUCCESS:

          if (registration) {
            content = React.createElement(
              "div",
              { id: "popover-content" },
              React.createElement(PopoverContentWithIcon, {
                icon: "icons/info-bg.png",
                alt: "Schwarzwei\xDFes Icon aus einem Kreis in dem ein kleines i ist.",
                contentClass: "popover-info",
                content: "Ihr USB-Stick wurde registiert."
              }),
              React.createElement(CheckAnimation, null)
            );
          } else {
            content = React.createElement(
              "div",
              { id: "popover-content" },
              React.createElement(PopoverContentWithIcon, {
                icon: "icons/info-bg.png",
                alt: "Schwarzwei\xDFes Icon aus einem Kreis in dem ein kleines i ist.",
                contentClass: "popover-info",
                content: "Sie wurden eingeloggt."
              }),
              React.createElement(CheckAnimation, null)
            );
          }
          break;

      }
      return React.createElement(
        "div",
        null,
        content
      );
    }
  }]);

  return PopOverlayContent;
}(React.Component);

var PopoverContentWithIcon = function (_React$Component14) {
  _inherits(PopoverContentWithIcon, _React$Component14);

  function PopoverContentWithIcon(props) {
    _classCallCheck(this, PopoverContentWithIcon);

    return _possibleConstructorReturn(this, (PopoverContentWithIcon.__proto__ || Object.getPrototypeOf(PopoverContentWithIcon)).call(this, props));
  }

  _createClass(PopoverContentWithIcon, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "popover-wrapper" },
        React.createElement(
          "div",
          { className: "popover-icon" },
          React.createElement("img", { src: this.props.icon, alt: this.props.alt })
        ),
        React.createElement(
          "p",
          { className: this.props.contentClass },
          this.props.content
        )
      );
    }
  }]);

  return PopoverContentWithIcon;
}(React.Component);

var PinEingabe = function (_React$Component15) {
  _inherits(PinEingabe, _React$Component15);

  function PinEingabe(props) {
    _classCallCheck(this, PinEingabe);

    var _this16 = _possibleConstructorReturn(this, (PinEingabe.__proto__ || Object.getPrototypeOf(PinEingabe)).call(this, props));

    _this16.onKeyUp = _this16.onKeyUp.bind(_this16);
    return _this16;
  }

  _createClass(PinEingabe, [{
    key: "onKeyUp",
    value: function onKeyUp(event) {
      if (event.charCode === 13) {
        handleProcess(siteEvents.ENTERPIN);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "popover-wrapper" },
          React.createElement("div", { className: "popover-icon" }),
          React.createElement("input", { type: "password", id: "pin-eingabe", onKeyPress: this.onKeyUp })
        )
      );
    }
  }]);

  return PinEingabe;
}(React.Component);

var InfoBox = function (_React$Component16) {
  _inherits(InfoBox, _React$Component16);

  function InfoBox(props) {
    _classCallCheck(this, InfoBox);

    return _possibleConstructorReturn(this, (InfoBox.__proto__ || Object.getPrototypeOf(InfoBox)).call(this, props));
  }

  _createClass(InfoBox, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { "class": "popover-info-box" },
        React.createElement(
          "div",
          { style: { width: "100%", fontWeight: "bold" } },
          "HINWEIS:"
        ),
        this.props.content
      );
    }
  }]);

  return InfoBox;
}(React.Component);
/*
This component displays the whole website. Rerender this, if all components need to be updated
*/


var App = function (_React$Component17) {
  _inherits(App, _React$Component17);

  function App(props) {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      var text = {};
      var isSuccess = false;
      var isLanding = false;
      console.log(currentStep);
      if (currentStep != processSteps.BEGIN && !registration && currentStep != processSteps.DONE) {
        isLanding = true;
      }
      if (currentStep == processSteps.DONE) {
        isSuccess = true;
      }
      return React.createElement(
        "div",
        null,
        React.createElement(InfoBox, { content: "Dies ist eine Demo-Webseite. Es werden keinerlei Informationen \xFCbertragen." }),
        React.createElement(PrototypeWebsite, { isLanding: isLanding, isSuccess: isSuccess }),
        React.createElement(UserInputBox, Object.assign({ title: "Bitte nutzen Sie die Buttons als Input f\xFCr die Demo-Webseite" }, text))
      );
    }
  }]);

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));