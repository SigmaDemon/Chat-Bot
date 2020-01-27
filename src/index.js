import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux"; // the Provider is added from react-redux to wrap the entire application into a provider function
import { store } from "./Chat"; // this statement connects the store function in the Chat.js app with the App function inside index.js
import "milligram"; // the milligram statement is imported to provide the CSS that changes the application's font style

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
