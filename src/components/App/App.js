import React, { Component } from 'react';
import './App.css';
import { getUrls, postUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: []
    }
  }

  passUrls = (data) => {
    this.setState({urls: data[0].urls});
  }

  sendUrl = (url) => {
    postUrls(url);
  }

  componentDidMount() {
    Promise.all([getUrls()])
      .then((data) => this.passUrls(data))
  }


  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm sendUrl={this.sendUrl} />
        </header>

        <UrlContainer urls={this.state.urls}/>
      </main>
    );
  }
}

export default App;
