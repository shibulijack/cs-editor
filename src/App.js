import React, { Component } from "react";
import "./App.css";
import * as Util from "./util";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import CSAppBar from "./components/app-bar";
import CSEditor from "./components/editor";
import CSOutput from "./components/output";
import CSSnackbar from "./components/snackbar";
import CSActionBar from "./components/action-bar";

import CssBaseline from "@material-ui/core/CssBaseline";
import Snackbar from "@material-ui/core/Snackbar";

const DEFAULT_CODE = `//Sample Javascript function\n\nfunction sum(a, b)\n{\n\tconsole.log(a,b);\n\treturn a + b;\n}\n\nsum(1,2);`;
const EMPTY_STATE = "n/a";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#202124"
    },
    type: "dark"
  },
  typography: {
    fontSize: 14,
    // Use the system font instead of the default Roboto font.
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
      editorValue: DEFAULT_CODE,
      lastSavedValue: DEFAULT_CODE,
      outputValue: {
        data: EMPTY_STATE,
        error: false
      },
      consoleData: [],
      snackbarOpen: false
    };
  }

  componentDidMount() {
    Util.captureConsole();
    window.addEventListener("message", e => {
      let { data, type } = e.data;
      if (e.isTrusted && data) {
        this.setState(state => ({
          consoleData: [
            ...state.consoleData,
            {
              id: state.consoleData.length,
              message: data,
              type: type
            }
          ]
        }));
      }
    });
  }

  componentWillUnmount() {
    window.removeEventListener("message");
  }

  handleEditorChange(editor) {
    let value = editor.getValue();
    this.setState({
      lastSavedValue: value ? value : ""
    });
  }

  runCode(code) {
    try {
      // eslint-disable-next-line
      let userFunctionValue = (0, eval)(code);

      if (userFunctionValue) {
        this.setState(state => ({
          outputValue: { data: userFunctionValue, error: false }
        }));
      }
    } catch (e) {
      this.setState(state => ({
        snackbarOpen: true,
        outputValue: { data: e.message, error: true }
      }));
      this._setConsoleData(e.stack, "error");
    }
  }

  clearConsole() {
    this.setState({
      consoleData: []
    });
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ snackbarOpen: false });
  };

  _setConsoleData(message, type = "log") {
    this.setState(state => ({
      consoleData: [
        ...state.consoleData,
        {
          id: state.consoleData.length,
          message: message,
          type: type
        }
      ]
    }));
  }

  render() {
    const {
      editorValue,
      lastSavedValue,
      outputValue,
      consoleData
    } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <CSAppBar />
        <Grid container spacing={0}>
          <Grid item xs={12} sm={6}>
            <CSEditor
              editorValue={editorValue}
              onEditorChange={e => this.handleEditorChange(e)}
              onRunCode={e => this.runCode(lastSavedValue, e)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CSOutput outputValue={outputValue} consoleData={consoleData} />
          </Grid>
        </Grid>
        <CSActionBar
          onFabClick={e => this.runCode(lastSavedValue, e)}
          onClearConsole={e => this.clearConsole(e)}
        />
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={this.state.snackbarOpen}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <CSSnackbar
            onClose={this.handleClose}
            variant="error"
            message="Run time error"
          />
        </Snackbar>
      </MuiThemeProvider>
    );
  }
}

export default App;
