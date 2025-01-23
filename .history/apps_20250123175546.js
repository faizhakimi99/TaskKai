import * as dotenv from "dotenv"
import createError from 'http-errors'
dotenv.config()

import express from "express"
import ejs from 'ejs'
import bodyParser from "body-parser"
import path from "path"
import { fileURLToPath } from "url"
import session from "express-session"
import routes from "./src/routes/index.js"

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var app = express()

// Sessions setup
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
}));

// view engine setup
app.engine('html', ejs.renderFile)
app.set('views', path.join(__dirname, 'src', 'views'))
app.set('view engine', 'html')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(routes)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

var port = 6001
app.listen(port, () => {
  console.log("taskKai is running on port: " + port);
})
