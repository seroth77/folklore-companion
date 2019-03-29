import { Badge, IconButton } from "@material-ui/core";
import { createStyles, Theme, withStyles, WithStyles } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import * as React from "react";

const styles = (theme: Theme) =>
  createStyles({
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
  });

interface INavBarDesktopProps extends WithStyles<typeof styles> {
  isMenuOpen: boolean;
  profileHandler: any;
}

class NavBarDesktop extends React.Component<INavBarDesktopProps> {
  public render() {
    const { classes, isMenuOpen, profileHandler } = this.props;

    return (
      <div className={classes.sectionDesktop}>
        <IconButton color="inherit">
          <Badge badgeContent={5} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton
          aria-owns={isMenuOpen ? "material-appbar" : undefined}
          aria-haspopup="true"
          onClick={profileHandler}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </div>
    );
  }
}

export default withStyles(styles)(NavBarDesktop);
