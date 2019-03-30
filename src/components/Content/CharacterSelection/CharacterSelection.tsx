import {
  CircularProgress,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Paper,
  Typography,
} from "@material-ui/core";
import { createStyles, Theme, withStyles, WithStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import memoizeOne from "memoize-one";
import * as React from "react";
import { FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";
import GameResourcesService from "../../../api/GameResourcesService/GameResourcesService";
import { ICharacterResources, IGameResources } from "../../../api/models/GameResources";

const styles = (theme: Theme) =>
  createStyles({
    card: {
      minWidth: 275,
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    root: {
      marginTop: theme.spacing.unit * 2,
      width: "100%",
    },
  });

interface ICharacterSelectionProps extends InjectedIntlProps, WithStyles<typeof styles> {}

interface ICharacterSelectionState {
  data: IGameResources[];
  loading: boolean;
}

function responseData(data: IGameResources[]) {
  return data;
}

class CharacterSelection extends React.Component<ICharacterSelectionProps, ICharacterSelectionState> {
  public state: ICharacterSelectionState = {
    data: [],
    loading: false,
  };

  private readonly service = new GameResourcesService();
  private readonly responseDataMemoized = memoizeOne(responseData);
  private mounted = false;

  public componentDidMount() {
    this.mounted = true;
    this.fetchData();
  }

  public render() {
    const { data, loading } = this.state;
    const { classes } = this.props;

    const responseDataMemoized = this.responseDataMemoized(data);

    return (
      <div className={classes.root}>
        {loading && <CircularProgress />}
        {!loading &&
          responseDataMemoized.map((resource: IGameResources) => (
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  <FormattedMessage id={resource.Adventure} />
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                {resource.Characters.map((character: ICharacterResources) => (
                  <>
                    <Paper>
                      <Typography variant="h5" component="h3">
                        {character.Archetype}
                      </Typography>
                      <Typography component="p">
                        {character.Description}
                      </Typography>
                    </Paper>
                  </>
                ))}
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
      </div>
    );
  }

  private async fetchData() {
    const data = await this.service.fetchGameManuals();
    console.log(data);
    this.setState({
      loading: true,
    });

    if (this.mounted) {
      this.setState({
        data,
        loading: false,
      });
    }
  }

  // private handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
  //   this.setState({ anchorEl: event.currentTarget });
  // };

  // private handleMenuClose = () => {
  //   this.setState({ anchorEl: null });
  //   this.handleMobileMenuClose();
  // };

  // private handleMobileMenuClose = () => {
  //   this.setState({ mobileMoreAnchorEl: null });
  // };

  // private handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
  //   this.setState({ mobileMoreAnchorEl: event.currentTarget });
  // };
}

export default withStyles(styles)(injectIntl(CharacterSelection));
