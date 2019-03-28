import { createBrowserHistory } from "history";
import * as React from "react";
import { render } from "react-dom";
import { IntlProvider } from "react-intl";
import { Router } from "react-router-dom";
import ThemeProvider from "./components/ThemeProvider";
import { messages } from "./intl/en";

const history = createBrowserHistory();

const App = () => (
  <ThemeProvider>
    <IntlProvider messages={messages} locale="en-US">
      <Router history={history}>
        Hello React!
      </Router>
    </IntlProvider>
  </ThemeProvider>
);

render(<App />, document.getElementById("root"));
