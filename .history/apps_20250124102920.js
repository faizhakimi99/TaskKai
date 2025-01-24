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

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // var sess = req.session;

  //console.log(err.status + "-" + err.message); 
  // render the error page
  res.status(err.status || 500)
  if( err.status != null ){
      res.render('error', { title: req.app.locals.tabTitle }, function (err, html) {
          // html = utility.utilityJS(html, sess)
          res.send(html)
      });
  }
  else{
      var resultData = {}
      resultData.message = err.message;
      if(!res.headersSent){
          res.json(resultData);
      }    
  }
  
});

var port = 6001
app.listen(port, () => {
  console.log("taskKai is running on port: " + port);
})
