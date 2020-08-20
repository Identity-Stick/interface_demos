//import FlowAnimation from 'animations';


/*
#########################################
##      Globale Variablen/Enums        ##
#########################################
*/
const processSteps = {
  LANDING: 0,
  BEGIN: 1,
  AUSWAHL: 2,
  WAITFORSTICK: 3,
  PIN: 4,
  CONFIRM: 5,
  ABFRAGE: 6,
  SUCCESS: 7,
  GETDATA: 8,
}

const userEvents = {
  ENTERUSB: 0,
  PRESSUSB: 1,
}

const siteEvents = {
  START: 3,
  USEUSB: 4,
  ENTERPIN: 5,
  SUCCESS: 6,
  RESTART: 7,
}

let currentStep = processSteps.LANDING;

let usbStickPluggedIn = false;

function handleProcess(event){
  switch(currentStep){
    case processSteps.LANDING:
        if(event == siteEvents.START){
            currentStep = processSteps.BEGIN
          }
        break;
    case processSteps.BEGIN:
        if(event == siteEvents.START){
          currentStep = processSteps.AUSWAHL
        }
      break;
    case processSteps.AUSWAHL:
        if(event == siteEvents.USEUSB){
          if(!usbStickPluggedIn){
            currentStep = processSteps.WAITFORSTICK 
          }else{
            currentStep = processSteps.PIN
          }
        }
      break;
    case processSteps.WAITFORSTICK:
        if(event == userEvents.ENTERUSB){
          currentStep = processSteps.PIN;
        }
      break;
    case processSteps.PIN:
        if( event == siteEvents.ENTERPIN){
          currentStep = processSteps.CONFIRM
        }
      break;
    case processSteps.CONFIRM:
        if( event == userEvents.PRESSUSB && usbStickPluggedIn){
          currentStep = processSteps.ABFRAGE; 
        }else if(event == userEvents.PRESSUSB){
          alert("USB-Stick ist nicht eingesteckt.")
        }
      break;
    case processSteps.ABFRAGE:
        if( event == userEvents.PRESSUSB && usbStickPluggedIn){
          currentStep = processSteps.SUCCESS; 
        }else if(event == userEvents.PRESSUSB){
          alert("USB-Stick ist nicht eingesteckt.")
        }
      break;
    case processSteps.SUCCESS:
        if( event == siteEvents.SUCCESS){
            currentStep = processSteps.GETDATA
        }
      break;
    case processSteps.GETDATA:
        if( event == siteEvents.RESTART){
            currentStep = processSteps.LANDING
        }
      break;
  }

  ReactDOM.render(
    (<App />),
    document.getElementById('root')
  );
}


/*
This component should display a prototype version of the website, with which we can interact.
*/
class PrototypeWebsite extends React.Component{
  constructor(props) {
    super(props);
  }

  render(){

    if(this.props.isLanding){
      return(
        <div id="website">
          <ProtoHeader />
          <ProtoMain showLanding={true}/>
        </div>
      );
    }else if (!this.props.isSuccess){
      let popOverVisible = false
      switch(currentStep){
        case processSteps.AUSWAHL:
          popOverVisible = true;
          break;
        case processSteps.WAITFORSTICK:
          popOverVisible = true;
          break;
        case processSteps.PIN:
          popOverVisible = true;
          break;
         case processSteps.CONFIRM:
          popOverVisible = true;
          break;
        case processSteps.ABFRAGE:
          popOverVisible = true;
          break;
        case processSteps.SUCCESS:
          popOverVisible = true;
          break;
      }
      return(
        <div id="website">
          <Popover visible={popOverVisible}/>
          <ProtoHeader />
          <ProtoMain showData={false}/>
        </div>
      );
    }else{
      return(
        <div id="website">
          <ProtoHeader />
          <ProtoMain showData={true}/>
        </div>
      );
    }
    
  }
}

class ProtoHeader extends React.Component{
  constructor(props) {
    super(props);
  }

  render(){
      return(
        <div id="proto-header">
          <ProtoHeaderLogo />
          <h2 className="proto-headline">Demo öffentlicher Beispieldienst</h2>
          <div id="proto-header-image"></div>
          <h3 className="proto-headline">Demoantrag für eine beispielhafte Leistung</h3>
        </div>
      );
  } 
}

class ProtoHeaderLogo extends React.Component{
  constructor(props) {
    super(props);
  }

  render(){
      return(
        <div id="proto-header-logo">
          <div className="proto-logo-line" style={{backgroundColor: "black", }}></div>
          <div className="proto-logo-line" style={{backgroundColor: "red", }}></div>
          <div className="proto-logo-line" style={{backgroundColor: "yellow", }}></div>
        </div>
      );
  } 
}

class ProtoMain extends React.Component{
  constructor(props) {
    super(props);
  }

  start(){
    handleProcess(siteEvents.START);
  }

  render(){
    if(this.props.showLanding){
      return(
        <div id="proto-main">
          <ProzessSchritte current={1}/>
          <AntragsStep content="Schritt 1 - Angaben zur Antragsausstellung auslesen" />
          <p>Für wen beantragen Sie diese Beispielleistung?</p>
          <button 
            className="proto-button"
            onClick={()=> handleProcess(siteEvents.START)}
          >
            Für mich selbst
          </button>
          <button 
            className="proto-button"
            onClick={()=> alert("Diese Funktion steht in dieser Demo leider nicht zur Verfügung")}
          >
            Für jemand anderen
          </button>
        </div>
      );
    }else if(!this.props.showData){
      return(
        <div id="proto-main">
          <ProzessSchritte current={2}/>
          <AntragsStep content="Schritt 2 - Personendaten auslesen" />
          <p>Sie können die folgenden Möglichkeiten nutzen, um Ihre Personendaten zu übermitteln:</p>
          <button 
            className="proto-button" 
            onClick={()=> alert("Die Online-Ausweisfunktion wird in diesem Protoyp nicht unterstützt.")}
          >
            Online-Ausweisfunktion
          </button>
          <button className="proto-button" onClick={this.start}>Persönlicher Sicherheitsschlüssel</button>
        </div>
      );
    }else{
      return(
        <div id="proto-main">
          <ProzessSchritte current={2}/>
          <AntragsStep content="Schritt 2 - Personendaten auslesen" />
          <p>Bitte überprüfen Sie die ausgelesenen Daten Ihres persönlichen USB-Sticks.</p>
          <p>Familienname</p>
          <p className="received-data">Skiwalker</p>
          <p>Vorname(n)</p>
          <p className="received-data">Lukas</p>
          <p>Geburtsdatum</p>
          <p className="received-data">25.05.1977</p>
          <button 
            id="restart-button" 
            className="proto-button"
            onClick={()=> handleProcess(siteEvents.RESTART)}
          >
            Starte den Protypen neu
          </button>
        </div>
      );
    }  
  } 
}


class ProzessSchritte extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const width = 100/4;
    if(this.props.current > 1){
      return (
        <div>
          <ProzessSchritt width={width} number="1" content="Angaben"/>
          <ProzessSchritt current={true} width={width} middle={true} number="2" content="Personendaten"/>
          <ProzessSchritt width={width} middle={true} number="3" content="Weitere Daten"/>
          <ProzessSchritt width={width} number="4" content="Übersicht"/>
        </div>
      );
    }else{
      return (
        <div>
          <ProzessSchritt current={true} width={width} number="1" content="Angaben"/>
          <ProzessSchritt width={width} middle={true} number="2" content="Personendaten"/>
          <ProzessSchritt width={width} middle={true} number="3" content="Weitere Daten"/>
          <ProzessSchritt width={width} number="4" content="Übersicht"/>
        </div>
      );
    }
    
  }
}

class ProzessSchritt extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let className = "proto-process-step"
    let width = this.props.width

    if(this.props.middle){
      className = className + " proto-process-step-middle"
      width = width - 1
    }
    if(this.props.current){
      className = className + " proto-process-step-current"
    }
    
    return (
      <div className={className} style={{width: width + "%"}}>
        {this.props.content}
      </div>
    );
    
  }
}

class AntragsStep extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="">
        <h2>{this.props.content}</h2>
      </div>
    );
  }
}

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div class="footer">
        <p>
          The identity stick project is a finalist of the PrototypeFund round 7. It is supported by <a href="https://www.bmbf.de/de/software-sprint-freie-programmierer-unterstuetzen-3512.html">BMBF</a> and <a href="">PrototypeFund</a>.
          <a style={{marginLeft: "2em"}} href="https://identity-stick.github.io/impressum">Impressum</a>
        </p>
      </div>
    );
  }
}

class UserInputBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="user-input-box">
        <h2>{this.props.title}</h2>
        <p>{this.props.text}</p>
        <UserInput inactiveMessage="USB Stick einstecken" activeMessage="USB Stick entfernen" active={usbStickPluggedIn} position="left" type={userEvents.ENTERUSB}/>
        <UserInput inactiveMessage="Knopf drücken" position="middle" type={userEvents.PRESSUSB}/>
        <Footer />
      </div>
    );
  }
}

class UserInput extends React.Component{
  constructor(props){
    super(props);
    this.state = {active: false}
    this.press = this.press.bind(this);
  }
  press(){
    if(this.props.type == userEvents.ENTERUSB){
      usbStickPluggedIn = !usbStickPluggedIn
      this.setState({active: !this.state.active})

    }
    handleProcess(this.props.type)
  }
  render(){
    let classes;
    let currentState;
    if(this.state.active){
      classes = "user-input active " + this.props.position
      currentState = this.props.activeMessage
    }else{
      classes = "user-input inactive " + this.props.position
      currentState = this.props.inactiveMessage
    }
    return (
      <button 
        className={classes}
        onClick={this.press}>
        <p style={{ fontWeight: "bold"}}>{currentState}</p>
      </button>
    );
  }
}

class FlowAnimation extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      leftFlowWidth: 0,
      rightFlowWidth: 40,
      offset: 0,
    }
  }

  componentDidMount(){
    this.timerID = setInterval(
      () => this.tick(),
      10
    );
  }

  componentWillUnmount(){
    clearInterval(this.timerID);
  }

  tick(){
    if(this.state.offset < 60){
      this.setState({
        leftFlowWidth: this.state.leftFlowWidth,
        rightFlowWidth: this.state.rightFlowWidth,
        offset: this.state.offset + 1,
      });
    }else if (this.state.leftFlowWidth < 40){

      this.setState({
        leftFlowWidth: this.state.leftFlowWidth + 1,
        rightFlowWidth: this.state.rightFlowWidth - 1,
        offset: this.state.offset,
      });
    }else{
      this.setState({
        leftFlowWidth: 0,
        rightFlowWidth: 40,
        offset: 0,
      });
    }
    
  }

  render(){
    return(
      <div id="flow-animation-wrapper">
        <div id="flow-element-left" style={{width: this.state.leftFlowWidth + "%"}}></div>
        <div id="inbetween-flowing-elements" style={{width: this.state.offset + "%"}}></div>
        <div id="flow-element-right" style={{width: this.state.rightFlowWidth + "%"}}></div>          
      </div>
    );
  } 
}

class CheckAnimation extends React.Component{
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div >
        <svg className="checkmark" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
          <circle className="checkmark-circle" cx="50" cy="50" r="50"/>
          <path className="checkmark-check" fill="none" d="
            M 14.1 27.2
            l 7.1 7.2 16.7-16.8"/>
        </svg>  
      </div>
    );
  } 
}

class Popover extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    let style = {}
    if (!this.props.visible){
      style = ({display: 'none'})
    }
    return(
      <div id="opaque-overlay" style={style}>
        <PopoverOverlay content={this.props.content}/>
      </div>
    );
  }
}

class PopoverOverlay extends React.Component{
  constructor(props){
    super(props);
  }

  makeInvisible(){
    currentStep = processSteps.BEGIN;
    handleProcess();
  }

  render(){

    //Create correct button
    let buttonContent = "Abbrechen"
    let buttonAction = this.makeInvisible    
    if(currentStep == processSteps.PIN){
      buttonContent = "Ok"
      buttonAction = () => handleProcess(siteEvents.ENTERPIN)
    }
    if(currentStep == processSteps.SUCCESS){
      buttonContent = "Schließen"
      buttonAction = () => {
        handleProcess(siteEvents.SUCCESS)
      }
    }

    return(
      <div className="popover">
  

        <PopOverlayHeader />
        <PopOverlayContent />
        <p align="right">
          <button onClick={buttonAction}>{buttonContent}</button>
        </p>
      </div>
    );
  }
}

class PopOverlayHeader extends React.Component{
  constructor(props){
    super(props);
  }


  render(){
    let content;
    switch(currentStep){
      case processSteps.AUSWAHL:
        content= (
          <div className="popover-wrapper">
            <div className="popover-icon">
              <img src="icons/used-key-bg.png" alt="Schwarzweißes Icon von einem Schlüssel, der in ein Schlüsselloch gesteckt wird"></img>
            </div>
            <p className="popover-text">Persönlichen Sicherheitsschlüssel mit beispieldienst.de verwenden.</p>
          </div>
        );
        break;
      case processSteps.WAITFORSTICK:
        content= (
          <div className="popover-wrapper">
            <div className="popover-icon">
              <img src="icons/usb-stick-bg.png" alt="Schwarzweißes Icon von einem USB Stick"></img>
            </div>
            <p className="popover-text">Stecken Sie jetzt Ihren USB-Stick ein oder nutzen Sie Bluetooth zur Verbindung</p>
          </div>
        );
        break;
      case processSteps.PIN:
        content= (
           <div className="popover-wrapper">
            <div className="popover-icon">
              <img src="icons/bestaetigung-bg.png" alt="Schwarzweißes Icon von einem Siegel mit einem Haken darin. Soll ein Vertrauenssymbol darstellen"></img>
            </div>
            <p className="popover-text">PIN Eingabe</p>
          </div>
        );
        break;
      case processSteps.CONFIRM:
        content= (
           <div className="popover-wrapper">
            <div className="popover-icon">
              <img src="icons/auswahl-bg.png" alt="Schwarzweißes Icon von einem Siegel mit einem Haken darin. Soll ein Vertrauenssymbol darstellen"></img>
            </div>
            <p className="popover-text">Abfrage von verfügbaren Daten</p>
          </div>
        );
        break;
      case processSteps.ABFRAGE:
        content= (
          <div className="popover-wrapper">
            <div className="popover-icon">
              <img src="icons/auswahl-bg.png" alt="Schwarzweißes Icon von einem Mauszeiger, der auf ein gestricheltes Quadrat drückt"></img>
            </div>
            <p className="popover-text">Übertragung Ihrer persönlichen Daten</p>
          </div>
        );
        break;
      case processSteps.SUCCESS:
        content= (
          <div className="popover-wrapper">
            <div className="popover-icon">
              <img src="icons/bestaetigung-bg.png" alt="Schwarzweißes Icon von einem Siegel mit einem Haken darin. Soll ein Vertrauenssymbol darstellen"></img>
            </div>
            <p className="popover-text">Übertragung von Informationen erfolgreich!</p>
          </div>
        );
        break;
    }
    //Show animation only, when waiting for interaction
    if (currentStep == processSteps.WAITFORSTICK || currentStep == processSteps.CONFIRM || currentStep == processSteps.ABFRAGE){
    
      return(
        <div>
          <FlowAnimation />
          <div id="popover-header">
            {content}
          </div>
        </div>
      );
    }else{
      return(
        <div id="popover-header" style={{paddingTop: "1.5em"}}>
          {content}
        </div>
      );
    }

  }
}

class PopOverlayContent extends React.Component{
  constructor(props){
    super(props);
  }



  render(){
    let content;
    switch(currentStep){
      case processSteps.AUSWAHL:
        content= (
          <div id="popover-content">
            <p>Optionen</p>
            <div className="popover-wrapper">
              <div className="popover-icon">
                <img src="icons/usb-stick-bg.png" alt="Schwarzweißes Icon von inem USB Stick"></img>
              </div>
              <button className="popover-user-input-button" onClick={() => handleProcess(siteEvents.USEUSB)}>USB-Stick verwenden</button>
            </div>
            <div className="popover-wrapper">
              <div className="popover-icon">
                <img src="icons/fingerabdruck-bg.png" alt="Schwarzweißes Icon von einem Fingerabdruck"></img>
              </div>
              <button className="popover-user-input-button">Smartphone/Computer verwenden</button>
            </div>
          </div>
        );
        break;
      case processSteps.WAITFORSTICK:
        content = (
          <div id="popover-content">
            <PopoverContentWithIcon 
              icon="icons/info-bg.png" 
              alt="Schwarzweißes Icon aus einem Kreis in dem ein kleines i ist."  
              contentClass="popover-info" 
              content="Dieser Dienst muss Ihre Identität feststellen. Ihr persönlicher USB-Stick kann zur sicheren Übertragung genutzt werden." 
            />
            <PopoverContentWithIcon 
              icon="icons/usb-stick-bg.png" 
              alt="Schwarzweißes Icon von einem USB Stick"  
              contentClass="popover-request" 
              content="Bitte stecken Sie den USB-Stick in den USB-Anschluss." 
            />
          </div>
        );
        break;
      case processSteps.PIN:
        content= (
          <div id="popover-content">
            <PopoverContentWithIcon 
                icon="icons/info-bg.png" 
                alt="Schwarzweißes Icon aus einem Kreis in dem ein kleines i ist."  
                contentClass="popover-info" 
                content="Dieser Dienst muss Ihre Identität feststellen. Ihr persönlicher USB-Stick kann zur sicheren Übertragung genutzt werden." 
              />
            <PopoverContentWithIcon 
              icon="icons/info-bg.png" 
              alt="Schwarzweißes Icon aus einem Kreis in dem ein kleines i ist." 
              contentClass="popover-info" 
              content="Geben Sie jetzt die PIN Ihres persönlichen USB-Sticks ein." 
            />
            <PinEingabe />
          </div>
        );
        break;
      case processSteps.CONFIRM:
        content= (
          <div id="popover-content">
            <PopoverContentWithIcon 
              icon="icons/info-bg.png" 
              alt="Schwarzweißes Icon aus einem Kreis in dem ein kleines i ist."  
              contentClass="popover-info" 
              content="Dieser Dienst muss Ihre Identität feststellen. Ihr persönlicher USB-Stick kann zur sicheren Übertragung genutzt werden." 
            />
            <PopoverContentWithIcon 
              icon="icons/usb-stick-bg.png" 
              alt="Schwarzweißes Icon von einem USB Stick"  
              contentClass="popover-request" 
              content="Tippen Sie jetzt auf Ihren USB-Stick, um beispieldienst.de mitzuteilen, welche Informationen zur Verfügung stehen." 
            />
          </div>
        );
        break;
      case processSteps.ABFRAGE:
        content= (
          <div id="popover-content">
            <PopoverContentWithIcon 
              icon="icons/info-bg.png" 
              alt="Schwarzweißes Icon aus einem Kreis in dem ein kleines i ist." 
              contentClass="popover-info"  
              content="Beispieldienst.de möchte folgende Informationen abfragen, um Ihre Identität festzustellen:" 
            />
            <ul>
              <li>Vorname(n)</li>
              <li>Familienname(n)</li>
              <li>Geburtsdatum</li>
            </ul>
            <PopoverContentWithIcon 
              icon="icons/usb-stick-bg.png" 
              alt="Schwarzweißes Icon von einem USB Stick"  
              contentClass="popover-request" 
              content="Tippen Sie jetzt auf Ihren USB-Stick, um die Informationen zu übertragen." 
            />
          </div>
        );
        break;
      case processSteps.SUCCESS:
        content= (
          <div id="popover-content">
            <PopoverContentWithIcon 
              icon="icons/info-bg.png" 
              alt="Schwarzweißes Icon aus einem Kreis in dem ein kleines i ist." 
              contentClass="popover-info"  
              content={(<span>Ihre persönlichen Informationen wurden übertragen.<br />Sie können jetzt mit der Bearbeitung fortfahren.</span>)}
            />
             <CheckAnimation/>
          </div>
        );
        break;
    }
    return(<div>
        {content}
        </div>
    );
  }
}

class PopoverContentWithIcon extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="popover-wrapper">
        <div className="popover-icon">
          <img src={this.props.icon} alt={this.props.alt}></img>
        </div>
        <p className={this.props.contentClass}>{this.props.content}</p>
      </div>
    );
  }
}

class PinEingabe extends React.Component{
  constructor(props){
    super(props);

    this.onKeyUp = this.onKeyUp.bind(this);
  }

  onKeyUp(event){
    if(event.charCode === 13){
      handleProcess(siteEvents.ENTERPIN)
    }
  }

  render(){
    return(
      <div>
        <div className="popover-wrapper">
        <div className="popover-icon">
        </div>
        <input type='password' id='pin-eingabe' onKeyPress={this.onKeyUp}/>
      </div>
        
      </div>
    );
  }
}

class InfoBox extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div class="popover-info">
        <div style={{width: "100%", fontWeight: "bold"}}>HINWEIS:</div>
        {this.props.content}
      </div>
    );
  }
}

/*
This component displays the whole website. Rerender this, if all components need to be updated
*/
class App extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const text = {}
    let content
    if(currentStep == processSteps.GETDATA){
      content = ( <PrototypeWebsite isSuccess={true}/>);
    }else if(currentStep == processSteps.LANDING){
      content = ( <PrototypeWebsite isLanding={true}/>);
    }else{
      content = ( <PrototypeWebsite isSuccess={false}/>);
    }
    return(
      <div>
        <InfoBox content="Dies ist eine Demo-Webseite. Es werden keinerlei Informationen übertragen." />
        {content}
        <UserInputBox title="Bitte nutzen Sie die Buttons als Input für die Demo-Webseite" {...text}/>
      </div>
    );
  }
}

ReactDOM.render(
  (<App />),
  document.getElementById('root')
);