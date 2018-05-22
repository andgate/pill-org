import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Grid, Row, Col } from 'react-flexbox-grid';

import AppBar from 'material-ui/AppBar';
import {Tabs, Tab} from 'material-ui/Tabs';
import Dialog from 'material-ui/Dialog';
import { List, ListItem } from 'material-ui/List';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import TimePicker from 'material-ui/TimePicker';
import TextField from 'material-ui/TextField';

import IconButton from 'material-ui/IconButton';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ImageEdit from 'material-ui/svg-icons/image/edit';

// For responsive-ui
import MediaQuery from 'react-responsive';

// For validating react textfields
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';


var exampleMeds = [ {name: "Xanax",    dose: "50", units: "mg", time: new Date()}
                  , {name: "Adderall", dose: "30", units: "mg", time: new Date()}
                  , {name: "Benedryl", dose: "25", units: "mg", time: new Date()}
                  ];

var acceptedUnits = ["mg", "g", "kg"];


class AddMedDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUnit: 1,
      med: {name: "", dose: 0, units: "mg", time: null},
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
    if(event.target.value.isInteger())
    {
      let med = this.state.med;
      med.dose = event.target.value;
      this.setState({ med: med, doseErrorText: '' });
    }
    else
    {
      this.setState({ doseErrorText: 'must be a positive whole number' });
    }
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
    this.setState({selectedUnit: 1, med: {name: "", dose: 0, units: "mg", time: null},});
    this.props.onOpen();
  }

  handleCancelDialog = () => {
    this.props.onCancel();
  }

  handleSubmitDialog = (event) => {
    event.preventDefault();
    let med = this.state.med;

    this.props.onCancel();
    this.props.onSubmit(med);
  }

  render() {
    const visible = this.props.visible;

    const med = this.state.med;
    const selectedUnit = this.state.selectedUnit;
    let submitDisabled = med.name === '';

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleCancelDialog}
      />,
      <RaisedButton
        label="Add"
        primary={true}
        disabled={submitDisabled}
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
            <TextValidator
              floatingLabelText="Name"
              hintText='Name'
              onChange={this.handleChangeName}
              name="Name"
              value={this.state.med.name}
              validators={['required']}
              errorMessages={['this field is required']}
            />
            
            <TextField floatingLabelText="Dose" hintText='Dose' value={this.state.med.dose} onChange={this.handleChangeDose} />
            <SelectField
              floatingLabelText="units"
              value={selectedUnit}
              onChange={this.handleChangeUnits}
            >
              <MenuItem value={1} primaryText="mg" />
              <MenuItem value={2} primaryText="g" />
              <MenuItem value={3} primaryText="kg" />
            </SelectField>
            
            <TimePicker floatingLabelText="Time" hintText="Time" value={this.state.med.time} onChange={this.handleChangeTime} />
          </ValidatorForm>
        </Dialog>
    );
  }
}

class MedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addMedVisible: false,   
    };
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

    return (
      <Paper zDepth={2}>
        <h2>
          Medications
          <IconButton onClick={this.handleOpenAddMed}><ContentAddCircle /></IconButton>
        </h2>
        <AddMedDialog
          visible={addMedVisible}
          onOpen={this.handleOpenAddMed} 
          onCancel={this.handleCancelAddMed}
          onSubmit={this.handleSubmitAddMed}
        />

        <Grid>
          { meds.map( med => (
              <Row>
                <Col xs={12} sm={6} md={2} lg={1}>
                  {med.name + " " + med.dose + med.units + " " + med.time}
                </Col>
                <Col xs>
                  <IconButton><ActionDelete /></IconButton>
                </Col>
                <Col xs>
                  <IconButton><ImageEdit /></IconButton>
                </Col>
                <Divider />
              </Row>
          ))}
        </Grid>
      </Paper>
    );
  }
}

class MedSchedule extends React.Component {
  /*constructor(props) {
    super(props);
  }*/

  render() {
    let meds = this.props.meds;

    return (
      <Paper zDepth={2}>
        <h2>Schedule</h2>
        <List>
          {meds.map((med) => <ListItem>{med.time + " " + med.name}</ListItem>)}
        </List>
      </Paper>
    );
  }
}


class MedTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currTime: new Date(),
    };

    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.timerId = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  tick() {
    this.setState({currTime: new Date()});
  }

  render() {
    let endTime = this.props.endDate.getTime();
    var currTime = new Date().getTime();
    
    let timeRemaining = endTime - currTime;
    
    if(timeRemaining < 0)
    {
      return (
        <Paper>
          <h2>Timer</h2>
          <div>"Time to take next dose!"</div>
        </Paper>
      );
    }
    else
    {
      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      var hrs = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var mins = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      var secs = Math.floor((timeRemaining % (1000 * 60)) / 1000);
      
      return (
        <Paper zDepth={2}>
          <h2>Timer</h2>
          <div>{days + " days, " + hrs + " hours, " + mins + " min, " + secs + " seconds"}</div>
        </Paper>
      );
    }
  }
}

class MedOrg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meds: exampleMeds,
    };

    this.handleAddMed = this.handleAddMed.bind(this);
  }

  handleAddMed(med) {
    this.setState((prevState) => ({
        meds: prevState.meds.concat(med)
      }));
  }

  render() {
    let meds = this.state.meds;

    return (
      <MuiThemeProvider>
        <div>

          <MediaQuery minDeviceWidth={1224}>
            <Grid fluid>
              <Row>
                <AppBar title="Med Organizer" />
              </Row>
              <Row>
                <Col xs>
                  <MedSchedule meds={meds} />
                </Col>

                <Col xs>
                  <MedTimer meds={meds} endDate={new Date('December 1, 2019 12:00:00')} />
                </Col>

                <Col xs>
                  <MedList meds={meds} onAddMed={this.handleAddMed}/>
                </Col>
              </Row>
            </Grid>
          </MediaQuery>

          <MediaQuery maxDeviceWidth={1224}>
              <Tabs>
                
                <Tab label="Schedule">
                  <MedSchedule meds={meds} />
                </Tab>
                
                <Tab label="Timer">
                  <MedTimer meds={meds} endDate={new Date('December 1, 2019 12:00:00')} />
                </Tab>
                
                <Tab label="Meds">
                  <MedList meds={meds} onAddMed={this.handleAddMed}/>
                </Tab>
              
              </Tabs>
          </MediaQuery>
        
        </div>
      </MuiThemeProvider>
    );
  }
}

// ========================================

ReactDOM.render(<MedOrg />, document.getElementById("root"));

