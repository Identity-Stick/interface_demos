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
  ABFRAGE: 5,
  SUCCESS: 6,
  DONE: 7,
}

const userEvents = {
  ENTERUSB: 0,
  PRESSUSB: 1,
}

const siteEvents = {
  START: 0,
  USEUSB: 1,
  ENTERPIN: 2,
  SUCCESS: 3,
  RESTART: 4,
  LOGIN: 5,
  REGISTER: 6,
}

let currentStep = processSteps.LANDING;

let usbStickPluggedIn = false;
let registration = false;
let userName = "";
let knownUserName = [];

function handleProcess(event){
  switch(currentStep){
    case processSteps.LANDING:
        if(event == siteEvents.REGISTER){
          currentStep = processSteps.BEGIN;
        }else if(event == siteEvents.LOGIN){
          userName = document.getElementById("user-name").value
          if(userName != ""){
            console.log(knownUserName.includes(userName))
            if(!knownUserName.includes(userName)){
              alert("Der Nutzername ist bisher nicht registriert. Bitte registrieren Sie sich zuerst.")
            }else{
              currentStep = processSteps.AUSWAHL
              registration = false;    
            }            
          }else{
            alert("Es wurde kein Nutzername eingegeben.")
          }
          
        }

        break;
    case processSteps.BEGIN:
        if(event == siteEvents.REGISTER){
          userName = document.getElementById("user-name").value
          if(userName != ""){
            currentStep = processSteps.AUSWAHL
            registration = true;  
          }else{
            alert("Es wurde kein Nutzername eingegeben.")
          }
          
        }
    case processSteps.AUSWAHL:
        if(event == siteEvents.USEUSB){
          currentStep = processSteps.WAITFORSTICK 
        }
      break;
    case processSteps.WAITFORSTICK:
        if( event == userEvents.PRESSUSB && usbStickPluggedIn){
          currentStep = processSteps.SUCCESS; 
        }else if(event == userEvents.PRESSUSB){
          alert("USB-Stick ist nicht eingesteckt.")
        }
      break;
    case processSteps.PIN:
        if( event == siteEvents.ENTERPIN){
          currentStep = processSteps.SUCCESS
        }
      break;
    case processSteps.SUCCESS:
        if( event == siteEvents.SUCCESS){
            currentStep = processSteps.DONE
        }
      break;
    case processSteps.DONE:
        if( event == siteEvents.RESTART){
            if (registration){
              registration = false
              knownUserName.push(userName);
              currentStep = processSteps.LANDING
            }else{
              registration = false;
              knownUserName = [];
              userName = "";
              currentStep = processSteps.LANDING
            }
            
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
    let popOverVisible = false
    let showLanding = this.props.isLanding
    let showData = this.props.isSuccess
    
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
      case processSteps.ABFRAGE:
        popOverVisible = true;
        break;
      case processSteps.SUCCESS:
        popOverVisible = true;
        break;
    }

    return(
      
        <div id="website">
        <div className="login-box">
          <Popover visible={popOverVisible}/>
          <ProtoHeader />
          <ProtoMain showData={showData} showLanding={showLanding}/>
        </div>
       </div>
    );
    
  }
}

class ProtoHeader extends React.Component{
  constructor(props) {
    super(props);
  }

  render(){
      return(
        <div id="proto-header">
          <h1 className=""><span style={{color: "#3064BF"}}>Beispieldienst</span></h1>
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
          <h2 style={{textAlign: "center"}}>Bei Ihrem Account anmelden</h2>
          <p className="user-name-caption">E-Mail/Nutzername</p>
          <input id="user-name" className="user-name-input" type="text"></input>
          <button 
            className="proto-button"
            onClick={()=> handleProcess(siteEvents.LOGIN) }
          >
            Passwortlos anmelden 
            {/* <div className="popover-icon" style={{width: "1em"}}>
              <img src="icons/info.png"  ></img>
            </div> */}
          </button>
          <Placeholder content="oder"/> 
          <p className="user-name-caption">Passwort</p>
          <input className="user-name-input" type="password"></input>
          <button 
            className="proto-button"
            onClick={()=> alert("Diese Funktion steht auf dieser Demoseite nicht zur Verfügung.")}
          >
            Login
          </button>
          <p style={{textAlign: "center"}}>
            Sie haben noch keinen Account? <a   onClick={()=> handleProcess(siteEvents.REGISTER)}>Jetzt hier registrieren</a>
          </p>
        </div>
      );
    }else if(!this.props.showData){
      return(
       <div id="proto-main">
          <h2 style={{textAlign: "center"}}>Neuen Account registrieren</h2>
          <p className="user-name-caption">E-Mail/Nutzername</p>
          <input id="user-name" className="user-name-input" type="text"></input>
          <button 
            className="proto-button"
            onClick={()=> handleProcess(siteEvents.REGISTER) }
          >
            Passwortlos registrieren
            {/* <div className="popover-icon" style={{width: "1em"}}>
              <img src="icons/info.png"  ></img>
            </div> */}
          </button>
          <Placeholder content="oder"/> 
          <p className="user-name-caption">Password</p>
          <input className="user-name-input" type="password"></input>
          <button 
            className="proto-button"
            onClick={()=> alert("Diese Funktion steht auf dieser Demoseite nicht zur Verfügung.")}
          >
            Registrieren
          </button>
        </div>
      );
    }else{
      if(registration){
        return(
          <div id="proto-main">
            <h2>Registrierung erfolgreich</h2>
            <p>Ihr Account wurde erstellt und mit Ihrem Sicherheitsschlüssel verknüpft. 
              <br/>
              Bitte gehen Sie zurück zum Start und loggen sich ein. </p>
            <button 
              id="restart-button" 
              className="proto-button"
              onClick={()=> handleProcess(siteEvents.RESTART)}
            >
              Zurück zum Start
            </button>
          </div>
        );
      }else{
         return(
          <div id="proto-main">
            <h2>Erfolgreich eingeloggt</h2>
            <p>Sie können den Dienst nun wie gewohnt nutzen.</p> 
            <button 
              id="restart-button" 
              className="proto-button"
              onClick={()=> handleProcess(siteEvents.RESTART)}
            >
              Prototypen neu starten
            </button>
          </div>
        );
      }
      
    }  
  } 
}

class Placeholder extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="placeholder-wrapper">
        <div className="placeholder-line"></div>
        <div className="placeholder-content">{this.props.content}</div>
        <div className="placeholder-line"></div>
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
    if(registration){
      currentStep = processSteps.BEGIN;  
    }else{
      currentStep = processSteps.LANDING;  
    }
    
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
      console.log(registration)
        if (registration){
          content= (
            <div className="popover-wrapper">
              <div className="popover-icon">
                <img src="icons/bestaetigung-bg.png" alt="Schwarzweißes Icon von einem Siegel mit einem Haken darin. Soll ein Vertrauenssymbol darstellen"></img>
              </div>
              <p className="popover-text">Registrierung erfolgreich!</p>
            </div>
          );  
        }else{
          content= (
            <div className="popover-wrapper">
              <div className="popover-icon">
                <img src="icons/bestaetigung-bg.png" alt="Schwarzweißes Icon von einem Siegel mit einem Haken darin. Soll ein Vertrauenssymbol darstellen"></img>
              </div>
              <p className="popover-text">Login erfolgreich!</p>
            </div>
          );  
        }
        
        break;
    }
    //Show animation only, when waiting for interaction
    if (currentStep == processSteps.WAITFORSTICK || currentStep == processSteps.ABFRAGE){
    
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
        if (registration){
          content = (
            <div id="popover-content">
              <PopoverContentWithIcon 
                icon="icons/info-bg.png" 
                alt="Schwarzweißes Icon aus einem Kreis in dem ein kleines i ist."  
                contentClass="popover-info" 
                content="Beispieldienst.de möchte Ihren USB-Stick als Sicherheitsschlüssel registrieren." 
              />
              <PopoverContentWithIcon 
                icon="icons/usb-stick-bg.png" 
                alt="Schwarzweißes Icon von einem USB Stick"  
                contentClass="popover-request" 
                content="Tippen Sie jetzt zur Bestätigung auf Ihren USB-Stick." 
              />
            </div>
          );
        }else{
          content = (
            <div id="popover-content">
              <PopoverContentWithIcon 
                icon="icons/info-bg.png" 
                alt="Schwarzweißes Icon aus einem Kreis in dem ein kleines i ist."  
                contentClass="popover-info" 
                content="Beispieldienst.de möchte Sie mit Ihrem USB-Stick einloggen." 
              />
              <PopoverContentWithIcon 
                icon="icons/usb-stick-bg.png" 
                alt="Schwarzweißes Icon von einem USB Stick"  
                contentClass="popover-request" 
                content="Tippen Sie jetzt zur Bestätigung auf Ihren USB-Stick." 
              />
            </div>
          );
        }
        
        break;
      case processSteps.PIN:
        content= (
          <div id="popover-content">
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
        
        if(registration){
          content = (    
            <div id="popover-content">
              <PopoverContentWithIcon 
                icon="icons/info-bg.png" 
                alt="Schwarzweißes Icon aus einem Kreis in dem ein kleines i ist." 
                contentClass="popover-info"  
                content="Ihr USB-Stick wurde registiert."
              />
               <CheckAnimation/>
            </div>
          );
        }else{
          content= (    
            <div id="popover-content">
              <PopoverContentWithIcon 
                icon="icons/info-bg.png" 
                alt="Schwarzweißes Icon aus einem Kreis in dem ein kleines i ist." 
                contentClass="popover-info"  
                content="Sie wurden eingeloggt."
              />
               <CheckAnimation/>
            </div>
          );
        }
        break;
        
    }
    return(
      <div>
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
    let isSuccess = false
    let isLanding = false
    console.log(currentStep)
    if(currentStep != processSteps.BEGIN && !registration && currentStep != processSteps.DONE){
      isLanding = true
    }
    if(currentStep == processSteps.DONE){
      isSuccess = true
    }
    return(
      <div>
        <InfoBox content="Dies ist eine Demo-Webseite. Es werden keinerlei Informationen übertragen." />
        <PrototypeWebsite isLanding={isLanding} isSuccess={isSuccess}/>
        <UserInputBox title="Input zur Webseite" {...text}/>
      </div>
    );
  }
}

ReactDOM.render(
  (<App />),
  document.getElementById('root')
);