import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";

import { withFirebase } from "../../components/firebase";
import CSSnackbar from "../../components/snackbar";
import { isAuthenticated } from "../../util";

import Snackbar from "@material-ui/core/Snackbar";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";

import * as ROUTES from "../../constants/routes";

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

const styles = theme => ({
  container: {
    height: "calc(100vh - 48px)",
    backgroundImage: "url(https://source.unsplash.com/featured/?code)",
    backgroundSize: "cover"
  },
  grid: {
    "z-index": 1
  },
  card: {
    backgroundColor: "#202123",
    margin: "auto",
    maxWidth: "480px"
  },
  cardHeader: {
    paddingBottom: 0
  },
  submitBtn: {
    marginTop: 16
  }
});

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE,
      showPassword: false,
      isLoading: false
    };
  }

  componentDidMount() {
    if (isAuthenticated()) {
      this.props.history.push(ROUTES.EDITOR);
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleSubmit = event => {
    const { email, password } = this.state;
    this.setState({
      isLoading: true
    });
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.EDITOR);
      })
      .catch(error => {
        this.setState({ error: error.message, isLoading: false });
      });
    event.preventDefault();
  };

  render() {
    const { classes } = this.props;
    const { email, password, isLoading } = this.state;
    const isInvalid = password === "" || email === "";
    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.container}
      >
        <div className="overlay" />
        <Grid item xs={12} zeroMinWidth className={classes.grid}>
          <Card className={classes.card} raised>
            <CardHeader
              title="Login"
              className={classes.cardHeader}
              subheader={
                <Typography variant="caption">
                  To create a new account,{" "}
                  <Link className="text-link" to={ROUTES.SIGNUP}>
                    click here.
                  </Link>
                </Typography>
              }
            />
            <CardContent>
              <form
                onSubmit={this.handleSubmit}
                className={classes.form}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="email"
                  label="Email"
                  placeholder="your.email@domain.com"
                  className={classes.textField}
                  value={this.state.email}
                  onChange={this.handleChange("email")}
                  margin="normal"
                  variant="filled"
                  fullWidth
                  autoFocus
                  autoComplete="email"
                />

                <TextField
                  id="password"
                  label="Password"
                  type={this.state.showPassword ? "text" : "password"}
                  className={classes.textField}
                  value={this.state.password}
                  onChange={this.handleChange("password")}
                  margin="normal"
                  variant="filled"
                  fullWidth
                  autoComplete="current-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment variant="filled" position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowPassword}
                        >
                          {this.state.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  size="large"
                  className={classes.submitBtn}
                  disabled={isInvalid || isLoading}
                  fullWidth
                >
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
          <Snackbar
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={this.state.error && this.state.error.length > 0}
            autoHideDuration={6000}
            onClose={this.handleClose}
          >
            <CSSnackbar
              onClose={this.handleClose}
              variant="error"
              message={this.state.error}
            />
          </Snackbar>
        </Grid>
      </Grid>
    );
  }
}

const LoginPage = compose(
  withRouter,
  withFirebase,
  withStyles(styles)
)(LoginForm);

export default LoginPage;
