import React from 'react';
import ReactDOM from 'react-dom';
import {List, ListItem} from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Drawer from 'material-ui/Drawer';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import TimePicker from 'material-ui/TimePicker';
import classNames from 'classnames';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanelActions,
  } from 'material-ui/ExpansionPanel';


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
      pillEdit: {name: "", dose: 0, time: 0},
      pills: [{name: 'Xanax', dose: 5, time:'9:00 am'}, {name: 'Adderall', dose: 50, time:'9:00 am' },{name: 'Zoloft', dose: 100, time:'12:00 pm' }],
      right: false,
    };


    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDose = this.onChangeDose.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);

    this.toggleDrawer = this.toggleDrawer.bind(this);

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

  onChangeTime = (time) => {
    let pillEdit = this.state.pillEdit;
    pillEdit.time = time;
    this.setState({ pillEdit: pillEdit });
  }


  onSubmit = (event) => {
    event.preventDefault();
    this.setState({ pills: [...this.state.pills, this.state.pillEdit] });
    this.toggleDrawer(false);
  }
 
  toggleDrawer = (open) => () => {
    this.setState({
      right: open,
    });
  }
 

  render() {
    const pills = this.state.pills;

    return (
      <div>
        <Paper className="medList" elevation={4}>
          <h2>Medications</h2>
          <RaisedButton label="Add" onClick={this.toggleDrawer(true)} />

          <Drawer anchor="right" open={this.state.right} onClose={this.toggleDrawer(false)}>
            <div
              tabIndex={0}
              role="button"
              >
              <h2 ref={subtitle => this.subtitle = subtitle}>Medication Information</h2>
              <List>
                <ListItem>
                  <TextField value={this.state.pillEdit.name} onChange={this.onChangeName} />
                </ListItem>
                <ListItem>
                  <TextField value={this.state.pillEdit.dose} onChange={this.onChangeDose} />
                </ListItem>
                <ListItem>
                  <TimePicker value={this.state.pillEdit.dose} onChange={this.onChangeTime} />
                </ListItem>
                <ListItem>
                  <RaisedButton label="Close" onClick={this.toggleDrawer(false)} />
                </ListItem>
                <ListItem>
                  <RaisedButton label="Add" onClick={this.onSubmit} />
                </ListItem>
              </List>
            </div>
          </Drawer>

          <List>
            {pills.map( (pill) => { return <ListItem primaryText={pill.name + " " + pill.dose + "mg " + pill.time}/>; } )}
          </List>
        </Paper>
      </div>
    );
  }
}

class MedSchedule extends React.Component {
  render() {
    return (
      <div className="medSchedule">
        <Paper>
        <h2>Schedule</h2>
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
      <div>
        <Paper className="medTimer" elevation={4}>
        {this.state.counter}
        </Paper>
      </div>
    );
  }
}

class MedOrg extends React.Component {
  render() {

    return (
      <MuiThemeProvider>
      <div className="medorg-container">
        <div className="medorg-header">
          <h1>Medication Organizer</h1>
        </div>
        <div className="medorg-body">
          <MedSchedule />
          <MedTimer />
          <MedList />
        </div>
      </div>
      </MuiThemeProvider>
    );
  }
}

// ========================================

ReactDOM.render(<MedOrg />, document.getElementById("root"));

