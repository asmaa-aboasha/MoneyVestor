const User = require('../models/user')
const LocalStrategy = require('passport-local').Strategy

const strategy = new LocalStrategy(
	{
		usernameField: 'username' // not necessary, DEFAULT
	},
	function(username, password, done) {
		console.log("Local Strategy callback!");
		console.log(username + " : " + password);
		User.findOne({ 'local.username': username }, (err, userMatch) => {
			if (err) {
				console.log("ERROR: " + err);
				return done(err)
			}
			if (!userMatch) {
				console.log("incorrect username")
				return done(null, false, { message: 'Incorrect username' })
			}
			if (!userMatch.checkPassword(password)) {
				console.log("Incorrect password")
				return done(null, false, { message: 'Incorrect password' })
			}
			return done(null, userMatch)
		})
	}
)

module.exports = strategy
