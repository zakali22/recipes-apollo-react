import React from "react"
import {Link} from "react-router-dom"

const SearchResultItem = ({recipe, result = []}) => (
    <Link to={`/recipes/${recipe._id}`} className={`recipe-card col-xs-12 col-md ${result.length > 1 ? 'search__result-item--border' : ''}`}>
        <div className="recipe-card__bg" style={{backgroundImage: `url(${recipe.imageUrl})`}}></div>
        <span className={`recipe-category ${recipe.category}`}>{recipe.category}</span>
        <div className="recipe-card__details">
            <h3 className="recipe-card__details-name">{recipe.name}</h3>
        </div>
        <div className="recipe-card__overlay"></div>
    </Link>
)

export default SearchResultItem