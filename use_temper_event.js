/**
 * Created by techmaster on 2/14/17.
 */
const temper_event_emitter = require('./temper_event_emitter');
const numeral = require('numeral');


temper_event_emitter.on('temp_change', (data) => {
  let temperature = numeral(data.temp).format('0,0.00');
  console.log(temperature);

});

temper_event_emitter.on('shutdown', () => {
  console.log('Temperature shuts down');
});