import React from "react"

const SearchResult = ({data}) => {
    return (
        <>
        {
            data && (
                data.searchRecipe.length ? (
                    <div className="search__result-listing">
                        <p><strong>Results: {data.searchRecipe.length}</strong></p>
                        {data.searchRecipe.map(recipe => (
                            <div className={`search__result-item ${data.searchRecipe.length > 1 ? 'search__result-item--border' : ''}`}>
                                <h3>{recipe.name}</h3>
                                <span><b>Category:</b> {recipe.category}</span>
                                <p>{recipe.description}</p>
                                <p><b>Instructions:</b> {recipe.instructions}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>There are no recipes found</p>
                )
            )
        }
        </>
    )
}

export default SearchResult