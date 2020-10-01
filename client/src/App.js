import React from 'react';
import './App.css';
import CreateTask from './create-task';
import Tasks from './tasks';
import Cookies from 'js-cookie';

const App = () => {
  //useEffect(() => {
    
  //}, []);

  return (
    <div className="App">
      <CreateTask></CreateTask>
      <Tasks></Tasks>
    </div>
  );
}

export default App;
