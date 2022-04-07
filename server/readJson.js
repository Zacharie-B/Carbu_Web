const fs = require("fs");

exports.readData = function (ville) {
  console.log('lecture de data.json...');
  var JsonData = fs.readFileSync("data.json");
  var ParsedJsonData = JSON.parse(JsonData);
  // console.log(ParsedJsonData.pdv_liste.pdv[0]); // 59780003
  
  for (let i = 0; i < ParsedJsonData.pdv_liste.pdv.length; i++) {
    if (ParsedJsonData.pdv_liste.pdv[i].ville._text === ville) {
      // console.log(ParsedJsonData.pdv_liste.pdv[i].services);
      
      for (let j = 0; j < ParsedJsonData.pdv_liste.pdv[i].prix.length; j++) {
        // console.log(
        //   ParsedJsonData.pdv_liste.pdv[i].prix[j]._attributes.nom +
        //     " est à " +
        //     ParsedJsonData.pdv_liste.pdv[i].prix[j]._attributes.valeur
        // );
      }
      return ParsedJsonData.pdv_liste.pdv[i].prix;
    }
  }
};