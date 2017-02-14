/***
 * Socket Server
 */
const express = require('express');
const app = express();
const server = require('http').createServer(app);

const io = require('socket.io')(server);


const temper_event_emitter = require('./temper_event_emitter');
const numeral = require('numeral');



const nunjucks = require('nunjucks');


//Cấu hình nunjucks
nunjucks.configure('views', {
  autoescape: true,
  cache: false,
  express: app,
  watch: true
});


app.use('/public', express.static('public'));

// Set Nunjucks as rendering engine for pages with .html suffix
app.engine('html', nunjucks.render);
app.set('view engine', 'html');

app.get('/', (req, res) => {
  res.render('index.html');
});

server.listen(8080, () => {
  console.log('Web app listens at port 8080');
});


io.on('connection', (socket) => {
  temper_event_emitter.on('temp_change', (data) => {
    let temperature = numeral(data.temp).format('0,0.00');
    console.log(temperature);
    socket.emit('temp_change', {temp: temperature});
  });

  temper_event_emitter.on('shutdown', () => {
    socket.emit('shutdown');
  });

});
