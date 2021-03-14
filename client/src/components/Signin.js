import React, { Component } from 'react'

export default class Signin extends Component {
    render() {
        return (
            <div className="auth-area signin">
                <h1>Signin</h1>
                <form className="form">
                    <label htmlFor="username">Username</label>
                    <input name="username" type="text" value={this.form.username} id="username" placeholder="Enter username" />

                    <label htmlFor="password">Password</label>
                    <input name="password" type="password" value={this.form.password} id="password" placeholder="Enter password" />
            
                    <button className="btn btn--primary" type="submit">Signup</button>
                </form>
            </div>
        )
    }
}
