import React, {Component} from "react"
import {Mutation} from "react-apollo"
import ADD_RECIPE from "../mutations/addRecipe"
import Error from "./Error"
import withAuth from "./HOC/withAuth"
import FETCH_ALL_RECIPES from "../queries/fetchAllRecipes"

class AddRecipe extends Component {
    state = {
        form: {
            name: '',
            description: '',
            instructions: '',
            category: ''
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

    handleSubmit = (e, addRecipeFunc) => {
        e.preventDefault();

        addRecipeFunc({
            variables: {
                ...this.state.form
            }
        }).then((res) => {
            this.clearState();
            this.props.history.push('/')
        }).catch(e => {
            console.log("Error => ")
            console.log(e)

            
        })
    }

    updateUI = (cache, {data: addRecipe}) => {
        // console.log("Cache => ", cache)
        // console.log("Data => ", data)

        const {getAllRecipes} = cache.readQuery({query: FETCH_ALL_RECIPES })
    
        cache.writeQuery({
            query: FETCH_ALL_RECIPES, 
            data: {
                getAllRecipes: [...getAllRecipes, addRecipe]
            }
        })
    }

    clearState = () => {
        this.setState({
            form: {
                name: '',
                description: '',
                instructions: '',
                category: ''
            }
        })
    }

    render(){
        return (
            <div className="recipe-form container">
                <h1>Add Recipe</h1>
                <Mutation mutation={ADD_RECIPE} update={this.updateUI}>
                    {(addRecipe, {error}) => (
                        <>
                            {error && <Error errors={error.graphQLErrors} />}
                            <form className="form" onSubmit={(e) => this.handleSubmit(e, addRecipe)}>
                                <label htmlFor="name">Name</label>
                                <input name="name" type="text" value={this.state.form.name} id="name" placeholder="Enter name" onChange={this.handleInputChange}/>

                                <label htmlFor="description">Description</label>
                                <input name="description" type="description" value={this.state.form.description} id="description" placeholder="Enter description" onChange={this.handleInputChange}/>
                        
                                <label htmlFor="instructions">Instructions</label>
                                <input name="instructions" type="instructions" value={this.state.form.instructions} id="instructions" placeholder="Enter instructions" onChange={this.handleInputChange}/>
                        
                                <label htmlFor="category">Category</label>
                                <input name="category" type="category" value={this.state.form.category} id="category" placeholder="Enter category" onChange={this.handleInputChange}/>
                        
                                <button className="btn btn--primary" type="submit">Add recipe</button>
                            </form>
                        </>
                    )}
                </Mutation>
            </div>
        )
    }
}

export default withAuth(AddRecipe)