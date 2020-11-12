const express = require("express");
const session = require("express-session");
const routes = require("../routes");
const app = express();
const PORT = process.env.PORT || 3001;
const MongoStore = require('connect-mongo')(session)
//mongodb mongoose models
const db = require("./models");
const User = require('./models/user')

const passport = require("./passport");
// Configure body parsing for AJAX requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// We need to use sessions to keep track of our user's login status
app.use(
  session({ 
    secret: "keyboard cat",
    store: new MongoStore({ 
      mongooseConnection: db,
      autoRemove: 'disabled'
    }),
    resave: false, 
    saveUninitialized: false 
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//TODO - add middleware authentication - either passport or basic-express-auth, etc.
// Passport
app.use(passport.initialize())
app.use(passport.session()) // calls the deserializeUser

// Add routes, both API and view
app.use(routes);

app.use('/user', User)

// Start the API server
app.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);
