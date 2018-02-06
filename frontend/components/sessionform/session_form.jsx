import React from 'react';
import { Link, withRouter } from 'react-router-3';

class SessionForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
			email: ""
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.update = this.update.bind(this);
		this.emailInput = this.emailInput.bind(this);
	}

	componentDidUpdate() {
		this.redirectIfLoggedIn();
	}

	redirectIfLoggedIn() {
		if (this.props.currentUser) {
			this.props.router.push("/residencyform");
		}
	}

	emailInput() {
		if (this.props.formType === "signup") {
			return (
				<label> <h5>Email</h5>
					<input type="text"
						value={this.state.email}
						onChange={this.update("email")}
						className="login-input" />
				</label>
			);
		}
	}

	handleSubmit(e) {
		e.preventDefault();
		const user = this.state;
		this.props.formType === "signup" ? this.props.signUp({user}) : this.props.logIn({user});
	}

	update(field) {
		return e => this.setState({[field]: e.currentTarget.value});
	}

	render() {
		const errors = this.props.errors.map((error, i) =>(
			<li key={i} className="form-error">{error}</li>
		));

		const type = this.props.formType === "signup" ? "Sign up" : "Log in";

		return (
			<div className="session-form-container">
				<h4>{type}</h4>
				<form onSubmit={this.handleSubmit} className="session-form">

					<ul>{errors}</ul>
					<div className="login-form">
						<label><h5>Username</h5>
							<input type="text"
								id="username"
								value={this.state.username}
								onChange={this.update("username")}
								className="login-input" />
						</label>
						<label><h5>Password</h5>
							<input type="password"
								id="password"
								value={this.state.password}
								onChange={this.update("password")}
								className="login-input" />
						</label>
						{this.emailInput()}
						<input className='form-button' type="submit" value="Submit" />
					</div>
				</form>
			</div>
		);
	}
}

export default withRouter(SessionForm);
