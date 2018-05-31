import AddMedDialog from 'components/AddMedDialog';

import React from 'react';
import MediaQuery from 'react-responsive';

import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';

import AddCircle from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';


var moment = require('moment');


const styles = theme => ({
  medTable: {
    minHeight: '100%',
  },
  fab: {
    position: 'absolute',
    transition: '.5s ease',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  }
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
      <div>
        <AddMedDialog
          visible={addMedVisible}
          onOpen={this.handleOpenAddMed} 
          onCancel={this.handleCancelAddMed}
          onSubmit={this.handleSubmitAddMed}
        />

        <MediaQuery minDeviceWidth={1224}>
          <Typography variant="subheading">
            Medications
            <IconButton onClick={this.handleOpenAddMed} color="primary"><AddCircle /></IconButton>
          </Typography>
        </MediaQuery>

        <Table className={classes.medTable}>
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
                    <Typography>
                      {med.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {med.dose + med.units} 
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {moment(med.time).format("h:mm a")}
                    </Typography>
                  </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>

        <MediaQuery maxDeviceWidth={1224}>
          <Button onClick={this.handleOpenAddMed} variant="fab" color="primary" aria-label="add" className={classes.fab}>
            <AddIcon />
          </Button>
        </MediaQuery>
        
      </div>
    );
  }
}


MedList.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(MedList);