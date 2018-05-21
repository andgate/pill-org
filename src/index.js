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
      pillEdit: {name: "", dose: 0, times: [0]},
      meds: []
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
    pillEdit.name = event.value;
    this.setState({ pillEdit: pillEdit });
  }

  onChangeDose = (event) => {
    let pillEdit = this.state.pillEdit;
    pillEdit.dose = event.value;
    this.setState({ pillEdit: pillEdit });
  }

  onChangeTime = (event, time) => {
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
    this.setState({addPillVisible: false});
  }

  saveAddPill = (event) => {
    event.preventDefault();
    let pillEdit = this.state.pillEdit;
    this.setState({meds: [...this.state.meds, pillEdit], addPillVisible: false});

    this.props.onMedsChange(this.state.meds);
  }

  render() {
    const meds = this.state.meds;

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
          <TimePicker hintText="12hr Format" value={this.state.pillEdit.time} onChange={this.onChangeTime} />
        </Dialog>

        {meds.map(med => (<div className="text item">{med.name + " " + med.dose + "mg " + med.time}</div>))}
      </Paper>
    );
  }
}

class MedSchedule extends React.Component {
  render() {
    const schedule = this.props.schedule;

    return (
      <Paper>
        <h2>Schedule</h2>
        <List>
        {schedule.forEachEntry((meds, time) => (<ListItem>{time + " " + meds}</ListItem>))}
        </List>
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

  render() {
    return (
      <Paper>
        <h2>Timer</h2>
        <div>{this.state.counter}</div>
      </Paper>
    );
  }
}

class MedOrg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schedule: new Multimap(),
      meds: [],
    };

    this.onMedsChange = this.onMedsChange.bind(this);
  }

  onMedsChange(newMeds) {
    //optionally, ensure that typedFunction is being called properly  -- here's a start:
    if (!(newMeds instanceof Array)) throw Error('invalid argument: newMeds must be an array');

    let schedule = this.state.schedule;
    schedule.clear(); 
    newMeds.forEach((med) =>
      med.times.forEach((time) =>
        schedule.set(med.time, {name: med.name, dose: med.dose})
      )
    );
    this.setState({schedule: schedule});
  }

  render() {
    let schedule = this.state.schedule;
    let meds = this.state.meds;

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
              <MedTimer schedule={schedule} />
            </Col>

            <Col xs>
              <MedList meds={meds} onMedsChange={this.onMedsChange}/>
            </Col>
          </Row>
        </Grid>
      </MuiThemeProvider>
    );
  }
}

// ========================================

ReactDOM.render(<MedOrg />, document.getElementById("root"));

