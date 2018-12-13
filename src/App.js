import React, { Component } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import "./App.css";

import CSAppBar from "./components/app-bar";
import CSEditor from "./components/editor";
import CSOutput from "./components/output";
import CSSnackbar from "./components/snackbar";
import CSActionBar from "./components/action-bar";

import CssBaseline from "@material-ui/core/CssBaseline";
import Snackbar from "@material-ui/core/Snackbar";

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
    let editorData = `//Sample Javascript function\n\nfunction sum(a, b)\n{\n\treturn a + b;\n}\n\nsum(1,2);`;
    this.state = {
      editorValue: editorData,
      lastSavedValue: editorData,
      outputValue: [],
      snackbarOpen: false
    };
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  handleEditorChange(editor) {
    let value = editor.getValue();
    this.setState({
      lastSavedValue: value ? value : ""
    });
  }

  runCode(code) {
    debugger;
    try {
      // eslint-disable-next-line
      let userFunctionValue = (0, eval)(code);

      if (userFunctionValue) {
        this.setState(state => ({
          outputValue: [
            ...state.outputValue,
            { message: userFunctionValue, error: null }
          ]
        }));
      }
    } catch (e) {
      this.setState(state => ({
        snackbarOpen: true,
        outputValue: [
          ...state.outputValue,
          { message: e.message, error: e.stack }
        ]
      }));
    }
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ snackbarOpen: false });
  };

  render() {
    const { editorValue, lastSavedValue, outputValue } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <CSAppBar />
        <Grid container spacing={0}>
          <Grid item xs={6}>
            <CSEditor
              editorValue={editorValue}
              onEditorChange={this.handleEditorChange}
            />
          </Grid>
          <Grid item xs={6}>
            <CSOutput outputValue={outputValue} />
          </Grid>
        </Grid>
        <CSActionBar onFabClick={e => this.runCode(lastSavedValue, e)} />
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
