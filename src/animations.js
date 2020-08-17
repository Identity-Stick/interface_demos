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

    this.state = {
    	leftWidth: 0,
    	rightWidth: 0,
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
  	if(this.state.leftWidth < 2){
  		this.setState({
  			leftWidth: this.state.leftWidth + 0.1,
    		rightWidth: this.state.rightWidth,
	  	});
  	}else if (this.state.rightWidth < 5){
  		this.setState({
  			leftWidth: this.state.leftWidth,
    		rightWidth: this.state.rightWidth + 0.1,
	  	});
  	}
  }

  render(){
		return(
			<div >
				<svg class="checkmark" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
				  <circle className="checkmark-circle" cx="50" cy="50" r="50"/>
				  <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
				</svg>	
			</div>
		);
  } 
}

ReactDOM.render(
  (<CheckAnimation />),
  document.getElementById('root')
);
