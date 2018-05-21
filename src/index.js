import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Grid, Row, Col } from 'react-flexbox-grid';

import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import { List, ListItem } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import TimePicker from 'material-ui/TimePicker';
import TextField from 'material-ui/TextField';

var Multimap = require('multimap'); /* docs: https://github.com/villadora/multi-map */


class MedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addPillVisible: false,
      pillEdit: {name: "", dose: 0, times: []},
    };

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDose = this.onChangeDose.bind(this);
    this.onChangeTimes = this.onChangeTimes.bind(this);

    this.toggleAddPill = this.toggleAddPill.bind(this);
    this.openAddPill = this.openAddPill.bind(this);
    this.closeAddPill = this.closeAddPill.bind(this);
    this.saveAddPill = this.saveAddPill.bind(this);
  }


  onChangeName = (event) => {
    let pillEdit = this.state.pillEdit;
    pillEdit.name = event.target.value;
    this.setState({ pillEdit: pillEdit });
  }

  onChangeDose = (event) => {
    let pillEdit = this.state.pillEdit;
    pillEdit.dose = event.target.value;
    this.setState({ pillEdit: pillEdit });
  }

  onChangeTimes = (event, time) => {
    let pillEdit = this.state.pillEdit;
    pillEdit.times = [time];
    this.setState({ pillEdit: pillEdit });
  }

  toggleAddPill = () => {
    this.setState({addPillVisible: !this.state.addPillVisible});
  }

  openAddPill = () => {
    this.setState({addPillVisible: true});
  }

  closeAddPill = () => {
    this.setState({addPillVisible: false, pillEdit: {name: "", dose: 0, times: [0]},});
  }

  saveAddPill = (event) => {
    event.preventDefault();
    let pillEdit = this.state.pillEdit;
    this.props.onAddMed(pillEdit.name, pillEdit.dose, pillEdit.times);
    this.closeAddPill();
  }

  render() {
    const meds = this.props.meds;

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.closeAddPill}
      />,
      <FlatButton
        label="Add"
        primary={true}
        keyboardFocused={true}
        onClick={this.saveAddPill}
      />,
    ];

    return (
      <Paper>
        <h2>Medications</h2>
        <RaisedButton label='Add' onClick={this.openAddPill} />
        <Dialog
          title='Add Medication'
          actions={actions}
          modal={false}
          open={this.state.addPillVisible}
          onRequestClose={this.closeAddPill}
        >
          <TextField hintText='Name' value={this.state.pillEdit.name} onChange={this.onChangeName} />
          <TextField hintText='Dose' value={this.state.pillEdit.dose} onChange={this.onChangeDose} />
          <TimePicker hintText="12hr Format" value={this.state.pillEdit.times} onChange={this.onChangeTime} />
        </Dialog>

        {meds.map(med => (<div>{med.name + " " + med.dose + "mg " + med.times}</div>))}
      </Paper>
    );
  }
}

class MedSchedule extends React.Component {
  render() {
    let schedule = this.props.schedule;

    return (
      <Paper>
        <h2>Schedule</h2>
        <List>
          {schedule.forEachEntry((meds, time) => (<ListItem>{time + meds.forEach((med) => " " + med.name)}</ListItem>))}
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
    this.clearInterval(this.timerId);
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
        <Paper>
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
      schedule: new Multimap(),
      meds: [],
      nextDoseTime: null
    };

    this.handleAddMed = this.handleAddMed.bind(this);
  }

  handleAddMed(name, dose, times) { 
    let meds = this.state.meds
    let schedule = this.state.schedule;
    meds.push({name: name, dose: dose, times: times});
    
    schedule = new Multimap();
    
    meds.forEach((med) =>
      med.times.forEach((time) =>
        schedule.set(med.time, {name: med.name, dose: med.dose})
      )
    );
    
    this.setState({meds: meds, schedule: schedule});
  }

  render() {
    let meds = this.state.meds;
    let schedule = this.state.schedule;
    let nextDose = this.state.nextDose;

    return (
      <MuiThemeProvider>
        <Grid fluid>
          <Row>
            <AppBar title="Med Organizer" />
          </Row>
          <Row>
            <Col xs>
              <MedSchedule schedule={schedule} />
            </Col>

            <Col xs>
              <MedTimer endDate={new Date('December 1, 2019 12:00:00')} />
            </Col>

            <Col xs>
              <MedList meds={meds} onAddMed={this.handleAddMed}/>
            </Col>
          </Row>
        </Grid>
      </MuiThemeProvider>
    );
  }
}

// ========================================

ReactDOM.render(<MedOrg />, document.getElementById("root"));

