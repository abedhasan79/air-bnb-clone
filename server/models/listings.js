const mongoose = require("mongoose");
const {Schema} = mongoose;
const User = require("./user");


const listingSchema = new Schema({
    type:{
        type: String,
        required: true
    },
    
    title:{
        type: String,
        required: true,
        trim: true
    },

    description:{
        type: String,
        required: true
    },

    host:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    location:{
        type: String,
        required: true
    },

    pricePerNight:{
        type: Number,
        required: true
    },

    amenities:{
        type: [String],
        requried: true
    },

    images:{
        type: [String],
        required: true
    },

    reservations:{
        type: [Schema.Types.ObjectId],
        ref: "Reservation"
    },

    reviews:{
        type: [Schema.Types.ObjectId],
        ref:"Review"
    }
})

const Listings = mongoose.model('Listings', listingSchema);
module.exports = Listings;