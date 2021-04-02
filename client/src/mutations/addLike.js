import {gql} from "apollo-boost"

export default gql`
    mutation addLike($recipeId: ID){
        addLike(recipeId: {_id: $recipeId}){
            _id
            username
            email
            password
            favourites {
                _id
                name
                description
                likes
            }
        }
    }
`