import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ScrollToTop } from "./components/functionality/ScrollTop";
import { Provider } from "react-redux";
import store from "./redux/store";
import GoogleMapsProvider from "./components/ui/GoogleMapsProvider";

// BugSnag
import Bugsnag from "@bugsnag/js";
import BugsnagPluginReact from "@bugsnag/plugin-react";
import BugsnagPerformance from "@bugsnag/browser-performance";

Bugsnag.start({
  apiKey:
    process.env.REACT_APP_BUGSNAG_API_KEY ?? "b2885088a98e1fbe2e0f8d524d887ed0",
  plugins: [new BugsnagPluginReact()],
});
BugsnagPerformance.start({
  apiKey:
    process.env.REACT_APP_BUGSNAG_API_KEY ?? "b2885088a98e1fbe2e0f8d524d887ed0",
});

const root = ReactDOM.createRoot(document.getElementById("root"));
// BugSnag configuration
const BugSnagErrorBoundary =
  Bugsnag.getPlugin("react").createErrorBoundary(React);

root.render(
  <BrowserRouter>
    <BugSnagErrorBoundary>
      <GoogleMapsProvider>
        <React.StrictMode>
          <ScrollToTop />
          <Provider store={store}>
            <App />
          </Provider>
        </React.StrictMode>
      </GoogleMapsProvider>
    </BugSnagErrorBoundary>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
