// Recupere le fichier zip
const axios = require("axios");
// Dezip le fichier pour obtenir le xml
const AdmZip = require("adm-zip");
// Convertis le fichier xml en objet JSON
const convert = require("xml-js");
// Acceder au file system
const fs = require("fs");
// Pour acceder aux pages
const path = require("path");
// Framework
const express = require("express");
// Handlebars pour faire des templates
var exphbs = require("express-handlebars");
// CORS permet d'eviter les erreurs de policy
const cors = require("cors");

// application
const app = express();
app.use(cors());

console.log("lancement");

var ParsedData;

// view engine
var hbs = exphbs.create({
  extname: "hbs",
  defaultLayout: "layout",
  layoutsDir: __dirname + "/public/layouts/",
});
app.engine("hbs", hbs.engine);
app.set("views", path.join(__dirname, "/public/views/"));
app.set("view engine", "hbs");

// Set paths to static files
app.use(express.static(__dirname + "/public"));

// Startup page for the server
app.get("/", function (req, res) {
  res.render("index", { title: "Trouve ton essence !" });
});

// get index.hbs
app.get("/index", function (req, res) {
  res.render("index", { title: "Trouve ton essence !" });
});

// get login.hbs
app.get("/login", function (req, res) {
  res.render("login", { title: "Trouve ton essence !" });
});

// get register.hbs
app.get("/register", function (req, res) {
  res.render("register", {
    title: "Trouve ton essence !",
    prix: "17",
    station_ex: ParsedData.pdv_liste.pdv[4].adresse._text,
  });
});

// get contacts.hbs
app.get("/contacts", function (req, res) {
  res.render("contacts", { title: "Trouve ton essence !" });
});

// Set port of app
app.listen(process.env.PORT, "0.0.0.0", function (err) {
  if (err) {
    console.log(`error`);
    process.exit(1);
  }
  console.log("port: " + process.env.PORT);
});

var FinalJSON = undefined;

// gather the Data and make it a JSON
const getData = async () => {
  const url = "https://donnees.roulez-eco.fr/opendata/instantane";
  // recupere le fichier depuis l'url
  const body = await axios.get(url, {
    responseType: "arraybuffer",
  });

  // regarder les fichiers dans le zip
  var zip = new AdmZip(body.data);
  var zipEntries = zip.getEntries();

  // latin1 correspond a ISO-8859-1
  var Xmldata = zipEntries[0].getData().toString("latin1");

  // conversion du xml en json
  var JSONData = convert.xml2js(Xmldata, { compact: true, spaces: 4 });
  // conversion du json en string
  var JSONDatastring = JSON.stringify(JSONData, undefined, 4);

  // convertit le string depuis latin1 vers utf-8
  FinalJSON = Buffer.from(JSONDatastring, "utf-8").toString();
  console.log('ecriture de data.json...');
  fs.writeFileSync("data.json", FinalJSON);
  console.log('fichier data.json ecrit');
  // parcourir les stations essences du JSON pour trouver un prix
  //
};

//getData();

const readData = function () {
  console.log('lecture de data.json...');
  var JsonData = fs.readFileSync("data.json");
  var ParsedJsonData = JSON.parse(JsonData);
  console.log(ParsedJsonData.pdv_liste.pdv[0]._attributes.id); // 59780003
//   for (let i = 0; i < ParsedJsonData.pdv_liste.pdv.length; i++) {
//     if (ParsedJsonData.pdv_liste.pdv[i]._attributes.id == "93420001") {
//       // doit afficher - adresse Boulevard Robert Ballanger - Gazole a environ 2 euros
//       console.log(ParsedJsonData.pdv_liste.pdv[i]);
//       console.log(ParsedJsonData.pdv_liste.pdv[i].adresse);
//       console.log(ParsedJsonData.pdv_liste.pdv[i].prix[0]);

//       for (let j = 0; j < ParsedJsonData.pdv_liste.pdv[i].prix.length; j++) {
//         console.log(
//           ParsedJsonData.pdv_liste.pdv[i].prix[j]._attributes.nom +
//             " est à " +
//             ParsedJsonData.pdv_liste.pdv[i].prix[j]._attributes.valeur
//         );
//       }
//     }
// }
};

readData();

console.log("fin du serveur");
