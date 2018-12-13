import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Fab from "@material-ui/core/Fab";
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
  },
  chip: {
    fontWeight: 600,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

function CSActionBar(props) {
  const { classes } = props;
  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <Toolbar className={classes.toolbar} variant="dense">
        <Typography variant="overline" color="textSecondary">
          Press{" "}
          <Chip
            label="Ctrl + Space"
            className={classes.chip}
            variant="outlined"
          />{" "}
          to execute the code.
        </Typography>

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
