import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'


class PillOrg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schedule:
        {
          meds: [ {medName: 'Zrytec', medTime: '12:00PM'},
                  {medName: 'Xanax', medTime: '12:00PM'},
                  {medName: 'LSD', medTime: '3:00AM'}
                ],
        },
    };
  }

  render() {
    const meds = this.state.schedule.meds;
    const medList = meds.map(function(med){
      return (
        <div>
          <li> {med.medName} at {med.medTime} </li>
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

