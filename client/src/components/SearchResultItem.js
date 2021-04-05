import React from "react"
import {Link} from "react-router-dom"

const SearchResultItem = ({recipe, result = []}) => (
    <Link to={`/recipes/${recipe._id}`} className={`search__result-item ${result.length > 1 ? 'search__result-item--border' : ''}`}>
        <h3>{recipe.name}</h3>
        <span><b>Category:</b> {recipe.category}</span>
        <p>{recipe.description}</p>
    </Link>
)

export default SearchResultItem