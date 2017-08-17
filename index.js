var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const axios = require('axios')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/new-message', function(req, res) {
  const {message} = req.body

  if (!message || !message.text || message.text.toLowerCase().indexOf('party') <0) {
    return res.end()
  }

  axios.post('https://api.telegram.org/bot'+process.env.API_TOKEN+'/sendDocument', {
    chat_id: message.chat.id,
    document: 'http://cultofthepartyparrot.com/parrots/hd/parrot.gif'
  })
    .then(response => {
      // We get here if the message was successfully posted
      console.log('Message posted (',message.chat.id,')')
      res.end('ok')
    })
    .catch(err => {
      console.log('Error :', err)
      res.end('Error :' + err)
    })

});

// Finally, start our server
app.listen(3000, function() {
  console.log('Telegram app listening on port 3000!');
});