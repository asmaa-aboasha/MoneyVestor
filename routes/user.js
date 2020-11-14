const express = require('express')
const router = express.Router()
const User = require('../server/models/user')
const passport = require('../server/passport')

router.post('/', (req, res) => {
    // console.log('user signup');

    const { username, password } = req.body
    // ADD VALIDATION
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            console.log('User.js post error: ', err)
        } else if (user) {
            res.json({
                error: `Sorry, already a user with the username: ${username}`
            })
        }
        else {
            const newUser = new User({
                username: username,
                password: password
            })
            newUser.save((err, savedUser) => {
                if (err) return res.json(err)
                res.json(savedUser)
            })
        }
    })
})


// this route is just used to get the user basic info
router.get('/api/user', (req, res, next) => {
	// console.log('===== user!!======')
	// console.log(req.user)
	if (req.user) {
		return res.json({ user: req.user })
	} else {
		return res.json({ user: null })
	}
})

router.get('/api/logout', (req, res) => {
	req.logout()
	res.redirect('/')
})

router.post(
	'/api/login',
	function(req, res, next) {
		// console.log(req.body)
		// console.log('================')
		next()
	},
	passport.authenticate('local'),
	(req, res) => {
		// console.log('POST to /login')
		const user = JSON.parse(JSON.stringify(req.user)) // hack
		const cleanUser = Object.assign({}, user)
		if (cleanUser.local) {
			// console.log(`Deleting ${cleanUser.local.password}`)
			delete cleanUser.local.password
		}
		res.json({ user: cleanUser })
	}
)

router.post('/logout', (req, res) => {
	if (req.user) {
		req.session.destroy()
		res.clearCookie('connect.sid') // clean up!
		return res.json({ msg: 'logging you out' })
	} else {
		return res.json({ msg: 'no user to log out!' })
	}
})

router.post('/api/signup', (req, res) => {
	const { username, password } = req.body
	// console.log(password);
	// ADD VALIDATION
	User.create({ 'local.username': username, 'local.password' : password, funds: 10000 }, (err, userMatch) => {
		// console.log(err);
		// console.log(userMatch)
		if (userMatch) {
			return res.json({
				error: `Sorry, already a user with the username: ${username}`
			})
		}
		const newUser = new User({
			'local.username': username,
			'local.password': password
		})
		newUser.save((err, savedUser) => {
			if (err) return res.json(err)
			return res.json(savedUser)
		})
	})
})

module.exports = router
