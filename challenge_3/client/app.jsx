import React, { useState } from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      frames: [[],[],[],[],[],[],[],[],[],[]],
      activeBall: 0,
      activeFrame: 0,
      pinsLeft: 10,
      score : 0,
      gameOver: false
    }
    this.onButtonClick = this.onButtonClick.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }



  onButtonClick(e) {
    let num = Number(e.target.id);
    let {activeBall, activeFrame, frames, pinsLeft} = this.state;
    frames[activeFrame][activeBall] = num;
    pinsLeft = pinsLeft - num
    if (num === 10 || activeBall === 1) {
      frames = this.calculateScore(frames)
      activeFrame = activeFrame + 1
      activeBall = 0;
      pinsLeft = 10;
    } else { activeBall++ }

    this.setState({
      frames,
      activeBall,
      activeFrame,
      pinsLeft
    });
  }
  calculateScore(frames) {
    frames.forEach((frame, i) => {
      if (i > this.state.activeFrame) { return }
      let prevScore = frames[i - 1] ? frames[i - 1][2] : 0
      //strike
      if (frame[0] === 10) {
        //look ahead
        //frame 9 with a strike, if there is no frame 11 make one

        //on frame 10 if we hit a strike
        if(i > 8 && !frames[i+1]) { frames.push([]) }
        //next frame is also a strike
        if (frames[i + 1][0] === 10 && frames[i+2] && frames[i + 2][0] !== undefined) {
          frame[2] = prevScore + frames[i + 1][0] + frames[i + 2][0] + 10
        //
        } else if (frames[i + 1][0] != undefined && frames[i + 1][1] !== undefined) {
          frame[2] = prevScore + frames[i + 1][0] + frames[i + 1][1] + 10;
        }
        return;
      } else if (frame[0] + frame[1] === 10) {
        //spare
        if (i > 8 && !frames[i+1]) { frames.push([])}
        if (frames[i + 1][0] !== undefined) { frame[2] = prevScore + 10 + frames[i + 1][0] }
        return;
      } else if (frame[0] !== undefined && frame[1] !== undefined) {
        frame[2] =  prevScore + frame[0] + frame[1];
        return;
      }
    })
    if (frames[9][2]) {this.setState({ score: frames[9][2], gameOver: true })}
    return frames;
  }
  resetGame() {
    this.setState({
      frames: [[],[],[],[],[],[],[],[],[],[]],
      activeBall: 0,
      activeFrame: 0,
      pinsLeft: 10,
      score : 0,
      gameOver: false
    })
  }
  render() {
    let {frames, activeBall, activeFrame, pinsLeft} = this.state;
    let buttons = [];
    for(let i = 0; i <= pinsLeft; i++) {
      buttons.push(i)
    }
    return (
      <div>
      <table>
        <thead>
          <tr>
            {frames.map((frame, i) => <th key={i} colSpan="2" className={i === activeFrame ? "active":""}>{i > 9 ? 'Scoring Frame' : `Frame ${i + 1}`}</th>)}
          </tr>
          <tr>
          {frames.map((frame,i) => (
          <>
            <th className={i === activeFrame && activeBall === 0 ? "active" : " "}>Ball 1</th>
            <th className={i === activeFrame && activeBall === 1 ? "active" : " "}>Ball 2</th>
          </>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
          {frames.map((frame,i) => (
            <>
              <td>{frame[0] !== undefined ? frame[0] === 10 ? '' : frame[0] : ''}</td>
              <td>{frame[0] === 10 ? 'X' : frame[1] !== undefined ? frame[0] + frame[1] === 10 ? '/' : frame[1]: ''}</td>

            </>
          ))}
          </tr>
          <tr>
            {frames.map((frame,i) => (
              <td colSpan="2">{i > 9 ? '' : frame[2] !== undefined ? frame[2]: ''}</td>
              ))}
          </tr>

        </tbody>
      </table>

        <div id="buttons">{
          !this.state.gameOver ? buttons.map(i => <button id={i} key={i} onClick={(e) => this.onButtonClick(e)}>{i}</button>) : <button onClick={this.resetGame}>Reset</button>
        }</div>
        {!this.state.gameOver ? "How many pins did you hit?" : `Final Score ${this.state.score}`}
      </div>
    )
  }

}

ReactDOM.render(<App/>, document.getElementById('root'));