import { AppBar, Toolbar } from "@material-ui/core";
import { createStyles, Theme, withStyles, WithStyles } from "@material-ui/core/styles";
import * as React from "react";
import CharacterSelection from "../Content/CharacterSelection";
import NavBarDesktop from "./components/NavBarDesktop";
import NavBarDesktopMenu from "./components/NavBarDesktopMenu";
import NavBarMobile from "./components/NavBarMobile";
import NavBarMobileMenu from "./components/NavBarMobileMenu/index";
import NavBarTitle from "./components/NavBarTitle/index";

const styles = () => createStyles({
  grow: {
    flexGrow: 1,
  },
  root: {
    backgroundColor: "gray",
    width: "100%",
  },
});

type ILayoutProps = WithStyles<typeof styles>;

interface ILayoutState {
  anchorEl: null | HTMLElement;
  mobileMoreAnchorEl: null | HTMLElement;
}

class Layout extends React.Component<ILayoutProps, ILayoutState> {
  public state: ILayoutState = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
  };

  public render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <NavBarTitle />
            <div className={classes.grow} />
            <NavBarDesktop isMenuOpen={isMenuOpen} profileHandler={this.handleProfileMenuOpen} />
            <NavBarMobile menuHandler={this.handleMobileMenuOpen} />
          </Toolbar>
        </AppBar>
        <NavBarDesktopMenu anchorEl={anchorEl} isMenuOpen={isMenuOpen} menuCloseHandler={this.handleMenuClose} />
        <NavBarMobileMenu
          mobileMoreAnchorEl={mobileMoreAnchorEl}
          isMobileMenuOpen={isMobileMenuOpen}
          menuCloseHandler={this.handleMenuClose}
          mobileMenuCloseHandler={this.handleMobileMenuClose}
          profileMenuHandler={this.handleProfileMenuOpen}
        />

        <CharacterSelection />
      </div>
    );
  }

  private handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ anchorEl: event.currentTarget });
  }

  private handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  }

  private handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  }

  private handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  }
}

export default withStyles(styles)(Layout);
