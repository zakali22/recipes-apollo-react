const express = require("express")
const app = express();
const mongoose = require("mongoose")
const db = mongoose.connection;
const bodyParser = require("body-parser")
require("dotenv").config({path: '.env'})
const PORT = process.env.PORT || 4000;

// Import Schema in order to connect to Graphql
const Recipe = require("./models/RecipeSchema")
const User = require("./models/UserSchema")

const {typeDefs} = require("./typeDefs")
const {resolvers} = require("./resolvers")

// Import Graphql related packages from apollo-server-express, graphql-tools 
const {graphiqlExpress, graphqlExpress} = require("apollo-server-express") // Each will be used as middlewares for different routes
const {makeExecutableSchema} = require("graphql-tools") // In order to unify our graphql schemas: typeDefs and resolvers

// Unify mongoose schemas
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

// Define the different middlewares and connect to graphiql and graphql
app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql' // Basically reroutes to /graphql
}))

app.use('/graphql', bodyParser.json(), graphqlExpress({
    schema, 
    context: { // The context object passed to each resolver
        Recipe,
        User
    }
}))

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    app.listen(PORT, () => {
        console.log(`Successfully connected to database, listening on PORT http://localhost:${PORT}`)
    })
});