import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CodeIcon from "@material-ui/icons/CodeRounded";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import { withFirebase } from "./firebase";
import { AuthUserContext } from "./session";
import * as ROUTES from "../constants/routes";

const TRUNCATE_LIMIT = 15;

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  avatar: {
    fontWeight: 600
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

class CSAppBar extends React.Component {
  state = {
    auth: true,
    anchorEl: null
  };
  static contextType = AuthUserContext;

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout = () => {
    this.props.firebase.doSignOut();
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, authUser } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const GuestMenu = () => (
      <Button color="inherit" component={Link} to={ROUTES.LOGIN}>
        LOGIN
      </Button>
    );
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton
              size="small"
              aria-label="Home"
              component={Link}
              to={ROUTES.EDITOR}
            >
              <CodeIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              CS Editor
            </Typography>
            <AuthUserContext.Consumer>
              {authUser =>
                authUser ? (
                  <React.Fragment>
                    <Chip
                      avatar={
                        <Avatar className={classes.avatar}>
                          {authUser.displayName
                            ? authUser.displayName[0].toUpperCase()
                            : authUser.email[0].toUpperCase()}
                        </Avatar>
                      }
                      label={
                        authUser.username
                          ? authUser.username.length > TRUNCATE_LIMIT
                            ? authUser.username
                                .slice(0, TRUNCATE_LIMIT)
                                .concat("...")
                            : authUser.username
                          : authUser.email.length > TRUNCATE_LIMIT
                          ? authUser.email
                              .slice(0, TRUNCATE_LIMIT)
                              .concat("...")
                          : authUser.email
                      }
                      onClick={this.handleMenu}
                      className={classes.chip}
                      variant="outlined"
                    />
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right"
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right"
                      }}
                      open={open}
                      onClose={this.handleClose}
                    >
                      <MenuItem onClick={this.handleClose}>Dashboard</MenuItem>
                      <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                    </Menu>
                  </React.Fragment>
                ) : (
                  <GuestMenu />
                )
              }
            </AuthUserContext.Consumer>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

CSAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withFirebase(withStyles(styles)(CSAppBar));
