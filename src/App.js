import React, { Component } from 'react';
import './app.scss';
import KeyPadComponent from "./components/KeyPadComponent";

class App extends Component {
    constructor(props){
        super();
        this.state = {
            result: "",
            showHideFName: true
        }
    }

    render() {
        return (
            <div>
                <div className="main-app--base">
                    <KeyPadComponent onClick={this.onClick}/>
                </div>
            </div>
        );
    }
}

export default App;
