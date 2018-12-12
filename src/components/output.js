import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  }
});

class CSOutput extends React.PureComponent {
  render() {
    const { outputValue } = this.props;
    debugger;
    const logItems =
      outputValue.length > 0 &&
      outputValue.map((output, index) => (
        <ListItem key={index}>
          <ListItemText
            primary={`${JSON.stringify(output.message, null, 2)}`}
            secondary={output.error ? output.error : null}
          />
        </ListItem>
      ));

    return (
      <div className="log-wrapper">
        <List component="ul">{logItems}</List>
      </div>
    );
  }
}

CSOutput.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CSOutput);
