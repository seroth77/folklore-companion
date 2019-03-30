import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
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
  expanded?: string;
  loading: boolean;
}

function responseData(data: IGameResources[]) {
  return data;
}

class CharacterSelection extends React.Component<ICharacterSelectionProps, ICharacterSelectionState> {
  public state: ICharacterSelectionState = {
    data: [],
    expanded: null,
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
    const { data, expanded, loading } = this.state;
    const { classes } = this.props;

    const responseDataMemoized = this.responseDataMemoized(data);

    return (
      <div className={classes.root}>
        {loading && <CircularProgress />}
        {!loading &&
          responseDataMemoized.map((resource: IGameResources) => (
            <Card key={resource.Key}>
              <CardHeader
                title={<FormattedMessage id={resource.Adventure} />}
              />
              <CardContent>
                {resource.Characters.map((character: ICharacterResources) => (
                  <ExpansionPanel
                    expanded={expanded === "panel" + character.Key}
                    key={character.Key}
                    onChange={this.handleChange("panel" + character.Key)}
                  >
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      <FontAwesomeIcon icon={faBook} size="2x" />
                      <Typography className={classes.heading}>{character.Archetype}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <Typography component="p">
                        {character.Description}
                      </Typography>
                      <Button variant="contained" color="primary">
                        Select
                      </Button>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                ))}
              </CardContent>
            </Card>
          ))}
      </div>
    );
  }

  private async fetchData() {
    const data = await this.service.fetchGameManuals().then(
      (response) => {
        return response.map((x) => {
          return {
            ...x,
            Characters: x.Characters.map((y) => {
              return {
                ...y,
                Key: Math.random().toString(),
              };
            }),
            Key: Math.random().toString(),
          };
        });
      },
    );

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

  private handleChange = (panel: string) => (event: any, expanded: boolean) => {
    this.setState({
      expanded: expanded ? panel : null,
    });
  }
}

export default withStyles(styles)(injectIntl(CharacterSelection));
