import { Typography } from "@material-ui/core";
import { createStyles, Theme, withStyles, WithStyles } from "@material-ui/core/styles";
import * as React from "react";
import { FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";
import * as logo from "../../../../img/Folklore-Logo.png";

const styles = (theme: Theme) =>
  createStyles({
    logo: {
      width: "10%",
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
  });

interface INavBarTitleProps extends InjectedIntlProps, WithStyles<typeof styles> {}

class NavBarTitle extends React.Component<INavBarTitleProps> {
  public render() {
    const { formatMessage } = this.props.intl;
    const { classes } = this.props;

    return (
      <>
      <img src={logo} alt="logo" className={classes.logo} />
      <Typography className={classes.title} variant={"h6"} noWrap>
        <FormattedMessage id="title" />
      </Typography>
      </>
    );
  }
}

export default withStyles(styles)(injectIntl(NavBarTitle));
