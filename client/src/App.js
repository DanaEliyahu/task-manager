import React from 'react';
import CreateTask from './create-task';
import Tasks from './tasks';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <CreateTask></CreateTask>
      <Tasks></Tasks>
    </div>
  );
}

export default App;
