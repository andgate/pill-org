import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import ActionCheckCircle from '@material-ui/icons/CheckCircle';


const styles = theme => ({

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
        <div>
          <Typography variant='display1'>No upcoming medications</Typography>
        </div>
      )

    return (
      <div>
        <List>
          {schedule.map((med, index) =>
              <ListItem
                divider={true}
                onClick={(event) => this.handleTakeMed(index)}
              >
                <ActionCheckCircle color="secondary"/>
                <Typography variant='display1'>{med.name}</Typography>
              </ListItem>
          )}
        </List>
      
      </div>
    );
  }
}


MedSchedule.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(MedSchedule);