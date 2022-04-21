console.log("hello");
const readData = require('/.server/carbu/processCarbuData');

console.log("hello");
// readData.getDataJson('ville','Paris');
readData.getDataJson('departement', 'PARIS');
// console.log(readData.getGpsCoordinates());
// console.log(readData.getAddress());
console.log(readData.getCarburant());