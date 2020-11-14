import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Container from '../../components/Grid'

class SignupForm extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			confirmPassword: '',
			redirectTo: null,
			noBlankInputs: false,
			passwordsMustMatch: false,
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	handleSubmit(event) {
		event.preventDefault()
		if (this.state.username === '' || this.state.password === '' || this.state.confirmPassword === '') {
			return this.setState({ noBlankInputs: true })
		}
		if (this.state.password !== this.state.confirmPassword) {
			return this.setState({ passwordsMustMatch: true })
		}
		axios
			.post('/api/signup', {
				username: this.state.username,
				password: this.state.password
			})
			.then(response => {
				if (response.status === 200) {
					console.log('youre good')
					this.setState({
						redirectTo: '/login'
					})
				} else {
					console.log('duplicate')
				}
			})
	}
	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		} else {
		return (
            <Container>
			<div className="SignupForm">
				<h1>Signup form</h1>
				{this.state.noBlankInputs && <div>All fields must have inputs</div>  }
				{this.state.passwordsMustMatch && <div>Password field and Confirm Password field are not Matching</div>  }
				<label htmlFor="username">Username: </label>
				<input
					type="text"
					name="username"
					value={this.state.username}
					onChange={this.handleChange}
				/>
				<label htmlFor="password">Password: </label>
				<input
					type="password"
					name="password"
					value={this.state.password}
					onChange={this.handleChange}
				/>
				<label htmlFor="confirmPassword">Confirm Password: </label>
				<input
					type="password"
					name="confirmPassword"
					value={this.state.confirmPassword}
					onChange={this.handleChange}
				/>
				<button onClick={this.handleSubmit}>Sign up</button>
			</div>
            </Container>
		)
	}
	}
}

export default SignupForm
