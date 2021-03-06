import React, { Component } from 'react'
import {Mutation} from "react-apollo"
import SIGN_IN_USER from "../mutations/signin"
import Error from "./Error"
import withAuth from "./HOC/withAuth"

class Signin extends Component {
    state = {
        form: {
            username: '',
            password: ''
        }
    }

    handleInputChange = (e) => {
        this.setState((state) => ({
            form: {
                ...state.form,
                [e.target.name]: e.target.value
            }
        }))
    }

    handleSubmit = (e, signinUserFunc) => {
        const {username, password} = this.state.form;
        e.preventDefault();
        signinUserFunc({
            variables: {
                username,
                password
            }
        }).then(async ({data}) => {
            localStorage.setItem("token", data.signinUser.token)
            await this.props.refetch()
            this.clearState()
            this.props.history.push('/')
        }).catch(e => {
            console.log(e)
        })
    }

    clearState = () => {
        this.setState({
            form: {
                username: '',
                password: ''
            }
        })
    }
    
    formValidation = () => {
        const {username, password} = this.state.form;
        let nonEmptyFields = !username || !password;
        if(nonEmptyFields) return true
    }

    render() {
        return (
            <Mutation mutation={SIGN_IN_USER}>
                {(signinUser, {error, loading}) => {
                    return (
                        <div className="auth-area signin container">
                            <h1>Signin</h1>
                            {error && <Error errors={error.graphQLErrors} />}
                            <form className="form" onSubmit={e => this.handleSubmit(e, signinUser)}>
                                <label htmlFor="username">Username</label>
                                <input name="username" type="text" value={this.state.form.username} id="username" placeholder="Enter username" onChange={this.handleInputChange}/>
            
                                <label htmlFor="password">Password</label>
                                <input name="password" type="password" value={this.state.form.password} id="password" placeholder="Enter password" onChange={this.handleInputChange}/>
                        
                                <button className="btn btn--primary" type="submit" disabled={loading || this.formValidation()}>Sigin</button>
                            </form>
                        </div>
                    )
                }}
            </Mutation>
        )
    }
}


export default withAuth(Signin)