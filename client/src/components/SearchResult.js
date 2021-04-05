import React from "react"
import {Query} from "react-apollo"
import FETCH_ALL_RECIPES from "../queries/fetchAllRecipes"
import SearchResultItem from "./SearchResultItem"

const SearchResult = ({result}) => {
    return (
        <Query query={FETCH_ALL_RECIPES}>
        {({data, loading}) => {
            if(loading) return <p>Loading</p>

            const {getAllRecipes} = data
            return (
                <>
                {
                    result && (
                        result.length ? (
                            <div className="search__result-listing">
                                <p><strong>Results: {result.length}</strong></p>
                                {result.map(recipe => (
                                    <SearchResultItem key={recipe._id} recipe={recipe} result={result}/>
                                ))}
                            </div>
                        ) : (
                            <div className="search__result-listing">
                            {getAllRecipes.map(recipe => (
                                <SearchResultItem key={recipe._id} recipe={recipe} result={getAllRecipes}/>
                            ))}
                            </div>
                        )
                    )
                }
                </>
            )
        }}
        </Query>
    )
}

export default SearchResult