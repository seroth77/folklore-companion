import { Badge, IconButton, Menu, MenuItem } from "@material-ui/core";
import { createStyles, Theme, withStyles, WithStyles } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import * as React from "react";

const styles = (theme: Theme) => createStyles({});

interface INavBarMobileMenuProps extends WithStyles<typeof styles> {
  mobileMoreAnchorEl: HTMLElement;
  isMobileMenuOpen: boolean;
  menuCloseHandler: any;
  mobileMenuCloseHandler: any;
  profileMenuHandler: any;
}

class NavBarMobileMenu extends React.Component<INavBarMobileMenuProps> {
  public render() {
    const {
      mobileMoreAnchorEl,
      isMobileMenuOpen,
      menuCloseHandler,
      mobileMenuCloseHandler,
      profileMenuHandler,
    } = this.props;

    return (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={menuCloseHandler}
      >
        <MenuItem onClick={mobileMenuCloseHandler}>
          <IconButton color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={profileMenuHandler}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );
  }
}

export default withStyles(styles)(NavBarMobileMenu);
