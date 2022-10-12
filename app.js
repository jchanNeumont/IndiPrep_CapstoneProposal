const express = require('express'); // Getting instance of express package/module
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const path = require('path');
const port = 8000;

const indexRouter = require('./routes/index');
const usersRouter = require("./routes/users");
const apiRouter = require("./routes/api");

//Set up express to use our body parser
// we should then get a req.body json object with form values
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

//Setup our session and tell express to use it
const session = require('express-session');
const sessionConfig = {
  secret: 'Coolio',
  cookie: {}
}

app.use(session(sessionConfig));

app.use(express.static('public'));
// Tell express to use pug as our templating engine
// Also tell express where to find our views
app.set('views', './views');
app.set('view engine', 'pug');

app.use('', indexRouter);

app.use('/u', usersRouter);

app.use('/api', apiRouter);


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
