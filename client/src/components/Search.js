import React, {Component} from "react"
import {ApolloConsumer} from "react-apollo"
import SEARCH_RECIPE from "../queries/search"
import SearchResult from "./SearchResult"

class Search extends Component {
    state = {
        searchTerm: '',
        searchResult: []
    }

    handleInput = (e, client) => {
        this.setState({
            searchTerm: e.target.value
        }, async () => {
            const {data: {searchRecipe}} = await client.query({
                query: SEARCH_RECIPE,
                variables: {
                    searchTerm: this.state.searchTerm
                }
            })
            console.log(searchRecipe)
            this.updateResult(searchRecipe)
        })
    }

    updateResult = result => {
        this.setState({
            searchResult: result
        })
    }

    handleSearch = (e, client) => {
        e.preventDefault();
        // searchRecipeFunc({
        //     variables: {
        //         searchTerm: this.state.searchTerm
        //     }
        // }).then(res => {
        //     console.log(res)
        // }).catch(e => {
        //     console.log(e)
        // })
    }

    render(){
        return (
            <ApolloConsumer>
                {(client) => (
                    <div className="search container">
                        <h1>Search recipes</h1>
                        <form className="form form-search" onSubmit={e => this.handleSearch(e, client)}>
                            <input type="text" name="searchTerm" placeholder="Search recipes" value={this.state.searchTerm} onChange={e => this.handleInput(e, client)}/>
                            <button type="submit" className="btn btn--secondary">Search</button>
                        </form>
                        <SearchResult data={this.state.searchResult}/>
                    </div>
                )}
            </ApolloConsumer>
        )
    }
}

export default Search