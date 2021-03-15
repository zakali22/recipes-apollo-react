import React, { Component } from 'react'
import {Mutation} from "react-apollo"
import SIGN_UP from "../mutations/signup"

export default class Signup extends Component {
    state = {
        form: {
            username: '',
            email: '',
            password: '',
            confirm_password: ''
        },
        error: null
    }

    handleInputChange = (e) => {
        this.setState((state) => ({
            form: {
                ...state.form, 
                [e.target.name]: e.target.value
            }
        }))
    }

    handleSubmit = (e, signupUserFunc) => {
        e.preventDefault();
        const {username, email, password, confirm_password} = this.state.form;
        if(password === confirm_password){
            try {
                this.setState({
                    error: null
                })
                console.log("Signing in....")
                signupUserFunc({
                    variables: {
                        username, 
                        email, 
                        password
                    }
                }).catch(err => console.log(err))
            } catch(e){
                console.log(e)
            }
        } else {
            this.setState({
                error: {
                    message: 'Passwords do not match'
                }
            })
        }
    }
    
    renderGraphqlErrors = (graphQLErrors) => {
        return (
            <div>
                {graphQLErrors.map((err, index) => (
                    <p key={index} style={{color: 'red'}}>{err.message}</p>
                ))}
            </div>
        )
    }

    render() {
        return (
            <div className="auth-area signup container">
                <h1>Signup</h1>
                <Mutation mutation={SIGN_UP}>
                    {(signupUser, {error}) => {
                        console.log(error)
                        return (
                            <React.Fragment>
                                {error && this.renderGraphqlErrors(error.graphQLErrors)}
                                {this.state.error && <p style={{color: 'red'}}>{this.state.error.message}</p>}
                                <form className="form" onSubmit={e => this.handleSubmit(e, signupUser)}>
                                    <label htmlFor="username">Username</label>
                                    <input name="username" type="text" value={this.state.form.username} id="username" placeholder="Enter username" onChange={this.handleInputChange}/>

                                    <label htmlFor="email">Email</label>
                                    <input name="email" type="email" value={this.state.form.email} id="email" placeholder="Enter email" onChange={this.handleInputChange}/>

                                    <label htmlFor="password">Password</label>
                                    <input name="password" type="password" value={this.state.form.password} id="password" placeholder="Enter password" onChange={this.handleInputChange}/>

                                    <label htmlFor="confirm_password">Confirm Password</label>
                                    <input name="confirm_password" type="password" value={this.state.form.confirm_password} id="confirm_password" placeholder="Enter confirm password" onChange={this.handleInputChange}/> 
                            
                                    <button className="btn btn--primary" type="submit">Signup</button>
                                </form>
                            </React.Fragment>
                        )
                    }}
                </Mutation>
            </div>
        )
    }
}
