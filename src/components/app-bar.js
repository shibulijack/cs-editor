import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  }
};

function CSAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" className={classes.grow}>
            CS Editor
          </Typography>
          <Button color="inherit">LOGIN</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

CSAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CSAppBar);
