import React, { Component } from 'react'

export default class Signup extends Component {
    render() {
        return (
            <div className="auth-area signup">
                <h1>Signup</h1>
                <form className="form">
                    <label htmlFor="username">Username</label>
                    <input name="username" type="text" value={this.form.username} id="username" placeholder="Enter username" />

                    <label htmlFor="email">Email</label>
                    <input name="email" type="email" value={this.form.email} id="email" placeholder="Enter email" />

                    <label htmlFor="password">Password</label>
                    <input name="password" type="password" value={this.form.password} id="password" placeholder="Enter password" />

                    <label htmlFor="confirm_password">Confirm Password</label>
                    <input name="confirm_password" type="password" value={this.form.confirm_password} id="confirm_password" placeholder="Enter confirm password" /> 
            
                    <button className="btn btn--primary" type="submit">Signup</button>
                </form>
            </div>
        )
    }
}
