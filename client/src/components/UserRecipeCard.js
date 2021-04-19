import React from "react"
import {Link} from "react-router-dom"
import {Mutation} from "react-apollo"
import DELETE_USER_RECIPE from "../mutations/deleteUserRecipe"
import PropTypes from "prop-types"
import {ReactComponent as Edit} from "../assets/edit-regular.svg"
import {ReactComponent as Delete} from "../assets/trash-solid.svg"

const RecipeCard = ({recipe, isSingle, handleDelete, getCurrentUserRecipes}) => (
    <Link to={`/recipes/${recipe._id}`} className={`recipe-card col-xs-12 col-md ${isSingle ? 'recipe-card--single' : ''}`}>
        <div className="recipe-card__bg" style={{backgroundImage: `url(${recipe.imageUrl})`}}></div>
        <span className={`recipe-category ${recipe.category}`}>{recipe.category}</span>
        <div className="recipe-card__details">
            <h3 className="recipe-card__details-name">{recipe.name}</h3>
        </div>
        <div className="recipe-card__control">
            <Edit />
            <Mutation mutation={DELETE_USER_RECIPE}>
                {(deleteUserRecipe, {data}) => (
                    <Delete onClick={e => handleDelete(e, deleteUserRecipe, recipe._id, getCurrentUserRecipes)} />
                )}
            </Mutation>
        </div>
        <div className="recipe-card__overlay"></div>
    </Link>
)

RecipeCard.defaultProps = {
    isSingle: false
}

RecipeCard.propTypes = {
    recipe: PropTypes.object.isRequired,
    isSingle: PropTypes.bool
}

export default RecipeCard