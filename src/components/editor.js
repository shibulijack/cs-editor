import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { UnControlled as CodeMirror } from "react-codemirror2";

require("../../node_modules/codemirror/mode/javascript/javascript");

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  }
});

class CSEditor extends React.Component {
  render() {
    const { classes, editorValue } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <CodeMirror
          value={editorValue}
          options={{
            mode: "javascript",
            theme: "base16-dark",
            lineNumbers: true
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
