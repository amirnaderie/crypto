import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
//import registerServiceWorker from "./registerServiceWorker";
import 'bootstrap/dist/css/bootstrap.min.css';
import "font-awesome/css/font-awesome.min.css";
import swDev from './swDev'

ReactDOM.render(
  <React.StrictMode>
  
      <App/>
  
</React.StrictMode>,
  document.getElementById("root")
);
//registerServiceWorker();
swDev();