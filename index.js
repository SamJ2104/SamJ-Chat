const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Pusher = require('pusher');

const app = express();
const port = process.env.PORT || 3000;

const pusher = new Pusher({
  appId: '1798316',
  key: 'a4784d0a0a48041370f1',
  secret: '5933d3d3070b0c47e41f',
  cluster: 'eu',
  encrypted: true
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/message', (req, res) => {
  const { username, message } = req.body;
  pusher.trigger('chat', 'message', { username, message });
  res.sendStatus(200);
});

// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});