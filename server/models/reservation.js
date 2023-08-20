const mongoose = require("mongoose");
const {Schema} = mongoose;
const User = require("./user");
const Listings = require("./listings");

const reservationSchema = new Schema({
    listing:{
        type: Schema.Types.ObjectId,
        ref: 'Listings',
        required: true
    },

    guest:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    checkInDate:{
        type: String,
        required: true
    },

    checkOutDate:{
        type: String,
        required: true
    },

    status:{
        type: String,
        default: "pending"
    }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;