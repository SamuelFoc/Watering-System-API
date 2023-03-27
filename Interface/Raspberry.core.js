//const Gpio = require("onoff").Gpio;

const readMoisture = (sensorPin) => {
  return new Promise((resolve, reject) => {
    const sensor = new Gpio(sensorPin, "in");

    sensor.read((error, value) => {
      if (error) {
        reject(error);
      } else {
        resolve(value);
      }
    });

    sensor.unexport();
  });
};

const turnOnRelay = (pin, duration) => {
  return new Promise((resolve, reject) => {
    const relay = new Gpio(pin, "out");

    relay.write(1, (error) => {
      if (error) {
        reject(error);
      } else {
        console.log(`Relay on for ${duration}ms`);
        setTimeout(() => {
          relay.write(0, () => {
            relay.unexport();
            console.log("Relay off");
            resolve();
          });
        }, duration);
      }
    });
  });
};

module.exports = {
  readMoisture,
  turnOnRelay,
};
