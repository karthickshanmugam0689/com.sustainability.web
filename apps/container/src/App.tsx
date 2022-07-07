import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from '@sustainability/core-ui-modules';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.tsx</code> and save to reload
        </p>
        <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
          Learn React
        </a>
        <Button onClick={() => alert('clicked')} text='Click me' />
      </header>
    </div>
  );
}

export default App;
