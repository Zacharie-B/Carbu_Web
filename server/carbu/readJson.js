const fs = require("fs");

/**
 *  Charge le fichier JSON en RAM et le parse.
 */
const readJson = function () {
  let JsonData = fs.readFileSync("data.json");
  return JSON.parse(JsonData);
}

/**
 * Recherche dans les données les stations dans la ville indiqué.
 */
exports.searchDataCity = function (ville) {
  let ParsedJsonData = readJson(); 
  var resultData = [];
  for (let i = 0; i < ParsedJsonData.pdv_liste.pdv.length; i++) {
    if (ParsedJsonData.pdv_liste.pdv[i].ville._text == ville || ParsedJsonData.pdv_liste.pdv[i].ville._text == ville.toUpperCase()) {
      resultData.push(ParsedJsonData.pdv_liste.pdv[i]);
    }
  }
  return resultData;
};

/**
 * Recherche dans les données les stations à proximité de la ville indiqué.
 */
exports.searchDataPosition = function (latitude, longitude, rayon) {
  
};