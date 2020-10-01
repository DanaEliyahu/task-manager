import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import taskStoreInstance from "./store";

export const TaskStoreContext = React.createContext();

ReactDOM.render(
  <React.StrictMode>
    <TaskStoreContext.Provider value={taskStoreInstance}>
      <App />
    </TaskStoreContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
