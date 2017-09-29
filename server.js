/********************************************************************************
      ."".    ."",       ____        ____                       ____  _       __
      |  |   /  /       / __ \____ _/ / /_  __   ____  _____   / __ \(_)___  / /_
      |  |  /  /       / /_/ / __ `/ / / / / /  / __ \/ ___/  / /_/ / / __ \/ __/
      |  | /  /       / _, _/ /_/ / / / /_/ /  / /_/ / /     / _, _/ / /_/ / /_
      |  |/  ;-._    /_/ |_|\__,_/_/_/\__, /   \____/_/     /_/ |_/_/\____/\__/
      }  ` _/  / ;                   /____/
      |  /` ) /  /
      | /  /_/\_/\   (c) 2017 Rally or Riot
      |/  /      |   Project authored by:
      (  ' \ '-  |   - Dayton Mills
       \    `.  /    - Jeanelle Sebastion
        |      |     - Jeff Palin
        |      |     - Nick Saponaro
        |      |     - Rowinn Dionisio

        FILE: server.js - Global app configuration for Node/Express server

*******************************************************************************/

var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var app = express();
var port = process.env.PORT || 3100;

var db = require('./models');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("public"));

// require('./routes/api-routes.js)(app);
// require('./routes/html-routes.js')(app);

// Change force to true if you'd like to reset the database for any reason
db.sequelize.sync({ force: false }).then(function() {
      app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
      });
    });