const express = require("express");
const apiRoutes = require('./routes/api.js');
const connection = require('./config/database.js');
const fileUpload = require('express-fileupload');

const server = express();
const port = process.env.PORT || 9999;
const hostname = process.env.HOST_NAME;

//config file-upload
server.use(fileUpload());

//config req.body
server.use(express.json()); // Used to parse JSON bodies
server.use(express.urlencoded()); //Parse URL-encoded bodies
server.use('/v1/api/',apiRoutes);

(async () => {
  //test connection
  try {
    await connection();
    server.listen(port, hostname, () => {
      console.log(`SneekerStore app listening on port ${port}`);
    })
  } catch (error) {
    console.log("DB connection error!");
  } 
})()

