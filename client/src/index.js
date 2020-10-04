import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import taskStoreInstance from "./store";

import "./index.scss";
import CssBaseline from '@material-ui/core/CssBaseline';

export const TaskStoreContext = React.createContext();

ReactDOM.render(
  <React.StrictMode>
    <TaskStoreContext.Provider value={taskStoreInstance}>
      <CssBaseline />
      <App />
    </TaskStoreContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
