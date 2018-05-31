import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

var moment = require('moment');


const styles = theme => ({

});


class MedHistory extends React.Component {
  render() {
    const history = this.props.history;
    const { classes } = this.props;

    if (!history.length)
      return (
        <div>
			<List>
				<ListItem  button>
					History is empty
				</ListItem>
			</List>
        </div>
      )

    return (
      <div>
		<List>
          {history.map((med, index) =>
              <ListItem button
                divider={true}
              >
                <Typography>
					{med.dose}{med.units} of {med.name} was taken at {moment(med.timeTaken).format('MMMM Do YYYY, h:mm a')}
				</Typography>
              </ListItem>
          )}
        </List>
      </div>
    );
  }
}


MedHistory.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};


export default withStyles(styles)(MedHistory);