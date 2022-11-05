const express = require('express');
require("dotenv").config();
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');
const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const { database, fileUploadProvider } = require("./config");
//Mount Multipart-Form Processor
app.use(fileUploadProvider.getMultipartFormMiddleware());
//Mount SERVER MAIN ROUTES AFTER DATABASE CONNECTION
const serverMainRoutes = require("./routes");
//Mount API ROUTES AFTER DATABASE CONNECTION
const apiV1Routes = require('./api/v1/routes/');
database.connect().then(connected => {
    app.use(serverMainRoutes);
    app.use("/api/v1", apiV1Routes);
});

module.exports = app;