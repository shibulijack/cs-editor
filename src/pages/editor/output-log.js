import React from "react";
import * as Util from "../../util";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  card: {
    minWidth: 275,
    margin: "1.5rem"
  }
});

const OutputLog = props => {
  const { outputValue, classes } = props;
  return (
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
  );
};

export default withStyles(styles)(OutputLog);
