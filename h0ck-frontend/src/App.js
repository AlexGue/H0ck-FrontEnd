import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as request from 'request';

function App() {

  let currentTasks = "s";

request('https://orchestrator.h0ck.alexgd.es/tasks/resume', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
  currentTasks = JSON.stringify(body);
  React.render(
    element,
    document.getElementById('root')
  );
});


  var element = (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <code>{currentTasks}</code>
          Edit2 <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
  return element;
}

export default App;
