import React, { Component } from "react";
import { Button } from "react-bootstrap";

const correctPin = "0000";
let disableInput = false;
let _pinArray = [];

function handleKeyPress(event) {
  console.log(event) 
  if(event.key === 'Enter'){
    console.log('enter press here! ')
  }
}

function lockApp() {
  document.querySelector(".pin-info").style.top = "0";
  document.querySelector(".pin-display").style.bottom = "0";
  //closeLock().then(() => {
  disableInput = false;
  _pinArray = [];
  bindPinToDisplay(_pinArray);
  // });
}

function closeLock() {
  const topSection = document.querySelector(".pin-info");
  const bottomSection = document.querySelector(".pin-display");
  document.querySelector(".pin-info").style.top = "0";
  document.querySelector(".pin-display").style.bottom = "0";
  // const promises = [
  //   anime({
  //     targets: bottomSection,
  //     translateY: "0%",
  //     duration: 600,
  //     easing: "easeOutCubic"
  //   }).finished,
  //   anime({
  //     targets: topSection,
  //     translateY: "0%",
  //     duration: 600,
  //     easing: "easeOutCubic"
  //   }).finished
  // ];

  // return Promise.all(promises);
}
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

//need to revise
setTimeout(() => {
  init();
}, 0);

function handleClearAll() {
  if (disableInput) {
    return;
  }
  _pinArray = [];
  bindPinToDisplay(_pinArray);
}

function handleClear() {
  if (disableInput) {
    return;
  }
  _pinArray.pop();
  bindPinToDisplay(_pinArray);
}

function attemptUnlock() {
  if (_pinArray.length === 4) {
    evaluatePin(_pinArray);
  }
}

function handleClick(e) {
  e.preventDefault();
  const value = e.target.attributes["data-value"].value;
  if (_pinArray.length < 4) {
    _pinArray.push(value);
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

/* END TRUE FUNCTIONS */

class KeyPadComponent extends Component {
  render() {
    return (
      <div className="device">
        <div className="device-bezel">
          <div className="device-viewport">
            <div className="content">
              <img
                alt="header"
                src="https://i.pinimg.com/originals/f6/94/4e/f6944e111801a75f884f8ad72684e387.jpg"
              />
              <div className="body-content">
                <h1>ACCESS!</h1>
                <h3>It's good to see you!</h3>
                <p>
                  Your life just got a little more enriched for gaining access.
                </p>
                <button id="reset-button" onClick={lockApp}>
                  Lock App!
                </button>
              </div>
            </div>
            <div className="container">
              <div className="pin-info">
                <h1 className="page-title">Alpha FX Access</h1>
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
                <div className="keypad">
                  <div className="keypad--row">
                    <div
                      className="keypad--button"
                      onClick={handleClick}
                      onKeyPress={handleKeyPress}
                      data-value="1"
                    >
                      1
                    </div>
                    <div
                      className="keypad--button"
                      onClick={handleClick}
                      data-value="2"
                    >
                      2
                    </div>
                    <div
                      className="keypad--button"
                      onClick={handleClick}
                      data-value="3"
                    >
                      3
                    </div>
                  </div>
                  <div className="keypad--row">
                    <div
                      className="keypad--button"
                      onClick={handleClick}
                      data-value="4"
                    >
                      4
                    </div>
                    <div
                      className="keypad--button"
                      onClick={handleClick}
                      data-value="5"
                    >
                      5
                    </div>
                    <div
                      className="keypad--button"
                      onClick={handleClick}
                      data-value="6"
                    >
                      6
                    </div>
                  </div>
                  <div className="keypad--row">
                    <div
                      className="keypad--button"
                      onClick={handleClick}
                      data-value="7"
                    >
                      7
                    </div>
                    <div
                      className="keypad--button"
                      onClick={handleClick}
                      data-value="8"
                    >
                      8
                    </div>
                    <div
                      className="keypad--button"
                      onClick={handleClick}
                      data-value="9"
                    >
                      9
                    </div>
                  </div>
                  <div className="keypad--row">
                    <div
                      className="keypad--button keyboard--button__back-arrow"
                      onClick={handleClear}
                    >
                      <i className="material-icons">backspace</i>
                    </div>
                    <div
                      className="keypad--button"
                      onClick={handleClick}
                      data-value="0"
                    >
                      0
                    </div>
                    <div
                      className="keypad--button keyboard--button__x"
                      onClick={handleClearAll}
                    >
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
      </div>
    );
  }
}

export default KeyPadComponent;
