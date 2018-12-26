import React from "react";
import Loadable from "react-loadable";
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as ROUTES from "./constants/routes";

import "./App.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import CSAppBar from "./components/app-bar";
import Loader from "./components/loader";

const EditorPage = Loadable({
  loader: () => import("./pages/editor"),
  loading: Loader
});

const LoginPage = Loadable({
  loader: () => import("./pages/login"),
  loading: Loader
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#202124"
    },
    type: "dark"
  },
  typography: {
    fontSize: 14,
    fontFamily: [
      '"Source Sans Pro"',
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    useNextVariants: true
  }
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
      <div>
        <CSAppBar />
        <Route exact path={ROUTES.EDITOR} component={EditorPage} />
        <Route exact path={ROUTES.LOGIN} component={LoginPage} />
      </div>
    </Router>
  </MuiThemeProvider>
);

export default App;
