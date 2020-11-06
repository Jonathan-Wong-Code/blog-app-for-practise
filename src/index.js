import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  ReactQueryCacheProvider,
  queryCache,
  ReactQueryConfigProvider,
} from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";

if (process.env.NODE_ENV === "development") {
  const { worker } = require("./tests/server");
  worker.start();
}

const config = {
  queries: {
    retry(failureCount, error) {
      if (error.status === 404) return false;
      else if (failureCount < 2) return false;
      else return false;
    },
    refetchOnWindowFocus: false,
  },
};

ReactDOM.render(
  <React.StrictMode>
    <ReactQueryCacheProvider queryCache={queryCache}>
      <ReactQueryConfigProvider config={config}>
        <ReactQueryDevtools intitialIsOpen={true} />
        <App />
      </ReactQueryConfigProvider>
    </ReactQueryCacheProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
