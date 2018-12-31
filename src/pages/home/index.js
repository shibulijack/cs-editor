import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes";

const styles = theme => ({
  appBar: {
    position: "relative"
  },
  icon: {
    marginRight: theme.spacing.unit * 2
  },
  heroUnit: {},
  heroContent: {
    maxWidth: 600,
    margin: "0 auto",
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  },
  heroImg: {
    display: "block",
    margin: "20px auto"
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6
  }
});

const Home = props => {
  const { classes } = props;

  return (
    <div className={classes.heroUnit}>
      <div className={classes.heroContent}>
        <img
          className={classes.heroImg}
          src="./LOGO.png"
          width="200"
          height="200"
          alt="logo"
        />
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          CS Editor
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" paragraph>
          Clean & Simple Javascript online editor.
        </Typography>
        <div className={classes.heroButtons}>
          <Grid container spacing={16} justify="center">
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to={ROUTES.LOGIN}
              >
                LOGIN
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" component={Link} to={ROUTES.SIGNUP}>
                SIGNUP
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(Home);
