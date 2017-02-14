
const EventEmitter = require('events');

class TemperatureEventEmitter extends EventEmitter {}

const temper_event_emitter = new TemperatureEventEmitter();


let count = 0;
/***
 * Định thời nửa giây một lần tạo ra một sự kiện nhiệt độ thay đổi event temp_change
 * @type {*}
 */
let timer = setInterval(() => {
  temper_event_emitter.emit('temp_change', {temp: 10 + Math.random()* 20});
  count++;

  //Sau 100 lần sẽ dừng
  if (count > 100) {
    temper_event_emitter.emit('shutdown');
    clearInterval(timer);
  }
}, 1000);

module.exports = temper_event_emitter;
