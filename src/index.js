import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'



class PillList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pills: [{name: 'Xanax', dose: 5, }],
    };
  }


  const Med = ({med, remove}) => {
    return (<li onClick(remove(med.name))>{med.name} {med.dose}</li>);
  }

  render() {
    const pills = this.state.pills;
    const listPills = pills.map((pill) =>
      <li key={pill.toString()}>
        {pill.name} {pill.dose}
      </li>
    );

    return (
      <div className="Pills">
        <h1>Pills</h1>
        <ul>{listPills}</ul>
      </div>
    );
  }
}


class PillTimer extends React.Component {
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
      <div className="time">
        {this.state.counter}
      </div>
    );
  }
}

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

    return (
      <div className="pillorg">
        <PillTimer />
        <input ref={node => { input = node }} />
        <button onClick={() => { addTodo(input.value);  input.value = ''; }}>+</button>
        <div className="pillList">
          <PillList />
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<PillOrg />, document.getElementById("root"));

