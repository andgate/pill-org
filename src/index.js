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
import Subheader from 'material-ui/Subheader';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import TimePicker from 'material-ui/TimePicker';
import TextField from 'material-ui/TextField';

import IconButton from 'material-ui/IconButton';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle';
import ImageEdit from 'material-ui/svg-icons/image/edit';

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

// For responsive-ui
import MediaQuery from 'react-responsive';


// For validating react textfields
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';


var moment = require('moment');


var exampleMeds = [ {name: "Xanax",    dose: "50", units: "mg", time: moment("10 am", "hh a").format()}
                  , {name: "Adderall", dose: "30", units: "mg", time: moment("10 am", "hh a").format()}
                  , {name: "Benedryl", dose: "25", units: "mg", time: moment("10:30 pm", "hh:mm a").format()}
                  ];

var acceptedUnits = ["mg", "g", "kg"];


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
    med.time = moment(time);
    this.setState({ med: med });
  }


  handleOpenDialog = () => {
    this.setState({selectedUnit: 2, med: {name: "", dose: null, units: "mg", time: null},});
    this.props.onOpen();
  }

  handleCancelDialog = () => {
    this.props.onCancel();
  }

  handleSubmitDialog = (event) => {
    event.preventDefault();
    // Deep copy our med
    let med = JSON.parse(JSON.stringify(this.state.med));

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
            <TimePicker floatingLabelText="Time" hintText="Time" value={new Date(med.time)} onChange={this.handleChangeTime} />
            </div>
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

    return (
      <Paper zDepth={2}>
        <Subheader>
          Medications
          <IconButton onClick={this.handleOpenAddMed}><ContentAddCircle /></IconButton>
        </Subheader>
        <AddMedDialog
          visible={addMedVisible}
          onOpen={this.handleOpenAddMed} 
          onCancel={this.handleCancelAddMed}
          onSubmit={this.handleSubmitAddMed}
        />

        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Dose</TableHeaderColumn>
              <TableHeaderColumn>Time</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            { meds.map( med => (
                <TableRow>
                  <TableRowColumn>
                    {med.name}
                  </TableRowColumn>
                  <TableRowColumn>
                    {med.dose + med.units}
                  </TableRowColumn>
                  <TableRowColumn>
                    {moment(med.time).format("h:mm a")}
                  </TableRowColumn>
                  <Divider />
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

class MedSchedule extends React.Component {
  constructor(props) {
    super(props);

    this.handleTakeMed = this.handleTakeMed.bind(this);
  }

  handleTakeMed(index)
  {
    this.props.onTakeMed(index);
  }

  render() {
    let schedule = this.props.schedule;

    return (
      <Paper zDepth={2}>
        <Subheader>Reminders</Subheader>
        <List>
            { schedule.map((medName, index) =>
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


/*
class MedTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currTime: moment(),
    };

    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.timerIds.push(setInterval(this.tick, 1000));
  }

  componentWillUnmount() {
    this.timerIds.forEach(clearInterval);
  }

  tick() {
    this.setState({currTime: moment()});
  }

  render() {
    let endTime = this.props.endTime;
    let currTime = this.state.currTime;

    if(endTime < currTime)
    {
      return (
        <Paper zDepth={2}>
          <Subheader>Timer</Subheader>
          <div>"Time to take next dose!"</div>
        </Paper>
      );
    }
    else
    { 
      return (
        <Paper zDepth={2}>
          <Subheader>Timer</Subheader>
          <div>{currTime.to(endTime)}</div>
        </Paper>
      );
    }
  }
}*/

class MedOrg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meds: exampleMeds,
      schedule: []
    };

    this.handleAddMed = this.handleAddMed.bind(this);
    this.handleTakeMed = this.handleTakeMed.bind(this);
    this.addToSchedule = this.addToSchedule.bind(this);
    //this.tick = this.tick.bind(this);
  }

  handleAddMed(med) {
    this.setState((prevState) => ({
        meds: prevState.meds.concat(med)
      }));

    this.scheduleMed(med);
  }

  handleTakeMed(index)
  {
    this.setState((prevState) => ({
      schedule: prevState.schedule.filter((_, i) => i !== index)
    }));
  }

  componentDidMount() {
    //this.timerId = setInterval(this.tick, 1000);
    
    this.state.meds.forEach((med) => this.scheduleMed(med));
  }

  componentWillUnmount() {
    //clearInterval(this.timerId);
  }

  scheduleMed(med) {
    let now = moment();
    let time = med.time;

    let dur = moment.duration(moment(time).diff(now));

    dur.days = 0;
    dur.weeks = 0;
    dur.months = 0;
    dur.years = 0;

    let msTill = dur.asMilliseconds();

    console.log("Med scheduled in" + moment(dur).format())

    setTimeout( (() => this.addToSchedule(med)) , msTill);
  }

  addToSchedule(med) {
    this.setState((prevState) => ({
      schedule: prevState.schedule.concat(med.name)
    }));
  }

  /*
  tick() {
    // Is it time to take a med?
    // Add it to the schedule!
    let meds = this.state.meds;
    let taken = this.state.taken;

    let currTime = moment();
    let mins = moment(currTime).minutes();
    let hrs = moment(currTime).hours();

    // it is time to take a med when the current time exceeds a given time
    let newSchedule = meds.filter((med) => {
         (moment(med.time).minutes() === mins) 
      && (moment(med.time).hours() === hrs) 
    });

    if(!newSchedule.length) {
      this.setState((prevState) => ({
        schedule: prevState.schedule.concat(newSchedule)
      }));
    }
  } */

  render() {
    let meds = this.state.meds;
    let schedule = this.state.schedule;

    return (
      <MuiThemeProvider>
        <div>

          <AppBar title="My Medications" />

          <MediaQuery minDeviceWidth={1224}>
            <Grid fluid>
              <Row>
                <Col xs>
                  <MedSchedule schedule={schedule} onTakeMed={this.handleTakeMed} />
                </Col>

                <Col xs>
                  <MedList meds={meds} onAddMed={this.handleAddMed}/>
                </Col>
              </Row>
            </Grid>
          </MediaQuery>

          <MediaQuery maxDeviceWidth={1224}>
            <Tabs>
                
                <Tab label="Reminders">
                  <MedSchedule schedule={schedule} onTakeMed={this.handleTakeMed} />
                </Tab>
                
                <Tab label="Medications">
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

