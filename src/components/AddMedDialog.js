import React from 'react';


import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

import {acceptedUnits} from 'constants.js';

var moment = require('moment');


const styles = {
};



class AddMedDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUnit: 2,
      med: {name: "", dose: "", units: "mg", time: null},
      doseErrorText: '',
      isNameValid: false,
      isDoseValid: false,
      isTimeValid: false,
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeDose = this.handleChangeDose.bind(this);
    this.handleChangeUnits = this.handleChangeUnits.bind(this);
    this.handleChangeTime = this.handleChangeTime.bind(this);

    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCancelDialog = this.handleCancelDialog.bind(this);
    this.handleSubmitDialog = this.handleSubmitDialog.bind(this);
  }


  handleChangeName = (event) => {
    let med = this.state.med;
    med.name = event.target.value;
    this.setState({ med: med });
  }

  handleChangeDose = (event) => {
    let med = this.state.med;
    med.dose = event.target.value;
    this.setState({ med: med, doseErrorText: '' });
  }
  
  handleChangeUnits = (event, index, value) => {
    let med = this.state.med;
    med.units = acceptedUnits[index];
    this.setState({ med: med, selectedUnit: value });
  }

  handleChangeTime = (event, time) => {
    let med = this.state.med;
    med.time = time;
    this.setState({ med: med });
  }

  handleOpenDialog = () => {
    this.setState({selectedUnit: 2, med: {name: "", dose: "", units: "mg", time: null},});
    this.props.onOpen();
  }

  handleCancelDialog = () => {
    this.props.onCancel();
  }

  handleSubmitDialog = (event) => {
    event.preventDefault();
    // Deep copy our med
    let med = JSON.parse(JSON.stringify(this.state.med));
    med.time = moment(med.time);

    this.props.onCancel();
    this.props.onSubmit(med);
  }

  render() {
    const visible = this.props.visible;
    const med = this.state.med;
    const selectedUnit = this.state.selectedUnit;
    const { classes } = this.props;


    return (
      <Dialog
        open={visible}
        onClose={this.handleCancelDialog}
      >
        <DialogTitle>Add Medication</DialogTitle>

        <DialogContent>
          <form autoComplete="off">
            <TextField
              label="Name"
              hintText='Name'
              value={med.name}
              onChange={this.handleChangeName} />
            
            <TextField
              label="Dose"
              hintText='Dose'
              value={med.dose}
              onChange={this.handleChangeDose} />
            
            <FormControl>
              <Select
                value={selectedUnit}
                onChange={this.handleChangeUnits}
                floatingLabelText="units"
              >
                <MenuItem value={1} primaryText="ug" />
                <MenuItem value={2} primaryText="mg" />
                <MenuItem value={3} primaryText="g" />
              </Select>
            </FormControl>

            <TextField
              id="time"
              label="Time"
              type="time"
              defaultValue=""
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              value={med.time}
              onChange={this.handleChangeTime}
            />
          </form>
        </DialogContent>

        <DialogActions>
          <Button color="secondary" onClick={this.handleCancelDialog}>
            Cancel
          </Button>

          <Button
            variant="raised"
            color="primary"
            onClick={this.handleSubmitDialog}
          >Add</Button>
        </DialogActions>
      </Dialog>

    );
  }
}


AddMedDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onOpen: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
};


export default withStyles(styles)(AddMedDialog);