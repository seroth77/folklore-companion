import { IconButton } from "@material-ui/core";
import { createStyles, Theme, withStyles, WithStyles } from "@material-ui/core/styles";
import MoreIcon from "@material-ui/icons/MoreVert";
import * as React from "react";

const styles = (theme: Theme) =>
  createStyles({
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
  });

interface INavBarMobileProps extends WithStyles<typeof styles> {
  menuHandler: any;
}

class NavBarMobile extends React.Component<INavBarMobileProps> {
  public render() {
    const { classes, menuHandler } = this.props;

    return (
      <div className={classes.sectionMobile}>
        <IconButton aria-haspopup="true" onClick={menuHandler} color="inherit">
          <MoreIcon />
        </IconButton>
      </div>
    );
  }
}

export default withStyles(styles)(NavBarMobile);
