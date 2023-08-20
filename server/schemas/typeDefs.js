const {gql} = require("apollo-server-express");

const typeDefs = gql`

    type User{
        _id:ID
        firstName:String
        lastName: String
        email: String
        password: String
        isHost: Boolean
        listings:[Listings]
    },

    type Listings{
        _id:ID
        type: String
        title: String
        description: String
        host: User
        location: String
        pricePerNight: Float
        amenities: [String]
        images: [String]
    }

    type Query{
        users: [User]
        user: User
        listings: [Listings]
        listing(_id:ID!): Listings
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

        addListing(type:String!, title: String!, description: String!, location: String!, pricePerNight: Float!,amenities:[String]!, images:[String]!): Listings
        deleteListing(_id:ID!): Listings
        updateListingDescription(_id:ID!, description: String!): Listings
        updateListingPricePerNight(_id:ID!, pricePerNight: Float!): Listings
        updateListingAmenities(_id:ID!, amenities:[String]!): Listings
        updateListingImage(_id:ID!, images:[String]!): Listings
        addListingImage(_id:ID!, images:[String]!): Listings
    }
`
module.exports = typeDefs;