const express = require('express'); // Getting instance of express package/module
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const path = require('path');
const port = 8000;
// const { auth } = require('express-openid-connect');

// require("dotenv").config();

// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: 'a long, randomly-generated string stored in env',
//   baseURL: 'http://localhost:3000',
//   clientID: 'jOh22tDwalDsCxutF5TcMI6Jx32cY2gc',
//   issuerBaseURL: 'https://dev-y7axxxztvwww3xtf.us.auth0.com'
// };

// // auth router attaches /login, /logout, and /callback routes to the baseURL
// app.use(auth(config));

// // req.isAuthenticated is provided from the auth router
// app.get('/', (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });


// const session = {
//   secret: process.env.SESSION_SECRET,
//   cookie: {},
//   resave: false,
//   saveUninitialized: false
// };

// const strategy = new Auth0Strategy(
//   {
//     domain: process.env.AUTH0_DOMAIN,
//     clientID: process.env.AUTH0_CLIENT_ID,
//     clientSecret: process.env.AUTH0_CLIENT_SECRET,
//     callbackURL: process.env.AUTH0_CALLBACK_URL
//   },
//   function(accessToken, refreshToken, extraParams, profile, done) {
//     /**
//      * Access tokens are used to authorize users to an API
//      * (resource server)
//      * accessToken is the token to call the Auth0 API
//      * or a secured third-party API
//      * extraParams.id_token has the JSON Web Token
//      * profile has all the information from the user
//      */
//     return done(null, profile);
//   }
// );

// if (app.get("env") === "production") {
//   // Serve secure cookies, requires HTTPS
//   session.cookie.secure = true;
// }

const indexRouter = require('./routes/index');
const usersRouter = require("./routes/users");
const apiRouter = require("./routes/api");


// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "pug");
// app.use(express.static(path.join(__dirname, "public")));

// app.use(expressSession(session));

// passport.use(strategy);
// app.use(passport.initialize());
// app.use(passport.session());

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });
//Set up express to use our body parser
// we should then get a req.body json object with form values
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());


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

// app.use((req, res, next) => {
//   res.locals.isAuthenticated = req.isAuthenticated();
//   next();
// });

app.use('', indexRouter);

app.use('/u', usersRouter);

app.use('/api', apiRouter);


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
