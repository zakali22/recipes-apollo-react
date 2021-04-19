import React from "react"
import {Link} from "react-router-dom"
import RecipeCard from "./RecipeCard"

const SearchResultItem = ({recipe, result = []}) => (
    // <Link to={`/recipes/${recipe._id}`} className={`recipe-card col-xs-12 col-md ${result.length === 1 ? 'recipe-card--single' : ''}`}>
        <RecipeCard recipe={recipe} isSingle={result.length === 1}/>
    // </Link>
)

export default SearchResultItem