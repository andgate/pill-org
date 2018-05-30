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

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import {acceptedUnits} from 'constants.js';

var moment = require('moment');


const styles = {
};

const steps = ['Medication Name', 'Dosage', 'Time'];

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
      activeStep: 0,
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeDose = this.handleChangeDose.bind(this);
    this.handleChangeUnits = this.handleChangeUnits.bind(this);
    this.handleChangeTime = this.handleChangeTime.bind(this);

    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCancelDialog = this.handleCancelDialog.bind(this);
    this.handleSubmitDialog = this.handleSubmitDialog.bind(this);


    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
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


  handleNext = () => {
    this.setState((prevState) => ({
      activeStep: prevState.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState((prevState) => ({
      activeStep: prevState.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    const classes = this.props.classes;
    const visible = this.props.visible;
    const med = this.state.med;
    const selectedUnit = this.state.selectedUnit;
    const activeStep = this.state.activeStep;

    let activeContent = undefined;

    switch(activeStep) {
      case 0:
        activeContent = (
          <form autoComplete="off">
            <TextField
                  label="Name"
                  hintText='Name'
                  value={med.name}
                  onChange={this.handleChangeName}
            />
          </form>
        );
        break;

      case 1:
        activeContent = (
          <form autoComplete="off">
            <TextField
              label="Dose"
              hintText='Dose'
              value={med.dose}
              onChange={this.handleChangeDose}
            />
            
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
          </form>
        );
        break;

      case 2:
        activeContent = (
          <form autoComplete="off">
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
        );
        break;
      
      default:
        break;
    };


    return (
      <Dialog
        open={visible}
        onClose={this.handleCancelDialog}
      >
        <DialogTitle>
          Add Medication
          <Stepper activeStep={activeStep}>
            { steps.map((label, index) => {
                return (
                  <Step key={label} >
                    <StepLabel>{label}</StepLabel>
                  </Step>
                );
            })}
          </Stepper>
        </DialogTitle>

        <DialogContent>
          {activeContent}
        </DialogContent>

        <DialogActions>
          <Button
            disabled={activeStep === 0}
            onClick={this.handleBack}
          >
            Back
          </Button>



          <Button color="secondary" onClick={this.handleCancelDialog}>
            Cancel
          </Button>


          <Button
            variant="raised"
            color="primary"
            onClick={this.handleNext}
          >
            Next
          </Button>

          <Button
            variant="raised"
            color="primary"
            onClick={this.handleSubmitDialog}
          >
            Add
          </Button>
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