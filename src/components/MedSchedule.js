import React from 'react';

import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';

import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle';


export class MedSchedule extends React.Component {
  constructor(props) {
    super(props);

    this.handleTakeMed = this.handleTakeMed.bind(this);
  }

  handleTakeMed(index) {
    this.props.onTakeMed(index);
  }

  render() {
    let schedule = this.props.schedule;

    if (!schedule.length)
      return (
        <Paper zDepth={2}>

          <Subheader>Upcoming</Subheader>
          <List>
            <ListItem>
              <center>No upcoming medications</center>
            </ListItem>
          </List>
        </Paper>
      )

    return (
      <Paper zDepth={2}>

        <Subheader>Upcoming</Subheader>
        <List>
          {schedule.map((medName, index) =>
            <div>
              <ListItem
                onClick={(event) => this.handleTakeMed(index)}
              >
                <ActionCheckCircle />{medName}
              </ListItem>
              <Divider />
            </div>
          )}
        </List>
      </Paper>
    );
  }
}