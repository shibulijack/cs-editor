import React from "react";
import classNames from "classnames";
import * as Util from "../../util";

import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InfoIcon from "@material-ui/icons/InfoRounded";
import ErrorIcon from "@material-ui/icons/ErrorRounded";

const styles = theme => ({
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

const ConsoleLog = props => {
  const { consoleData, classes } = props;
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
  return consoleItems.length > 0 && <List component="ul">{consoleItems}</List>;
};

export default withStyles(styles)(ConsoleLog);
