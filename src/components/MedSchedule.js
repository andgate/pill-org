import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import ActionCheckCircle from '@material-ui/icons/CheckCircle';


const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
});


class MedSchedule extends React.Component {
  constructor(props) {
    super(props);

    this.handleTakeMed = this.handleTakeMed.bind(this);
  }

  handleTakeMed(index) {
    this.props.onTakeMed(index);
  }

  render() {
    const schedule = this.props.schedule;
    const { classes } = this.props;

    if (!schedule.length)
      return (
        <Paper zDepth={2}>

          <Typography variant="subheading">Upcoming</Typography>
          <List>
            <ListItem>
              <center>No upcoming medications</center>
            </ListItem>
          </List>
        </Paper>
      )

    return (
      <div>
      <Paper className={classes.root} elevation={2}>

        <Typography variant="subheading">Upcoming</Typography>
        <List>
          {schedule.map((medName, index) =>
            <div>
              <ListItem
                divider={true}
                onClick={(event) => this.handleTakeMed(index)}
              >
                <ActionCheckCircle />{medName}
              </ListItem>
            </div>
          )}
        </List>
      </Paper>
      </div>
    );
  }
}


MedSchedule.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(MedSchedule);