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
import TimePicker from 'material-ui/TimePicker';
import TextField from 'material-ui/TextField';

import IconButton from 'material-ui/IconButton';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ImageEdit from 'material-ui/svg-icons/image/edit';

// For responsive-ui
import MediaQuery from 'react-responsive';

var Multimap = require('multimap'); /* docs: https://github.com/villadora/multi-map */



var exampleMeds = [ {name: "Xanax",    dose: "50", units: "mg", time: new Date()}
                  , {name: "Adderall", dose: "30", units: "mg", time: new Date()}
                  , {name: "Benedryl", dose: "25", units: "mg", time: new Date()}
                  ];


class MedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addPillVisible: false,
      pillEdit: {name: "", dose: 0, time: new Date()},
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
    pillEdit.name = event.target.value;
    this.setState({ pillEdit: pillEdit });
  }

  onChangeDose = (event) => {
    let pillEdit = this.state.pillEdit;
    pillEdit.dose = event.target.value;
    this.setState({ pillEdit: pillEdit });
  }

  onChangeTime = (event, time) => {
    let pillEdit = this.state.pillEdit;
    pillEdit.time = time;
    this.setState({ pillEdit: pillEdit });
  }

  toggleAddPill = () => {
    this.setState({addPillVisible: !this.state.addPillVisible});
  }

  openAddPill = () => {
    this.setState({addPillVisible: true});
  }

  closeAddPill = () => {
    this.setState({addPillVisible: false, pillEdit: {name: "", dose: 0, times: null},});
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
        <h2>
          Medications
          <IconButton onClick={this.openAddPill}><ContentAddCircle /></IconButton>
        </h2>
        <Dialog
          title='Add Medication'
          actions={actions}
          modal={false}
          open={this.state.addPillVisible}
          onRequestClose={this.closeAddPill}
        >
          <div>
            <TextField hintText='Name' value={this.state.pillEdit.name} onChange={this.onChangeName} />
          </div>
          
          <div>
            <TextField hintText='Dose' value={this.state.pillEdit.dose} onChange={this.onChangeDose} />
          </div>
          
          <div>
            <TimePicker hintText="12hr Format" value={this.state.pillEdit.times} onChange={this.onChangeTime} />
          </div>
        </Dialog>

        <List>
          { meds.map( med => (
            <ListItem>
              <span>
                <div>
                {med.name + " " + med.dose + "mg " + med.times}
                <IconButton><ActionDelete /></IconButton>
                <IconButton><ImageEdit /></IconButton>
                </div>
              </span>
            </ListItem>
          ))}

        </List>
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
      <Paper>
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
      meds: exampleMeds,
      nextDoseTime: null,
    };

    this.handleAddMed = this.handleAddMed.bind(this);
  }

  handleAddMed(name, dose, time) {
    this.setState((prevState) => ({
        meds: prevState.meds.concat({name: name, dose: dose, time: time})
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

