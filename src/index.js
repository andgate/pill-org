import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'


class Timer extends React.Component {
  constructor(props) {
      super(props);
      this.delay = delay;
      this.state = { tick: 0, timestamp: Date.now() };

      this.synchronizeWith = props.synchronizeWith;
      this.synchronized = props.synchronizeWith !== undefined;

      this.setTimeout = setTimeout;
      this.stop = stop;
      this.resume = resume;
      this.setDelay = setDelay;
  }

  setTimeout() {
      const { delay, synchronizeWith } = this;
      const duration = delay - Math.abs(synchronizeWith - Date.now()) % delay;

      this.timer = setTimeout(() => {
          if (!this.stopped) this.setTimeout();
          this.setState({
              tick: this.state.tick + 1,
              timestamp: Date.now()
          });
      }, duration);
  }

  start() {
      this.stopped = false;
      if (!this.synchronized) {
          this.synchronizeWith = Date.now();
      }
      this.setTimeout();
  }

  resume() {
      if (this.stopped) {
          this.start();
      }
  }

  stop() {
      this.stopped = true;
      clearTimeout(this.timer);
  }

  setDelay(delay) {
      checkDelay(delay);
      this.delay = delay;
      if (!this.stopped) {
          this.stop();
          this.resume();
      }
  }

  componentDidMount() {
      this.start();
  }

  componentWillUnmount() {
      this.stop();
  }

  render() {
      const { props, delay, stop, resume, setDelay } = this;
      const { tick, timestamp } = this.state;

      const timer = { delay, tick, timestamp, stop, resume, setDelay };

      return React.createElement(TimedComponent, { ...props, timer });
  }
}




class PillOrg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schedule: [
        {
          time: '',
          med: '',
        }
      ],
    };
  }

  handleClick(i) {
    const schedule = this.state.schedule;
    const current = schedule[schedule.length - 1];
    
    this.setState({
      schedule: schedule,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    return (
      <div className="pillorg">
        <div className="pillorg-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
        <div className="app-timer">
          <Timer
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<PillOrg />, document.getElementById("root"));

