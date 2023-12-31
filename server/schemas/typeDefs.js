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
        reservations: [Reservation]
        reviews:[Review]
    }

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
        reservations: [Reservation]
        reviews:[Review]
    }

    type Reservation{
        _id: ID
        listing: Listings
        guest: User
        checkInDate: String
        checkOutDate: String
        status: String
    }

    type Review{
        _id:ID
        listing: Listings
        guest: User
        rating: Int
        comment: String
    }

    type Query{
        users: [User]
        user: User

        listings: [Listings]
        listing(_id:ID!): Listings
        listingsArray(_id:[ID]!): [Listings]

        reservations:[Reservation]
        reservation(_id: ID!): Reservation
        reservationsArray(_id: [ID]!): [Reservation]

        reviews: [Review]
        review(_id:ID!): Review
        reviewsArray(_id:[ID]!): [Review]
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

        makeReservation(listing:ID!, checkInDate:String!, checkOutDate:String!): Reservation
        updateReservationStatus(_id:ID! ,status:String!): Reservation

        addReview(listing:ID!, rating: Int!, comment: String!): Review
    }
`
module.exports = typeDefs;