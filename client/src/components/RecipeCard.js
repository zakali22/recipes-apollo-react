import React from "react"
import {Link} from "react-router-dom"
import PropTypes from "prop-types"

const RecipeCard = ({recipe, isSingle}) => (
    <Link to={`/recipes/${recipe._id}`} className={`recipe-card col-xs-12 col-md ${isSingle ? 'recipe-card--single' : ''}`}>
        <div className="recipe-card__bg" style={{backgroundImage: `url(${recipe.imageUrl})`}}></div>
        <span className={`recipe-category ${recipe.category}`}>{recipe.category}</span>
        <div className="recipe-card__details">
            <h3 className="recipe-card__details-name">{recipe.name}</h3>
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