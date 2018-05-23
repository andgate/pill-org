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

import SvgIcon from 'material-ui/SvgIcon';
import {blue500} from 'material-ui/styles/colors';


var moment = require('moment');

var exampleMeds = [ {name: "Xanax",    dose: "50", units: "mg", time: moment("10 am", "hh a").format()}
                  , {name: "Adderall", dose: "30", units: "mg", time: moment("10 am", "hh a").format()}
                  , {name: "Benedryl", dose: "25", units: "mg", time: moment("10:30 pm", "hh:mm a").format()}
                  ];

const acceptedUnits = ["mg", "g", "kg"];

const PillsIcon = (props) => (
  <SvgIcon {...props} viewBox={'0 0 84.112 84.112'}>
	  <path d="M68.449 48.757H41.99l-3.873 3.873h7.409v23.581H27.479c-5.495 0-10.11-3.783-11.412-8.878-.14.003-.28.01-.421.01-1.212 0-2.423-.118-3.617-.351 1.231 7.417 7.688 13.092 15.449 13.092h40.97c8.637 0 15.664-7.026 15.664-15.663s-7.026-15.664-15.663-15.664zM64.88 76.014H51.911c-.917 0-1.66-.743-1.66-1.66 0-.917.743-1.66 1.66-1.66H64.88c.917 0 1.66.743 1.66 1.66 0 .917-.743 1.66-1.66 1.66zm6.617 0h-.644c-.917 0-1.66-.743-1.66-1.66 0-.917.743-1.66 1.66-1.66h.644c.917 0 1.66.743 1.66 1.66 0 .917-.743 1.66-1.66 1.66zM55.692 8.6c-2.947-2.948-6.881-4.571-11.076-4.571S36.488 5.652 33.54 8.6L4.57 37.57C1.623 40.517 0 44.45 0 48.645c0 4.195 1.623 8.128 4.571 11.076 3.054 3.054 7.064 4.58 11.076 4.58 4.011 0 8.023-1.527 11.076-4.58l28.97-28.97c2.948-2.948 4.571-6.881 4.571-11.076S58.64 11.547 55.692 8.6zM23.984 56.982c-4.598 4.597-12.078 4.597-16.674 0-2.216-2.216-3.437-5.177-3.437-8.337s1.221-6.121 3.437-8.337l12.761-12.761 16.674 16.674-12.761 12.761zm26.307-26.586l-9.17 9.17c-.324.324-.749.486-1.174.486-.425 0-.85-.162-1.174-.486-.648-.648-.648-1.699 0-2.347l9.171-9.17c.648-.648 1.699-.648 2.347 0 .648.648.648 1.699 0 2.347zm4.679-4.679l-.455.455c-.324.324-.749.486-1.174.486-.425 0-.849-.162-1.174-.486-.648-.648-.648-1.699 0-2.347l.455-.455c.648-.648 1.699-.648 2.347 0 .649.648.649 1.699.001 2.347z"/>
  </SvgIcon>
);

const logoStyle = {

  largeIcon: {
    width: 60,
    height: 60,
  },

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
    
    if(!schedule.length)
      return (
        <Paper zDepth={2}>
        
          <Subheader>Upcoming</Subheader>
          <List>
            <ListItem>
              <center>No upcoming medications</center>
            </ListItem>
          </List>
        </Paper>
      )

    return (
      <Paper zDepth={2}>
        
        <Subheader>Upcoming</Subheader>
        <List>
            { schedule.map((medName, index) =>
              <div>
                <ListItem
                  onClick={(event) => this.handleTakeMed(index)}
                >
                  <ActionCheckCircle />{medName}
                  <PillsIcon />
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

//    this.scheduleMed(med);
    this.addToSchedule(med);
  }

  handleTakeMed(index)
  {
    this.setState((prevState) => ({
      schedule: prevState.schedule.filter((_, i) => i !== index)
    }));
  }

  componentDidMount() {
    //this.timerId = setInterval(this.tick, 1000);
    
    //this.state.meds.forEach((med) => this.scheduleMed(med));
    this.state.meds.forEach((med) => this.addToSchedule(med));
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

          <AppBar
            title="My Medications"
            iconElementLeft={
              <IconButton
                disabled={true}
              >
                <PillsIcon color={blue500} />
              </IconButton>
            }
          />

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

