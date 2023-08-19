const gql = require("apollo-server-express");

const typeDefs = gql`

    type User{
        _id:ID
        firstName:String
        lastName: String
        email: String
        password: String
    },

    type Query{
        user: User
    }


    type Mutation{
        addUser(firstName:String!, lastName:String!, email:String!, password:String!): User
        deleteUser(_id:ID):User
        updateUserName(firstName:String, lastName:String):User
        updateUserEmail(email:String):User
        updateUserPassword(password:String):User
    }
`
module.exports = typeDefs;