import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Grid, Row, Col } from 'react-flexbox-grid';

import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import {List, ListItem} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import TimePicker from 'material-ui/TimePicker';
import TextField from 'material-ui/TextField';

//import Dialog from 'react-toolbox/lib/dialog/Dialog';
//import Input from 'react-toolbox/lib/input/Input';
//import Layout from 'react-toolbox/lib/layout/Layout';
//import Panel from 'react-toolbox/lib/layout/Panel';
//import Card from 'react-toolbox/lib/card/Card';
//import TimePicker from 'react-toolbox/lib/time_picker/TimePicker';
//import { Layout, NavDrawer, Panel, Sidebar } from 'react-toolbox';
//import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';


class MedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addPillVisible: false,
      pillEdit: {name: "", dose: 0, time: 0},
      pills: [{name: 'Xanax', dose: 5, time:'9:00 am'}, {name: 'Adderall', dose: 50, time:'9:00 am' },{name: 'Zoloft', dose: 100, time:'12:00 pm' }],
    };


    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDose = this.onChangeDose.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);

    this.toggleAddPill = this.toggleAddPill.bind(this);
    this.openAddPill = this.openAddPill.bind(this);
    this.closeAddPill = this.closeAddPill.bind(this);
    this.saveAddPill = this.saveAddPill.bind(this);
  }


  onChangeName = (event) => {
    let pillEdit = this.state.pillEdit;
    pillEdit.name = event;
    this.setState({ pillEdit: pillEdit });
  }

  onChangeDose = (event) => {
    let pillEdit = this.state.pillEdit;
    pillEdit.dose = event;
    this.setState({ pillEdit: pillEdit });
  }

  onChangeTime = (time) => {
    let pillEdit = this.state.pillEdit;
    pillEdit.time = time;
    this.setState({ pillEdit: pillEdit });
  }

  toggleAddPill = () => {
    this.setState({addPillVisible: true});
    this.setState({addPillVisible: !this.state.addPillVisible});
  };

  openAddPill = () => {
    this.setState({addPillVisible: true});
  };

  closeAddPill = () => {
    this.setState({addPillVisible: false});
  };

  saveAddPill = (event) => {
    event.preventDefault();
    this.setState({ pills: [...this.state.pills, this.state.pillEdit] });
    this.onCloseAddPill();
  }
 

  render() {
    const pills = this.state.pills;

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.closeAddPill}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.saveAddPill}
      />,
    ];

    return (
      <Paper>
        <div className="clearfix">
          <span style={{ "lineHeight": "36px" }}>Medications</span>
          <span style={{ "float": "right" }}>
            <RaisedButton label='Add' onClick={this.openAddPill} />
          </span>
        </div>
        <Dialog
          title='Add Medication'
          actions={actions}
          modal={false}
          open={this.state.addPillVisible}
          onRequestClose={this.handleClose}
        >
          <TextField hintText='Name' value={this.state.pillEdit.name} onChange={this.onChangeName} />
          <TextField hintText='Dose' value={this.state.pillEdit.dose} onChange={this.onChangeDose} />
          <TimePicker hintText="12hr Format" value={this.state.pillEdit.time} onChange={this.onChangeTime} />
          <RaisedButton label='Add' onClick={this.openAddPill} />
          <RaisedButton label='Add' onClick={this.openAddPill} />
        </Dialog>

        {pills.map(pill => (<div className="text item">{pill.name + " " + pill.dose + "mg " + pill.time}</div>))}
      </Paper>
    );
  }
}

class MedSchedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schedule: [{time:"9:00 AM", meds: ["Xanax, Adderall"]}, {time:"12:00 PM", meds: ["Zoloft"]}, ],
    };
  }

  render() {
    const schedule = this.state.schedule;

    return (
      <Paper>
        <div className="clearfix">
              <span style={{ "lineHeight": "36px" }}>Schedule</span>
        </div>
        {schedule.map(event => (<div className="text item">{event.time + " " + event.meds}</div>))}
      </Paper>
    );
  }
}


class MedTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      counter: 0,
      nextRound: {time: 0, meds: []},
    };

    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    let timer = setInterval(this.tick, 1000);
    this.setState({timer: timer});
  }

  componentWillUnmount() {
    this.clearInterval(this.state.timer);
  }

  tick() {
    this.setState({counter: this.state.counter + 1});
  }

  onScheduleChange(event) {
    this.nextRound = event.state.schedule[0];
  }

  render() {
    return (
      <Paper>
        <div className="clearfix">
            <span style={{ "lineHeight": "36px" }}>Timer</span>
        </div>
        <div className="text item">{this.state.counter}</div>
      </Paper>
    );
  }
}

class MedOrg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schedule: null,
    };
  }

  onScheduleChange(event) {
    this.schedule = event.state.schedule;
  }

  render() {

    return (
      <MuiThemeProvider>
        <Grid fluid>
          <Row>
            <AppBar>Med Organizer</AppBar>
          </Row>
          <Row>
            <Col xs>
              <MedSchedule onChange={this.onScheduleChange} />
            </Col>

            <Col xs>
              <MedTimer schedule={this.schedule} />
            </Col>

            <Col xs>
              <MedList />
            </Col>
          </Row>
        </Grid>
      </MuiThemeProvider>
    );
  }
}

// ========================================

ReactDOM.render(<MedOrg />, document.getElementById("root"));

