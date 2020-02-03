import React from 'react';
import logo from './logo.svg';
import './App.css';
import TaskListComponent from './components/taskListComponent';



function App() {
  return (
    <div className="App">
      <img style={{ display: "block", marginLeft: "auto", marginRight: "auto" }} src="https://i.imgur.com/m7PLXzf.png"></img>
      <TaskListComponent></TaskListComponent>
    </div>

  );
}

export default App;
