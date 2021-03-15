import React, { Component } from 'react'

export default class Signin extends Component {
    state = {
        form: {
            username: '',
            email: '',
            password: '',
            confirm_password: ''
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    


    render() {
        return (
            <div className="auth-area signin container">
                <h1>Signin</h1>
                <form className="form">
                    <label htmlFor="username">Username</label>
                    <input name="username" type="text" value={this.state.form.username} id="username" placeholder="Enter username" onChange={this.handleInputChange}/>

                    <label htmlFor="password">Password</label>
                    <input name="password" type="password" value={this.state.form.password} id="password" placeholder="Enter password" onChange={this.handleInputChange}/>
            
                    <button className="btn btn--primary" type="submit">Sigin</button>
                </form>
            </div>
        )
    }
}
