import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'


class PillOrg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schedule:
        {
          times: [ '12:00PM'
                 , '3:00AM'
                 ],

          meds: [ 'Zrytec', 'Xanax', 'LSD'],

          medTimes: [[0,1], [1,2]],
        },
    };
  }

  render() {
    const meds = this.state.schedule.med;
    const medList = meds.map(function(med){
      medsAtTime = meds.filter(other => other.medTime === med.medTime);
      medNames = medsAtTime.map(m => m.medName);
      return (
        <div>
          <li> At {med.medTime} take {med.medNames} </li>
        </div>
      );
    });

    return (
      <div className="pillorg">
        <div className="pillorg-info">
          <ol>{medList}</ol>
        </div>
        <div className="app-timer">
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<PillOrg />, document.getElementById("root"));

