const {gql} = require("apollo-server-express");

const typeDefs = gql`

    type User{
        _id:ID
        firstName:String
        lastName: String
        email: String
        password: String
        isHost: Boolean
    },

    type Query{
        users: [User]
        user: User
    }

    type Auth {
        token: ID
        user: User
    }

    type Mutation{
        addUser(firstName:String!, lastName:String!, email:String!, password:String!): Auth
        deleteUser:User
        updateUserName(firstName:String, lastName:String):User
        updateUserEmail(email:String!):User
        updateUserPassword(password:String!):User
        updateHostStatus(isHost:Boolean!): User
        login(email:String!, password:String!): Auth
    }
`
module.exports = typeDefs;