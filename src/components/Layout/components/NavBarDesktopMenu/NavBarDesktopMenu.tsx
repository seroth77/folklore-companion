import { Menu, MenuItem } from "@material-ui/core";
import { createStyles, Theme, withStyles, WithStyles } from "@material-ui/core/styles";
import * as React from "react";

const styles = (theme: Theme) =>
  createStyles({

  });

interface INavBarDesktopMenuProps extends WithStyles<typeof styles> {
  anchorEl: HTMLElement;
  isMenuOpen: boolean;
  menuCloseHandler: any;
}

class NavBarDesktopMenu extends React.Component<INavBarDesktopMenuProps> {
  public render() {
    const { anchorEl, isMenuOpen, menuCloseHandler } = this.props;

    return (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={menuCloseHandler}
      >
        <MenuItem onClick={menuCloseHandler}>Profile</MenuItem>
        <MenuItem onClick={menuCloseHandler}>My account</MenuItem>
      </Menu>
    );
  }
}

export default withStyles(styles)(NavBarDesktopMenu);
