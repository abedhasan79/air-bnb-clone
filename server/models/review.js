const mongoose = require("mongoose");
const {Schema} = mongoose;

const reviewSchema = new Schema({
    listing:{
        type: Schema.Types.ObjectId,
        ref: "Listings",
        required: true
    },

    guest:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    rating:{
        type: Number,
        required: true,
    },

    comment:{
        type: String,
        required: true
    }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;