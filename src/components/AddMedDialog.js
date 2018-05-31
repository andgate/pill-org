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
import Typography from '@material-ui/core/Typography';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';


import Grid from '@material-ui/core/Grid';

import {acceptedUnits} from 'constants.js';

var moment = require('moment');


const styles = {
};

const steps = ['Name', 'Dosage', 'Time'];

class AddMedDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      selectedUnit: 2,
      med: {name: "", dose: "", units: "mg", time: null},
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
    this.setState({activeStep: 0, selectedUnit: 2, med: {name: "", dose: "", units: "mg", time: null},});
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


  render() {
    const classes = this.props.classes;
    const visible = this.props.visible;
    const med = this.state.med;
    const selectedUnit = this.state.selectedUnit;
    const activeStep = this.state.activeStep;

    let activeContent = undefined;

    let mainButton = undefined;

    if(activeStep === 3) {
      mainButton = (
        <Button
          variant="raised"
          color="primary"
          onClick={this.handleSubmitDialog}
        >
          Okay
        </Button>
      );
    } else {
      mainButton = (
        <Button
          variant="raised"
          color="primary"
          onClick={this.handleNext}
        >
          Next
        </Button>
      );
    }

    switch(activeStep) {
      case 0:
        activeContent = (
          <form autoComplete="off">
            <Grid container justify='center' alignItems='flex-end'>
              <Grid item>
                <TextField
                      label="Name"
                      hintText='Name'
                      value={med.name}
                      onChange={this.handleChangeName}
                />
              </Grid>
            </Grid>
          </form>
        );
        break;

      case 1:
        activeContent = (
          <form autoComplete="off">
            <Grid container justify='center' alignItems='flex-end'>
              <Grid item>
                <TextField
                  label="Dose"
                  hintText='Dose'
                  value={med.dose}
                  onChange={this.handleChangeDose}
                />
              </Grid>

              <Grid item>
                <FormControl>
                  <Select
                    value={selectedUnit}
                    onChange={this.handleChangeUnits}
                  >
                    <MenuItem value={1}>ug</MenuItem>
                    <MenuItem value={2}>mg</MenuItem>
                    <MenuItem value={3}>g</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </form>
        );
        break;

      case 2:
        activeContent = (
          <form autoComplete="off" novalidate>
            <Grid container justify='center' alignItems='flex-end'>
              <Grid item>
                <TextField
                  id="time"
                  label="Time"
                  type="time"
                  defaultValue="12:00"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                  value={med.time}
                  onChange={this.handleChangeTime}
                />
              </Grid>
            </Grid>
          </form>
        );
        break;

      case 3:
        activeContent = (
          <form autoComplete="off">
            <Grid container justify='center' alignItems='flex-end'>
              <Grid item>
                <Typography>
                  Take {med.name} {med.dose} {med.units} at {med.time}
                </Typography>
              </Grid>
            </Grid>
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
          <Typography variant='subheading'>
            Add Medication
          </Typography>
        </DialogTitle>

        <DialogContent>
          {activeContent}

          <Stepper activeStep={activeStep}>
            { steps.map((label, index) => {
                return (
                  <Step key={label} >
                    <StepLabel>{label}</StepLabel>
                  </Step>
                );
            })}
          </Stepper>
        </DialogContent>

        <DialogActions>
          <Button color="secondary" onClick={this.handleCancelDialog}>
            Cancel
          </Button>

          <Button
            disabled={activeStep === 0}
            onClick={this.handleBack}
          >
            Back
          </Button>

          {mainButton}

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