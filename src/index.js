import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import './index.css'

class MedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pills: [{name: 'Xanax', dose: 5, }, {name: 'Adderall', dose: 50, },{name: 'Zoloft', dose: 100, }],
    };
  }

  render() {
    const pills = this.state.pills;
    const listPills = pills.map((pill) =>
      <li key={pill.toString()}>
        {pill.name} {pill.dose}mg
      </li>
    );

    return (
      <div className="medList">
        <h1>Medications</h1>
          <button onClick={this.openModal}>add</button>
          <Modal
            >
            <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
            <button onClick={this.closeModal}>close</button>
          </Modal>
        <ul>{listPills}</ul>
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
      <div className="medTimer">
        {this.state.counter}
      </div>
    );
  }
}

class MedOrg extends React.Component {
  render() {

    return (
      <div className="medorg">
        <MedTimer />
        <MedList />
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<MedOrg />, document.getElementById("root"));

