import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import InfoIcon from "@material-ui/icons/InfoRounded";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  },
  card: {
    minWidth: 275,
    margin: "1.5rem"
  }
});

class CSOutput extends React.PureComponent {
  render() {
    const { outputValue, consoleData, classes } = this.props;
    debugger;
    const consoleItems =
      consoleData.length > 0 &&
      consoleData.map((console, index) => (
        <ListItem alignItems="flex-start" key={index}>
          <ListItemAvatar>
            <Avatar>
              <InfoIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={`${JSON.stringify(console.message, null, 2)}`}
            secondary={console.type ? `console.${console.type}` : null}
          />
        </ListItem>
      ));

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
              {outputValue && `${JSON.stringify(outputValue.data, null, 2)}`}
            </Typography>
          </CardContent>
        </Card>
        <List component="ul">{consoleItems}</List>
      </div>
    );
  }
}

CSOutput.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CSOutput);
