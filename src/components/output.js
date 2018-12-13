import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import * as Util from "../util";

import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import InfoIcon from "@material-ui/icons/InfoRounded";
import ErrorIcon from "@material-ui/icons/ErrorRounded";

const styles = theme => ({
  dense: {
    marginTop: 16
  },
  card: {
    minWidth: 275,
    margin: "1.5rem"
  },
  hr: {
    backgroundColor: "#202124"
  },
  log: {
    marginTop: "0.5rem",
    fontSize: "2rem"
  },
  info: {
    fill: theme.palette.primary.light
  },
  error: {
    fill: theme.palette.error.dark
  }
});

class CSOutput extends React.PureComponent {
  render() {
    const { outputValue, consoleData, classes } = this.props;
    const consoleItems =
      consoleData.length > 0 &&
      consoleData.map(console => (
        <React.Fragment key={console.id}>
          <ListItem alignItems="flex-start">
            {console.type === "log" ? (
              <InfoIcon className={classNames(classes.log, classes.info)} />
            ) : (
              <ErrorIcon className={classNames(classes.log, classes.error)} />
            )}
            <ListItemText
              primary={Util.safePrint(console.message)}
              secondary={console.type ? `console.${console.type}` : null}
            />
          </ListItem>
          <Divider className={classes.hr} />
        </React.Fragment>
      ));
    const consoleLog = consoleData.length > 0 && (
      <List component="ul">{consoleItems}</List>
    );
    return (
      <div className="log-wrapper">
        <Card className={classes.card}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Output
            </Typography>
            <Typography variant="h5" component="h2">
              {outputValue && Util.safePrint(outputValue.data)}
            </Typography>
          </CardContent>
        </Card>
        {consoleLog}
      </div>
    );
  }
}

CSOutput.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CSOutput);
