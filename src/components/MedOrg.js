import React from 'react';
import MediaQuery from 'react-responsive';

import { Grid, Row, Col } from 'react-flexbox-grid';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AppBar from 'material-ui/AppBar';
import { Tabs, Tab } from 'material-ui/Tabs';
import IconButton from 'material-ui/IconButton';

import { exampleMeds, PillsIcon } from 'constants.js';
import { MedSchedule } from 'components/MedSchedule.js';
import { MedList } from 'components/MedList.js';

var moment = require('moment');


export class MedOrg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meds: exampleMeds,
      schedule: []
    };

    console.log(exampleMeds);

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

  handleTakeMed(index) {
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

    setTimeout((() => this.addToSchedule(med)), msTill);
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
                <PillsIcon />
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
                  <MedList meds={meds} onAddMed={this.handleAddMed} />
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
                <MedList meds={meds} onAddMed={this.handleAddMed} />
              </Tab>

            </Tabs>
          </MediaQuery>

        </div>
      </MuiThemeProvider>
    );
  }
}