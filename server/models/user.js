const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    //id provided by MongoDB
	firstName: { type: String, unique: false },
	lastName: { type: String, unique: false },
	local: {
		username: { type: String, unique: false, required: false },
		password: { type: String, unique: false, required: false }
	},
	google: {
		googleId: { type: String, required: false }
	},
	photos: [],
    //login: {}, // double check the passport project to figure out what goes here
    portfolio: [{
        stockId: {type: String, trim: true}, //maybe add 'uppercase: true
        shares: {type: Number, min: 0},
        initDate: {type: Date, default: Date.now}, //min: Date.now, this may not work correctly for updates
        initPrice: {type: Number, min: 0}, //price at investment
        currPrice: {type: Number, min: 0} //price at most recent update
    }],
    funds: {type: Number, required: true}, //default: 10000
    position: {type: Number} //leaderboard position
});

userSchema.methods = {
	checkPassword: function(inputPassword) {
		return bcrypt.compareSync(inputPassword, this.local.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}

userSchema.pre('save', function(next) {
	if (!this.local.password) {
		console.log('NO PASSWORD PROVIDED!')
		next()
	} else {
		this.local.password = this.hashPassword(this.local.password)
		next()
	}
})

const User = mongoose.model("User", userSchema);

module.exports = User;