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


var moment = require('moment');


var exampleMeds = [ {name: "Xanax",    dose: "50", units: "mg", time: moment().format()}
                  , {name: "Adderall", dose: "30", units: "mg", time: moment().format()}
                  , {name: "Benedryl", dose: "25", units: "mg", time: moment().format()}
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
    this.setState({selectedUnit: 1, med: {name: "", dose: 0, units: "mg", time: null},});
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
            <TextValidator
              floatingLabelText="Name"
              hintText='Name'
              onChange={this.handleChangeName}
              name="Name"
              value={med.name}
              validators={['required']}
              errorMessages={['this field is required']}
            />
            
            <TextField floatingLabelText="Dose" hintText='Dose' value={med.dose} onChange={this.handleChangeDose} />
            <SelectField
              floatingLabelText="units"
              value={selectedUnit}
              onChange={this.handleChangeUnits}
            >
              <MenuItem value={1} primaryText="mg" />
              <MenuItem value={2} primaryText="g" />
              <MenuItem value={3} primaryText="kg" />
            </SelectField>
            
            <TimePicker floatingLabelText="Time" hintText="Time" value={med.time} onChange={this.handleChangeTime} />
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
                    {moment(med.time).format("h:mm:ss a")}
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
  /*constructor(props) {
    super(props);
  }*/

  render() {
    let meds = this.props.meds;

    return (
      <Paper zDepth={2}>
        <Subheader>Schedule</Subheader>
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Time</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            { meds.map((med) =>
                <TableRow>
                  <TableRowColumn>{med.name}</TableRowColumn>
                  <TableRowColumn>
                    {moment(med.time).format("h:mm:ss a")}
                  </TableRowColumn>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}


class MedTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currTime: moment(),
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
                <Col>
                  <MedSchedule meds={meds} />
                </Col>

                <Col>
                  <MedTimer meds={meds} endTime={moment('December 1, 2019 12:00:00')} />
                </Col>

                <Col>
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
                  <MedTimer meds={meds} endTime={moment('December 1, 2019 12:00:00')} />
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

