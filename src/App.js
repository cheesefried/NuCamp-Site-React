import React, { Component } from 'react';
//import { Navbar, NavbarBrand } from 'reactstrap';
import Main from './components/MainComponent';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
//import { CAMPSITES } from './shared/campsites';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Main />
                </div>
            </BrowserRouter>   
        );
    }
}

export default App;
