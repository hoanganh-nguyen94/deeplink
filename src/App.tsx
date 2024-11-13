import React from 'react';
import logo from './logo.svg';
import './App.css';
import useLocalIPv4 from "./useLocalIp4";

function App() {
  const value = useLocalIPv4();
  console.log(value);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
        ipv4 :{JSON.stringify(value)}
        </p>

      </header>
    </div>
  );
}

export default App;
