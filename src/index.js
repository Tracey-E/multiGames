import * as React from "react";
import { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot  } from "react-dom/client";
import "./index.css";
//import App from "./App";
import reportWebVitals from "./reportWebVitals";

const App = React.lazy(() => import("./App"));

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  
     <Suspense fallback={<div>Loading...</div>}>
    <Router>
      <App />
    </Router>
    </Suspense>
 
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
