var readJson = require('./readJson');

// Stocke toutes les données de la recherche faîte par l'utilisateur
var data;

/**
 * Obtient les données liées à la recherche de l'utilisateur et prépare l'organisation
 * des données qui seront transmisent à l'utilisateur.
 */
exports.getDataJson = function (mode, ...args) {
  if(mode == 'ville'){
    data = readJson.searchDataCity(args[0]);
  }
  else if(mode == 'gps'){
    data = readJson.searchDataPosition(args[0], args[1], args[2]);
  }
  else{
    console.log("Le mode de recherche indiqué n\'est pas connu, veuillez indiqué 'ville' ou 'gps' ");
  }
}

/**
 * On obtient les coordonnées GPS de chaque station sous forme de liste:
 * - latitude
 * - longitude
 */
exports.getGpsCoordinates = function () {
  var gpsStationsCoordinates = [];
  for (let i = 0; i < data.length; i++){
    let gpsCoordinates = [
      data[i]._attributes.latitude, 
      data[i]._attributes.longitude
    ];
    gpsStationsCoordinates.push(gpsCoordinates);
  }
  return gpsStationsCoordinates;
}

/**
 * On obtient l'adresse de chaque station sous forme de liste :
 * - numéro et nom de rue (avenue, ...)
 * - code postal
 * - ville
 */
exports.getAddress = function () {
  var stationsAddress = [];
  data.forEach(function(item, index, array){
    let address = [
      item.adresse._text,
      item._attributes.cp,
      item.ville._text
      ];
    stationsAddress.push(address);
  });
  return stationsAddress;
}

/**
 * On obtient le carburant avec son prix pour chaque station sous forme de liste :
 * - clé = <nom_carburant>
 * - valeur = <prix>
 */
exports.getCarburant = function () { 
  var carburantStations = new Array();
  data.forEach(function(item, index, array){
    carburantStations.push(pushCarburant(item));
  });
  return carburantStations
}

/**
 * Renvoie une map avec le couple <nom_carburant> : <prix> pour une station.
 */
function pushCarburant(item) {
  var carburant = new Map();
  
  for(let i = 0; i < item.prix.length; i++){
    
    carburant.set(
      item.prix[i]._attributes.nom, 
      item.prix[i]._attributes.valeur
    );
  }
  return carburant;
}