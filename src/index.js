import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TimePicker from 'material-ui/TimePicker';
import {List, ListItem} from 'material-ui/List';


const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});


class MedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openAddPill: false,
      pillEdit: {name: "", dose: 0, time: 0},
      pills: [{name: 'Xanax', dose: 5, time:'9:00 am'}, {name: 'Adderall', dose: 50, time:'9:00 am' },{name: 'Zoloft', dose: 100, time:'12:00 pm' }],
    };


    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDose = this.onChangeDose.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);

    this.onChangeTime = this.onChangeTime.bind(this);
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

  onChangeTime = (foo, time) => {
    let pillEdit = this.state.pillEdit;
    pillEdit.time = time;
    this.setState({ pillEdit: pillEdit });
  }

  onOpenAddPill = () => {
    this.setState({openAddPill: true});
  };

  onCloseAddPill = () => {
    this.setState({openAddPill: false});
  };


  onSubmitAddPill = (event) => {
    event.preventDefault();
    this.setState({ pills: [...this.state.pills, this.state.pillEdit] });
    this.onCloseAddPill();
  }
 

  render() {
    const pills = this.state.pills;

    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        onClick={this.onSubmitAddPill}
      />,
      <FlatButton
        label="Close"
        primary={true}
        keyboardFocused={true}
        onClick={this.onCloseAddPill}
      />,
    ];

    return (
      <div>
        <Paper className="medList" elevation={4}>
          <h2>Medications</h2>
          <RaisedButton label="Add" onClick={this.onOpenAddPill} />
          <Dialog
            title="Add Medication"
            actions={actions}
            modal={false}
            open={this.state.openAddPill}
            onRequestClose={this.onCloseAddPill}
          >
            <TextField value={this.state.pillEdit.name} onChange={this.onChangeName} />
            <TextField value={this.state.pillEdit.dose} onChange={this.onChangeDose} />
            <TimePicker onChange={this.onChangeTime} format='ampm' />
          </Dialog>

          <List>
            {pills.map( (pill) => { return <ListItem primaryText={pill.name + " " + pill.dose + "mg " + pill.time}/>; } )}
          </List>
        </Paper>
      </div>
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
      <div>
        <Paper className="medSchedule">
          <h2>Schedule</h2>
          <List>
              {schedule.map( (event) => { return <ListItem primaryText={event.time + " " + event.meds}/>; } )}
          </List>
        </Paper>
      </div>
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
    this.nextRound = this.nextRound.bind(this);
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
      <div>
        <MedSchedule onChange={this.onScheduleChange} />
        <Paper className="medTimer" elevation={4}>
          <TextField>{this.state.nextRound.time}</TextField>
        </Paper>
      </div>
    );
  }
}

class MedOrg extends React.Component {
  render() {

    return (
      <MuiThemeProvider /*muiTheme={getMuiTheme(darkBaseTheme)}*/ >
      <div className="medorg-container">
        <AppBar title="Medication Organizer" />
        <MedSchedule />
        <MedList />
      </div>
      </MuiThemeProvider>
    );
  }
}

// ========================================

ReactDOM.render(<MedOrg />, document.getElementById("root"));

