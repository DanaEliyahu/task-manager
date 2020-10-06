import React from 'react';
import CreateTask from './components/CreateTask';
import Tasks from './components/Tasks';
import './App.scss';

const App = () => {
  return (
    <div className="App">
      <CreateTask />
      <Tasks />
    </div>
  );
}

export default App;
