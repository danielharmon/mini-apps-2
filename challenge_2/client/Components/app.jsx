import React, {useRef, useState} from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate:"2021-04-02",
      endDate:"2021-04-10",
      data: {
        datasets: [{
          label: 'BTC in USD by Date',
          data: {},
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      }
    }

    this.chartRef = {};
    this.getBitCoinData = this.getBitCoinData.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  getBitCoinData() {
    axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${this.state.startDate}&end=${this.state.endDate}`)
      .then(response => {
        const newState = this.state.data;
        newState.datasets[0].data = response.data.bpi;
        this.setState({data: newState})
      })
      .catch(err => console.log(err))
  }
  handleDateChange(e) {
    let newState = {};
    newState[e.target.id] = e.target.value
    this.setState(newState)
  }
  componentDidMount() {
    this.getBitCoinData();
  }
  render() {
    return (
      <>
      <input type="date" id="startDate" onChange={(e) => this.handleDateChange(e)}></input>
      <input type="date" id="endDate" onChange={(e) => this.handleDateChange(e)}></input>
      <button onClick={this.getBitCoinData}>Get Chart</button>
      <canvas id="myChart"></canvas>
      <Line key={Math.random()} data={this.state.data} />
      <a href="https://www.coindesk.com/price/bitcoin">Powered by CoinDesk</a>
      </>
    )
  }
}

export default App;