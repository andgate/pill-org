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
  <SvgIcon {...props}>
	  <path d="M251.4 778.8c47.2 0 92.5-13.5 131.3-38.7-1.2-11.6-1.9-23.3-1.9-35 0-2.7 0-5.3.1-8 .4-18.8 2.5-37.2 6.1-55.3 4.2-20.9 10.6-41.4 19-61.3 16.1-38.1 39.1-72.3 68.6-101.7 1.4-1.4 3-2.9 4.4-4.3L276.5 272.2l145.1-145.1c32.1-32.1 74.7-49.7 120.1-49.7 45.4 0 88 17.6 120.1 49.7 32.1 32.1 49.7 74.7 49.7 120.1s-17.6 88-49.7 120.1l-24.2 24.2c18.5-3.7 37.4-5.7 56.6-6.1 2.3 0 4.5-.1 6.8-.1 12.6 0 25.2.7 37.6 2.2 29.1-40.7 44.8-89.3 44.8-140.2 0-64.6-25.1-125.1-70.7-170.8C667.1 30.8 606.4 5.6 541.9 5.6c-64.6 0-125.1 25.1-170.8 70.7L80.7 366.6C35.1 412.2 10 472.8 10 537.4c0 64.6 25.1 125.1 70.7 170.8 45.6 45.5 106.3 70.6 170.7 70.6z"/><path d="M714.1 416.3c-4.4-.2-8.8-.3-13.3-.3-13.5 0-26.7.9-39.8 2.8-24.2 3.3-47.3 9.6-69.3 18.5-34 13.8-64.9 34-91 59.1-29.1 27.9-52.4 61.8-67.8 99.7-8.9 21.9-15.3 45.1-18.5 69.3-1.7 13-2.8 26.2-2.8 39.8 0 4.3.1 8.5.3 12.8 2.8 63.8 26.2 122.3 63.8 168.8l406.6-406.6c-46.3-37.6-104.6-61.1-168.2-63.9zM925.8 523.6L519.2 930.2c49.6 40.1 112.8 64.2 181.6 64.2C860.6 994.4 990 865 990 705.2c0-68.8-24.1-132-64.2-181.6z"/>
  </SvgIcon>
);


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
            iconElementLeft={<IconButton><PillsIcon color={blue500} /></IconButton>}
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

