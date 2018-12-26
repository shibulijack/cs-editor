import React from "react";
import Loadable from "react-loadable";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
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
    <CSAppBar />
    <Router>
      <div>
        <Redirect from={ROUTES.LANDING} to={ROUTES.EDITOR} />
        <Route exact path={ROUTES.EDITOR} component={EditorPage} />
      </div>
    </Router>
  </MuiThemeProvider>
);

export default App;
