import React from 'react';
import CreateTask from './create-task';
import Tasks from './tasks';
import './App.scss';

const App = () => {
  return (
    <div className="App">
      <CreateTask></CreateTask>
      <Tasks></Tasks>
    </div>
  );
}

export default App;
