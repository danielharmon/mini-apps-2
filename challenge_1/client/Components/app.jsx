import React from 'react';
import ReactPaginate from 'react-paginate';
import Events from './events';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      query:'',
      currentPage: 1
    };
    this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  loadCommentsFromServer() {
    axios.get(`/events?q=${this.state.query}&_page=${this.state.currentPage}`)
      .then(response => {
        console.log(response)
        this.setState({
          data: response.data,
          pageCount: Math.ceil(response.headers['x-total-count'] / 10),
        });
      })
      .catch(err => console.log(err))
  }


  handlePageChange(data) {
    this.setState({ currentPage: data.selected+1 }, () => {
      this.loadCommentsFromServer();
    })
  }

  handleQueryChange(e) {
    this.setState({query: e.target.value}, () => this.loadCommentsFromServer())
  }

  componentDidMount() {
    this.loadCommentsFromServer();
  }

  render() {
    return (
      <>
        <label htmlFor="query">Search By</label>
        <input id="query" type="text" onChange={(e) => this.handleQueryChange(e)} default="search terms..."></input>
        <Events data={this.state.data}/>
        <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={this.state.pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={this.handlePageChange}
        containerClassName={'pagination'}
        activeClassName={'active'}
        />
      </>
    )
  }
}

export default App;

