
import React from 'react';
import './App.css';

class Timer extends React.Component{
  constructor(props){
    super(props);
    
  }
  componentDidMount(){
    this.inter = setInterval(() => {
      this.props.start();
      
    }, 1000);
  }
  componentWillUnmount(){
    clearInterval(this.inter);
  }
  render(){
    return null;
  }
}
class Clock525 extends React.Component{
  constructor(props){
    super(props);
    this.state={
      breakLength: 25,
      sessionLength: 25,
      m:25,
      s: 0,
      start: false,
      b:false,
    }
    this.handleResetClick = this.handleResetClick.bind(this);
    this.handleIncreDecre = this.handleIncreDecre.bind(this);
    this.handleStartStopClick = this.handleStartStopClick.bind(this);
    this.startTimer = this.startTimer.bind(this);
    // this. = this..bind(this);
  }
  handleIncreDecre(e){
    switch (e.target.value){
      case "bdec":
        this.setState( prevState => ({breakLength: ((prevState.breakLength-1) <= 0 || this.state.start)  ? prevState.breakLength : prevState.breakLength-1}));
        break;
      case "binc":
        this.setState( prevState => ({breakLength: (prevState.breakLength >= 60 || this.state.start) ? prevState.breakLength : prevState.breakLength+1}));
        break;
      case "sdec":
        this.setState( prevState => ({
          sessionLength: (this.state.start || prevState.sessionLength <=1)? prevState.sessionLength : prevState.sessionLength-1,
          m: (this.state.start || prevState.m <=1) ? prevState.m : prevState.sessionLength-1 ,
          s: this.state.start ? prevState.s : 0,
        }));
        break;
      case "sinc":
        this.setState( prevState => ({
          sessionLength: ((prevState.sessionLength+1) > 60 || this.state.start) ? prevState.sessionLength : prevState.sessionLength+1,
          m: ((prevState.sessionLength+1) > 60 || this.state.start) ? prevState.m : prevState.sessionLength+1 ,
          s: this.state.start ? prevState.s : 0,
        }));
        
        break;
      default:
        break;
    }
  }
  handleResetClick(){
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      m:25,
      s:0,
      start:false,
      b:false,
    });
    document.getElementById('beep').load();
  }
  componentDidUpdate(){
      if(this.state.m ===0 && this.state.s===0 && this.state.b===false){
        this.setState((prevState) => ({
          m: prevState.breakLength,
          s: 0,
          b: !prevState.b,
        }));
        document.getElementById('beep').play();
      }else if(this.state.m ===0 && this.state.s===0 && this.state.b===true){
        this.setState((prevState) => ({
          m: prevState.sessionLength,
          s: 0,
          b: !prevState.b,
        }));
        document.getElementById('beep').play();
      }
      console.log(this.state);
  }
  handleStartStopClick(){
    this.setState(prevState => ({start: !prevState.start}));
  }
  startTimer(){
    this.setState((prevState) => ({
      s: (prevState.s===0 ) ? 59 :prevState.s-1,
      m: (this.state.s === 0)? prevState.m-1: prevState.m,
    }))
  }
  render(){
    const sty = {display:'inline-block'};
    return(
      <div className="App">
        <button id="break-decrement" style={sty} onClick={this.handleIncreDecre} value="bdec">&#8595;</button>
        <h1 id="break-label" style={sty}>Break Length:</h1><h1 id="break-length" style={sty}>{this.state.breakLength}</h1>
        <button id="break-increment" style={sty} onClick={this.handleIncreDecre} value="binc">&#8593;</button><br/>
        <button id="session-decrement" style={sty} onClick={this.handleIncreDecre} value="sdec">&#8595;</button>
        <h1 id="session-label" style={sty}>Session Length:</h1><h1 id="session-length" style={sty}>{this.state.sessionLength}</h1>
        <button id="session-increment" style={sty} onClick={this.handleIncreDecre} value="sinc">&#8593;</button>
        <h3 id="timer-label">{this.state.b? 'break:': 'Session:'}</h3>
        {(this.state.start ) && <Timer start={this.startTimer}/>}
        <audio src="./audio/alarm_clock.mp3" id="beep" ></audio>
        <h3 id="time-left">{(this.state.m.toString().length === 1)? '0'+this.state.m : this.state.m} : {(this.state.s.toString().length ===1)? '0'+this.state.s :this.state.s}</h3>
        <button id="start_stop" onClick={this.handleStartStopClick}>start or stop</button>
        <button id="reset" onClick={this.handleResetClick}>reset</button>
        
    </div>
    );
  }
}
export default Clock525;
