import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";

import * as ROUTES from "../../constants/routes";

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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      showPassword: false
    };
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
    debugger;
    this.props.history.push("/editor");
    event.preventDefault();
  };

  render() {
    const { classes } = this.props;
    const { userName, password } = this.state;
    const isInvalid = userName === "" || password === "";
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
                  <Link to={ROUTES.EDITOR}>click here.</Link>
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
                  id="name"
                  label="Name"
                  className={classes.textField}
                  value={this.state.userName}
                  onChange={this.handleChange("userName")}
                  margin="normal"
                  variant="filled"
                  fullWidth
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
                  disabled={isInvalid}
                  fullWidth
                >
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(withStyles(styles)(Login));
