import React, { Component } from "react";
import { captureConsole } from "../../util";

import Grid from "@material-ui/core/Grid";

import CSEditor from "./editor";
import CSOutput from "./output";
import CSSnackbar from "../../components/snackbar";
import CSActionBar from "../../components/action-bar";
import { withAuthorization } from "../../components/session";

import Snackbar from "@material-ui/core/Snackbar";

const DEFAULT_CODE = `//Sample Javascript function\n\nfunction sum(a, b)\n{\n\tconsole.log(a,b);\n\treturn a + b;\n}\n\nsum(1,2);`;
const EMPTY_STATE = "n/a";

class Editor extends Component {
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
    captureConsole();
    window.addEventListener("message", this.getMessage);
  }

  componentWillUnmount() {
    window.removeEventListener("message", this.getMessage);
  }

  getMessage = e => {
    let { data, type } = e.data;
    if (e.origin === process.env.REACT_APP_ROOT_URL && data) {
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
  };

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
      <div className="page-editor">
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
      </div>
    );
  }
}
// const condition = authUser => !!authUser;
export default withAuthorization(Editor);
