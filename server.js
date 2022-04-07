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
// Glob charge toutes les pages Javascript d'un répertoire
// const glob = require('glob');

// application
const app = express();
app.use(cors());

console.log("lancement");

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
    prix: "1",
    station_ex: "Paris"
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
  let FinalJSON = Buffer.from(JSONDatastring, "utf-8").toString();
  console.log('ecriture de data.json...');
  fs.writeFileSync("data.json", FinalJSON);
  console.log('fichier data.json ecrit');
};
// getData();

var readData = require('./server/processCarbuData');
readData.getDataJson('ville','Ermont');
console.log(readData.getGpsCoordinates());
console.log(readData.getAddress());
console.log(readData.getCarburant());

console.log("fin du serveur");
