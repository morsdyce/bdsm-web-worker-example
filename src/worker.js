import 'bdsm/dist/bdsm.worker.js';

self.addEventListener('message', (message) => {
  if (message.data.type !== 'REQUEST') {
    return;
  }

  const { method, url } = message.data;

  console.log({ method, url });

  fetch(url)
    .then((response) => response.text())
    .then((response) => self.postMessage(Object.assign({}, { type: 'RESPONSE', payload: response })));
});
