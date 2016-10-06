import 'bdsm/worker';
import superagent from 'superagent';

self.addEventListener('message', (message) => {
  const { method, url, requestMethod } = message.data;

  console.log({ method, url, requestMethod });

  // XHR Sample with superagent
  if (requestMethod === 'xhr') {
    superagent
      .get(url)
      .end((err, res) => {
        if (err) {
          self.postMessage(err.message);
        }

        self.postMessage({ type: 'RESPONSE', payload: res.text });
      });
  }

  // fetch API sample
  if (requestMethod === 'fetch') {
    fetch(url)
      .then((response) => response.text())
      .then((response) => self.postMessage(Object.assign({}, { type: 'RESPONSE', payload: response })));
  }


});
