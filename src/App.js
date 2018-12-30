import React, { Component } from "react";
import Loadable from "react-loadable";
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import { withFirebase } from "./components/firebase";
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

const SignupPage = Loadable({
  loader: () => import("./pages/signup"),
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null
    };
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <React.Fragment>
            <CSAppBar authUser={this.state.authUser} />
            <Route exact path={ROUTES.EDITOR} component={EditorPage} />
            <Route exact path={ROUTES.LOGIN} component={LoginPage} />
            <Route exact path={ROUTES.SIGNUP} component={SignupPage} />
          </React.Fragment>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default withFirebase(App);
