import React, { Component } from "react";
import { Button } from "react-bootstrap";

const correctPin = "0000";
let enteredValue = "";
let disableInput = false;
let _pinArray = [];

// Reset everything and set 
function lockApp() {
  document.querySelector(".pin-info").style.top = "0";
  document.querySelector(".pin-display").style.bottom = "0";
  disableInput = false;
  _pinArray = [];
  bindPinToDisplay(_pinArray);
}

// Handle the UI on successful entry  
function openLock() {
  const containerHeight = document.querySelector(".container").offsetHeight;
  const keypadHeight = document.querySelector(".pin-display").offsetHeight;
  document.querySelector(".pin-info").style.top = "-300px";
  document.querySelector(".pin-display").style.bottom = "-400px";
  console.log("opened");
}

function bindPinToDisplay(pinArray, pinStatus) {
  document.querySelectorAll(".pin-circle").forEach((el, index) => {
    if (pinStatus === "success") {
      el.classList.add("success");
    } else if (pinStatus === "error") {
      el.classList.add("error");
    } else if (index > pinArray.length - 1) {
      el.classList.remove("entered");
      el.classList.remove("success");
      el.classList.remove("error");
    } else {
      el.classList.add("entered");
    }
  });

  if (pinStatus === "error") {
    document.querySelector(".confirmation-dots").classList.add("error");
  } else {
    document.querySelector(".confirmation-dots").classList.remove("error");
  }
}

function evaluatePin(pinArray) {
  
  const enteredPin = pinArray.join("");
  if (enteredPin === correctPin) {
    disableInput = true;
    setTimeout(() => {
      bindPinToDisplay(pinArray, "success");
      setTimeout(() => {
        openLock();
      }, 500);
    }, 250);
    console.log("correct PIN");
  } else {
    disableInput = true;
    setTimeout(() => {
      bindPinToDisplay(pinArray, "error");
      setTimeout(() => {
        _pinArray = [];
        bindPinToDisplay(_pinArray);
        disableInput = false;
      }, 350);
    }, 250);
  }
}

function init() {
  initLayout();
  
}

setTimeout(() => {
  init();
}, 0);

// Function to handle clearing of input
function handleClearAll() {
  if (disableInput) {
    return;
  }
  _pinArray = [];
  bindPinToDisplay(_pinArray);
}

// Function to handle clearing of input
function handleClear() {
  if (disableInput) {
    return;
  }
  _pinArray.pop();
  bindPinToDisplay(_pinArray);
}

//Function to attempt pin unlock
function attemptUnlock() {
  if (_pinArray.length === 4) {
    evaluatePin(_pinArray);
  }
}

// Function to handle event click on keypad
function handleClick(e, t) {


  // Check if keyboard input and set value equal to input string
  if (t == "keyboard") {
    enteredValue = e.key;
  } else {
    enteredValue = e.target.attributes["data-value"].value;
  }

  if (_pinArray.length < 4) {
    _pinArray.push(enteredValue);
    bindPinToDisplay(_pinArray);

    /* IF WE WANTED TO AUTOMATICALLY ATTEMPT AN UNLOCK WHEN 4 DIGITS ARE ENTERED WE COULD USE THE BELOW */
    // if (_pinArray.length === 4) {
    //   evaluatePin(_pinArray);
    // }
  }
}

function initLayout() {
  const containerHeight = document.querySelector(".container").offsetHeight;
  const keypadHeight = document.querySelector(".pin-display").offsetHeight;
  document.querySelector(".pin-info").style.height = `${containerHeight -
    keypadHeight +
    1}px`;
}

class KeyPadComponent extends Component {
  constructor(props) {
    super(props);
    this.escFunction = this.escFunction.bind(this);

    this.state = {
      result: ""
    }
  }

  escFunction(event) {
    handleClick(event, "keyboard")

    //Escape key clears all
    if (event.keyCode === 27) {
      handleClearAll();
    }

    //Enter key attempts unlock
    if (event.keyCode === 13) {
      attemptUnlock();
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
  }
  render() {
    let {isLoggedIn} = this.state;
    const renderValidMessage = ()=>{
      if(isLoggedIn){
        return <div>Incorrect Entry</div>
      } else{
        
      }
    }
    return <div className="device">
        <div className="device-bezel">
          <div className="device-viewport">
            <div className="content">
              <img alt="header" src="https://i.pinimg.com/originals/f6/94/4e/f6944e111801a75f884f8ad72684e387.jpg" />
              <div className="body-content">
                <h1>ACCESS!</h1>
                <h3>It's good to see you!</h3>
                <p>
                  Your life just got a little more enriched for gaining
                  access.
                </p>
                <button id="reset-button" onClick={lockApp}>
                  Lock App!
                </button>
              </div>
            </div>
            <div className="container">
              <div className="pin-info">
                <h1 className="page-title">Alpha FX Access</h1>
                <small>Code is 0000</small>
                
                <video width="400"  autoPlay="0" muted controls="0">
                <source id="alphavideo" src="http://mollify.an0rak.co.uk/bgvid.mp4" type="video/mp4"></source>
                Your browser does not support HTML video.
                </video>
              </div>
              <div className="pin-display">
                <div className="circle-lock--container">
                  <div className="circle-lock">
                    <i className="material-icons lock-icon">lock</i>
                  </div>
                </div>
                <div className="confirmation-dots">
                  <svg>
                    <g>
                      <circle className="pin-circle" cx="10" cy="10" r="8" />
                      <circle className="pin-circle" cx="50" cy="10" r="8" />
                      <circle className="pin-circle" cx="90" cy="10" r="8" />
                      <circle className="pin-circle" cx="130" cy="10" r="8" />
                    </g>
                  </svg>
                </div>
                {renderValidMessage()}
                <div className="keypad">
                  <div className="keypad--row">
                    <div className="keypad--button" onClick={handleClick} data-value="1">
                      1
                    </div>
                    <div className="keypad--button" onClick={handleClick} data-value="2">
                      2
                    </div>
                    <div className="keypad--button" onClick={handleClick} data-value="3">
                      3
                    </div>
                  </div>
                  <div className="keypad--row">
                    <div className="keypad--button" onClick={handleClick} data-value="4">
                      4
                    </div>
                    <div className="keypad--button" onClick={handleClick} data-value="5">
                      5
                    </div>
                    <div className="keypad--button" onClick={handleClick} data-value="6">
                      6
                    </div>
                  </div>
                  <div className="keypad--row">
                    <div className="keypad--button" onClick={handleClick} data-value="7">
                      7
                    </div>
                    <div className="keypad--button" onClick={handleClick} data-value="8">
                      8
                    </div>
                    <div className="keypad--button" onClick={handleClick} data-value="9">
                      9
                    </div>
                  </div>
                  <div className="keypad--row">
                    <div className="keypad--button keyboard--button__back-arrow" onClick={handleClear}>
                      <i className="material-icons">backspace</i>
                    </div>
                    <div className="keypad--button" onClick={handleClick} data-value="0">
                      0
                    </div>
                    <div className="keypad--button keyboard--button__x" onClick={handleClearAll}>
                      <i className="material-icons">clear</i>
                    </div>
                  </div>
                  <div className="keypad--row">
                    <div className="keypad--button" onClick={attemptUnlock}>
                      <Button variant="contained" color="secondary">
                        <i className="material-icons lock-open">lock</i> Unlock
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>;
  }
}

export default KeyPadComponent;
