import React from 'react';
import MediaQuery from 'react-responsive';
import SwipeableViews from 'react-swipeable-views';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import { exampleMeds, PillsIcon } from 'constants.js';
import MedSchedule from 'components/MedSchedule.js';
import MedList from 'components/MedList.js';

var moment = require('moment');


const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});


class MedOrg extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      meds: exampleMeds,
      schedule: [],
      tabIndex: 0
    };

    console.log(exampleMeds);

    this.handleAddMed = this.handleAddMed.bind(this);
    this.handleTakeMed = this.handleTakeMed.bind(this);
    this.addToSchedule = this.addToSchedule.bind(this);
    //this.tick = this.tick.bind(this);
    this.handleChangeTab= this.handleChangeTab.bind(this);
    this.handleSwipeTab = this.handleSwipeTab.bind(this);
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

  handleChangeTab(event, value) {
    this.setState({ tabIndex: value });
  }

  handleSwipeTab(index) {
    this.setState({ tabIndex: index });
  };

  render() {
    let meds = this.state.meds;
    let schedule = this.state.schedule;
    let tabIndex = this.state.tabIndex;
    const { classes, theme } = this.props;

    return (
        <div className={classes.root}>

          <AppBar position="fixed">
            <Toolbar>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                <PillsIcon />
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                My Medications
              </Typography>
            </Toolbar>
            <MediaQuery maxDeviceWidth={1224}>
              <Tabs
                value={tabIndex}
                onChange={this.handleChangeTab}
                indicatorColor="primary"
                textColor="primary"
                fullWidth
              >
                <Tab label="Reminders" />
                <Tab label="Medications" />
              </Tabs>
            </MediaQuery>
          </AppBar>

          <MediaQuery minDeviceWidth={1224}>
            <Grid container spacing={16} style={{ paddingTop: 64 }}>
              <Grid item xs>
                <MedSchedule schedule={schedule} onTakeMed={this.handleTakeMed} />
              </Grid>

              <Grid item xs>
                <MedList meds={meds} onAddMed={this.handleAddMed} />
              </Grid>
            </Grid>
          </MediaQuery>

          <MediaQuery maxDeviceWidth={1224}>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={tabIndex}
              onChangeIndex={this.handleSwipeTab}
            >
              <MedSchedule schedule={schedule} onTakeMed={this.handleTakeMed} />
              <MedList meds={meds} onAddMed={this.handleAddMed} />
            </SwipeableViews>
          </MediaQuery>

        </div>
    );
  }
}


MedOrg.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(MedOrg);