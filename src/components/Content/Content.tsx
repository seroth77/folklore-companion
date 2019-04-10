import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import * as React from "react";
import * as sassStyles from "./Content.scss";

const styles = () => createStyles({
  col1: {
    backgroundColor: "red",
  },
  col2: {
    backgroundColor: "green",
  },
  col3: {
    backgroundColor: "yellow",
  },
  contentContainer: {
    display: "grid",
    gridTemplateColumns: "30% 30% auto",
    gridTemplateRows: "auto",
  },
});

type IContentProps = WithStyles<typeof styles>;

class Content extends React.Component<IContentProps, {}> {
  public render() {
    const { classes } = this.props;

    return (
      <div className={sassStyles.contentContainer}>
        <div className={classes.col1}>Col 1</div>
        <div className={classes.col2}>Col 2</div>
        <div className={classes.col3}>Col 3</div>
      </div>
    );
  }
}

export default withStyles(styles)(Content);
