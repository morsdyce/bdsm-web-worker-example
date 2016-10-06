import React, {Component} from 'react';
import API from 'bdsm';

import RequestWorker from 'worker!./worker';
const requestWorker = new RequestWorker();

API.bootstrapWorker(requestWorker);

class App extends Component {
	constructor() {
		super();

		this.state = {
			response: null
		};

		requestWorker.onmessage = (response) => {
			this.setState({ response: response.data.payload });
		}
	}

	successful(requestMethod) {
		this.setState({ response: 'loading'});
		requestWorker.postMessage({
			type: 'REQUEST',
			url: 'http://jsonplaceholder.typicode.com/posts/1',
			method: 'GET',
			requestMethod
		});
	}

	failing(requestMethod) {
		this.setState({ response: 'loading'});
		requestWorker.postMessage({
			type: 'REQUEST',
			url: 'http://localhost:3000/invalid/endpoint',
			method: 'GET',
			requestMethod
		});
	}

	render() {
    return (
    	<div>
    		<button type="button" onClick={ this.successful.bind(this, 'fetch') }>Successful request Fetch</button>
    		<button type="button" onClick={ this.failing.bind(this, 'fetch') }>Failing request Fetch</button>
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<button type="button" onClick={ this.successful.bind(this, 'xhr') }>Successful request XHR</button>
				<button type="button" onClick={ this.failing.bind(this, 'xhr') }>Failing request XHR</button>
    		<p>{this.state.response && JSON.stringify(this.state.response)}</p>
    	</div>

    );
  }
}
export default App;
