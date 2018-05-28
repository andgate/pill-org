import React from 'react';

import Dialog from 'material-ui/Dialog';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import TimePicker from 'material-ui/TimePicker';
import TextField from 'material-ui/TextField';

import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

import {acceptedUnits} from 'constants.js';

var moment = require('moment');



export class AddMedDialog extends React.Component {
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

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleCancelDialog}
      />,
      <RaisedButton
        label="Add"
        primary={true}
        disabled={false}
        onClick={this.handleSubmitDialog}
      />,
    ];

    return (
        <Dialog
          title='Add Medication'
          actions={actions}
          modal={false}
          open={visible}
          onRequestClose={this.handleCancelDialog}
        >
          <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => console.log(errors)}
          >
            <div>
            <TextValidator
              floatingLabelText="Name"
              hintText='Name'
              onChange={this.handleChangeName}
              name="Name"
              value={med.name}
              validators={['required']}
              errorMessages={['this field is required']}
            />
            </div>
            
            <div>
            <TextField floatingLabelText="Dose" hintText='Dose' value={med.dose} onChange={this.handleChangeDose} />
            </div>
            
            <div>
            <SelectField
              floatingLabelText="units"
              value={selectedUnit}
              onChange={this.handleChangeUnits}
            >
              <MenuItem value={1} primaryText="ug" />
              <MenuItem value={2} primaryText="mg" />
              <MenuItem value={3} primaryText="g" />
            </SelectField>
            </div>
            
            <div>
            <TimePicker floatingLabelText="Time" hintText="Time" value={med.time} onChange={this.handleChangeTime} />
            </div>
          </ValidatorForm>
        </Dialog>
    );
  }
}