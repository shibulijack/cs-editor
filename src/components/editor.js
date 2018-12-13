import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { UnControlled as CodeMirror } from "react-codemirror2";

require("../../node_modules/codemirror/mode/javascript/javascript");

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  cm: {
    fontSize: "1.1rem"
  }
});

class CSEditor extends React.Component {
  render() {
    const { classes, editorValue } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <CodeMirror
          value={editorValue}
          className={classes.cm}
          options={{
            mode: "javascript",
            theme: "base16-dark",
            extraKeys: {
              "Ctrl-Space": cm => this.props.onRunCode(cm.getValue())
            },
            autofocus: true,
            lineNumbers: true,
            indentUnit: 2,
            indentWithTabs: true,
            tabSize: 2
          }}
          onChange={(editor, data, value) => this.props.onEditorChange(editor)}
        />
      </form>
    );
  }
}

CSEditor.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CSEditor);
