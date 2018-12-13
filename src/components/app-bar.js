import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CodeIcon from "@material-ui/icons/CodeRounded";
import OpenIcon from "@material-ui/icons/OpenInNewRounded";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
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

function CSAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <CodeIcon className={classes.leftIcon} />
          <Typography variant="h6" color="inherit" className={classes.grow}>
            CS Editor
          </Typography>
          <Button disabled color="inherit">
            LOGIN
          </Button>
          <Button
            href="https://github.com/shibulijack/cs-editor"
            target="_blank"
            color="default"
            size="small"
            aria-label="Open drawer"
          >
            <OpenIcon
              className={classNames(classes.leftIcon, classes.iconSmall)}
            />
            Github
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

CSAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CSAppBar);
