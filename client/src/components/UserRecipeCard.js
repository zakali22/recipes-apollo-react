import React from "react"
import {Link} from "react-router-dom"
import {Mutation} from "react-apollo"
import DELETE_USER_RECIPE from "../mutations/deleteUserRecipe"
import EDIT_USER_RECIPE from "../mutations/editUserRecipe"
import PropTypes from "prop-types"
import {ReactComponent as Edit} from "../assets/edit-regular.svg"
import {ReactComponent as Delete} from "../assets/trash-solid.svg"

const INITIAL_VALUES = {
    name: '',
    imageUrl: '',
    description: '',
    instructions: '',
    category: ''
}

const RecipeCard = ({recipe, isSingle, handleDelete, handleEdit, getCurrentUserRecipes}) => {
    const [isEdit, setIsEdit] = React.useState(false)
    const [form, setForm] = React.useState(INITIAL_VALUES)

    const handleInputChange = (e) => {
        setForm(form => ({
            ...form, 
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e, editUserRecipe) => {
        e.preventDefault();

        handleEdit(e, editUserRecipe, recipe._id, form, getCurrentUserRecipes)
    }

    const openModal = e => {
        e.preventDefault();
        setIsEdit(true)
    }

    if(isEdit){
        return (
            <div className="recipe-modal modal">
                <Mutation mutation={EDIT_USER_RECIPE}>
                {(editUserRecipe, {data}) => (
                    <form className="form" onSubmit={(e) => handleSubmit(e, editUserRecipe)}>
                        <label htmlFor="name">Name</label>
                        <input name="name" type="text" value={form.name} id="name" placeholder="Enter name" onChange={handleInputChange}/>

                        <label htmlFor="imageUrl">Image URL</label>
                        <input name="imageUrl" type="text" value={form.imageUrl} id="imageUrl" placeholder="Enter image URL" onChange={handleInputChange}/>

                        <label htmlFor="description">Description</label>
                        <input name="description" type="text" value={form.description} id="description" placeholder="Enter description" onChange={handleInputChange}/>
                
                        <label htmlFor="instructions">Instructions</label>
                        <input name="instructions" type="text" value={form.instructions} id="instructions" placeholder="Enter instructions" onChange={handleInputChange}/>
                
                        <label htmlFor="category">Category</label>
                        <select onChange={handleInputChange} name="category">
                            <option value="" selected hidden disabled>Select a category</option>
                            <option value="snack">Snack</option>
                            <option value="lunch">Lunch</option>
                            <option value="dinner">Dinner</option>
                            <option value="dessert">Dessert</option>
                        </select>

                        <button className="btn btn--primary" type="submit">Add recipe</button>
                    </form>
                )}
                </Mutation>
            </div>
        )
    }

    return (
        <Link to={`/recipes/${recipe._id}`} className={`recipe-card col-xs-12 col-md ${isSingle ? 'recipe-card--single' : ''}`}>
            <div className="recipe-card__bg" style={{backgroundImage: `url(${recipe.imageUrl})`}}></div>
            <span className={`recipe-category ${recipe.category}`}>{recipe.category}</span>
            <div className="recipe-card__details">
                <h3 className="recipe-card__details-name">{recipe.name}</h3>
            </div>
            <div className="recipe-card__control">
                <Edit onClick={openModal}/>
                <Mutation mutation={DELETE_USER_RECIPE}>
                    {(deleteUserRecipe, {data}) => (
                        <Delete onClick={e => handleDelete(e, deleteUserRecipe, recipe._id, getCurrentUserRecipes)} />
                    )}
                </Mutation>
            </div>
            <div className="recipe-card__overlay"></div>
        </Link>
    )
}

RecipeCard.defaultProps = {
    isSingle: false
}

RecipeCard.propTypes = {
    recipe: PropTypes.object.isRequired,
    isSingle: PropTypes.bool
}

export default RecipeCard