const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const app = express();

app.use(bodyParser.json());

app.post('/callback', (req, res) => {
  const events = req.body.events || [];
  events.forEach(ev => {
    if (ev.type === 'message' && ev.message.type === 'text') {
      const msg = `LINEから: ${ev.message.text}`;
      fetch(process.env.SLACK_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: msg })
      });
    }
  });
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
