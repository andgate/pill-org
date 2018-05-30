import AddMedDialog from 'components/AddMedDialog';

import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import AddCircle from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';


var moment = require('moment');


const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    height: '100%',
    color: theme.palette.text.secondary,
  },
});


class MedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addMedVisible: false,   
    };

    this.handleOpenAddMed = this.handleOpenAddMed.bind(this);
    this.handleCancelAddMed = this.handleCancelAddMed.bind(this);
    this.handleSubmitAddMed = this.handleSubmitAddMed.bind(this);
  }

  handleOpenAddMed = () => {
    this.setState({addMedVisible: true, });
  }

  handleCancelAddMed = () => {
    this.setState({addMedVisible: false, });
  }

  handleSubmitAddMed = (med) => {
    this.props.onAddMed(med);
  }

  render() {
    const meds = this.props.meds;
    const addMedVisible = this.state.addMedVisible;
    const { classes } = this.props;

    return (
      <Paper className={classes.paper} elevation={4}>
        <Typography variant="subheading">
          Medications
          <IconButton onClick={this.handleOpenAddMed}><AddCircle /></IconButton>
        </Typography>
        <AddMedDialog
          visible={addMedVisible}
          onOpen={this.handleOpenAddMed} 
          onCancel={this.handleCancelAddMed}
          onSubmit={this.handleSubmitAddMed}
        />

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Dose</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { meds.map( med => (
                <TableRow>
                  <TableCell>
                    {med.name}
                  </TableCell>
                  <TableCell>
                    {med.dose + med.units}
                  </TableCell>
                  <TableCell>
                    {moment(med.time).format("h:mm a")}
                  </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}


MedList.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(MedList);