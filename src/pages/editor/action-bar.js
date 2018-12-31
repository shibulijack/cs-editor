import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Fab from "@material-ui/core/Fab";
import PlayIcon from "@material-ui/icons/PlayArrowRounded";
import ClearIcon from "@material-ui/icons/ClearRounded";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Tooltip from "@material-ui/core/Tooltip";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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
  selectEmpty: {
    marginTop: 0
  },
  formControl: {
    marginRight: 16
  }
});

class CSActionBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontSize: 14
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes, onFabClick, onClearConsole } = this.props;
    return (
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar className={classes.toolbar} variant="dense">
          <Hidden mdDown>
            <div>
              <FormControl className={classes.formControl} disabled>
                <Select
                  value={this.state.fontSize}
                  onChange={this.handleChange}
                  displayEmpty
                  name="fontSize"
                  className={classes.selectEmpty}
                >
                  <MenuItem value={10}>Small</MenuItem>
                  <MenuItem value={14}>Medium</MenuItem>
                  <MenuItem value={16}>Large</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl} disabled>
                <Select
                  value={this.state.fontSize}
                  onChange={this.handleChange}
                  displayEmpty
                  name="fontSize"
                  className={classes.selectEmpty}
                >
                  <MenuItem value={10}>Light</MenuItem>
                  <MenuItem value={14}>Dark</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Hidden>
          <Tooltip title="Ctrl + Space" placement="top">
            <Fab
              color="secondary"
              aria-label="Add"
              className={classes.fabButton}
              onClick={onFabClick}
            >
              <PlayIcon />
            </Fab>
          </Tooltip>
          <div>
            <Button
              variant="outlined"
              color="default"
              size="small"
              className={classes.button}
              onClick={onClearConsole}
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
}

CSActionBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CSActionBar);
