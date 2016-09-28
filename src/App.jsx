import React, {Component} from 'react';
import 'bdsm';

import RequestWorker from 'worker!./worker';
const requestWorker = new RequestWorker();

class App extends Component {
  render() {
    return (
    	<div>
    		<button type="button" onClick={ this.successfull }>Successfull request</button>
    		<button type="button" onClick={ this.failing }>Failing request</button>
    		<p>{this.state.response && JSON.stringify(this.state.response)}</p>
    	</div>

    );
  }

  constructor() {
  	super();

  	this.state = {
  		response: null
  	};

  	this.successfull = this.successfull.bind(this);
  	this.failing = this.failing.bind(this);

  	requestWorker.onmessage = (response) => {
  		this.setState({ response: response.data });
  	}
  }

  successfull() {
  	this.setState({ response: 'loading'});
  	requestWorker.postMessage({
  		url: 'http://jsonplaceholder.typicode.com/posts/1',
  		method: 'GET'
  	});
  }

  failing() {
  	this.setState({ response: 'loading'});
  	requestWorker.postMessage({
  		url: 'http://localhost:3000/invalid/endpoint',
  		method: 'GET'
  	});
  }
}
export default App;
