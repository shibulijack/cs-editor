import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Fab from "@material-ui/core/Fab";
import StarIcon from "@material-ui/icons/OpenInNewRounded";
import PlayIcon from "@material-ui/icons/PlayArrowRounded";
import ClearIcon from "@material-ui/icons/ClearRounded";
import classNames from "classnames";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  appBar: {
    top: "auto",
    bottom: 0
  },
  toolbar: {
    alignItems: "center",
    justifyContent: "space-between"
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto"
  },
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 16
  }
});

function CSActionBar(props) {
  const { classes } = props;
  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <Toolbar className={classes.toolbar} variant="dense">
        <Button
          href="https://github.com/shibulijack/cs-editor"
          target="_blank"
          color="default"
          size="small"
          aria-label="Open drawer"
        >
          <StarIcon
            className={classNames(classes.leftIcon, classes.iconSmall)}
          />
          Github
        </Button>
        <Fab
          color="secondary"
          aria-label="Add"
          className={classes.fabButton}
          onClick={props.onFabClick}
        >
          <PlayIcon />
        </Fab>
        <div>
          <Button
            variant="outlined"
            color="default"
            size="small"
            className={classes.button}
            onClick={props.onClearConsole}
          >
            <ClearIcon
              className={classNames(classes.leftIcon, classes.iconSmall)}
            />
            Clear console
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

CSActionBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CSActionBar);
