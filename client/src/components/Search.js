import React, {Component} from "react"
import {Mutation} from "react-apollo"
import SEARCH_RECIPE from "../mutations/search"
import SearchResult from "./SearchResult"

class Search extends Component {
    state = {
        searchTerm: ''
    }

    handleInput = e => {
        this.setState({
            searchTerm: e.target.value
        })
    }

    handleSearch = (e, searchRecipeFunc) => {
        e.preventDefault();
        searchRecipeFunc({
            variables: {
                searchTerm: this.state.searchTerm
            }
        }).then(res => {
            console.log(res)
        }).catch(e => {
            console.log(e)
        })
    }

    render(){
        return (
            <Mutation mutation={SEARCH_RECIPE}>
                {(searchRecipe, {data}) => (
                    <div className="search container">
                        <h1>Search recipes</h1>
                        <form className="form form-search" onSubmit={e => this.handleSearch(e, searchRecipe)}>
                            <input type="text" name="searchTerm" placeholder="Search recipes" value={this.state.searchTerm} onChange={this.handleInput}/>
                            <button type="submit" className="btn btn--secondary">Search</button>
                        </form>
                        <SearchResult data={data}/>
                    </div>
                )}
            </Mutation>
        )
    }
}

export default Search