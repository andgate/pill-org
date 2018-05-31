import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    height: '100%',
    color: theme.palette.text.secondary,
  }, 
});


class MedHistory extends React.Component {
  render() {
    const history = this.props.history;
    const { classes } = this.props;

    if (!history.length)
      return (
        <Paper className={classes.paper} elevation={4}>

          <Typography variant="subheading">History</Typography>
          <List>
            <ListItem>
              <center>History Empty</center>
            </ListItem>
          </List>
        </Paper>
      )

    return (
      <Paper className={classes.paper} elevation={4}>

        <Typography variant="subheading">History</Typography>
        <List>
          {history.map((med, index) =>
              <ListItem
                divider={true}
              >
                <Typography>
					{med.name} was taken at {med.timeTaken}
				</Typography>
              </ListItem>
          )}
        </List>
      
      </Paper>
    );
  }
}


MedHistory.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};


export default withStyles(styles)(MedHistory);