import React, { Component } from 'react';
import './app.css';
import KeyPadComponent from "./components/KeyPadComponent";

class App extends Component {
    constructor(){
        super();

        this.state = {
            result: ""
        }
    }

    render() {
        return (
            <div>
                <div className="code-zero">
                    <KeyPadComponent onClick={this.onClick}/>
                </div>
            </div>
        );
    }
}

export default App;
