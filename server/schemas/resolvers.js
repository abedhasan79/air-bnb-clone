const { ObjectId } = require("mongodb");
const { User, Listings } = require("../models");
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require("../utils/auth");

const bcrypt = require('bcrypt');

const resolvers = {
    Query: {
        users: async (parent, args) => {
            return await User.find({});
        },

        user: async (parent, args, context) => {
            if (context.user) {
                return await User.findById(context.user._id);
            }
        },

        listings: async (parent, args) => {
            return await Listings.find();
        },

        listing: async (parent, { _id }) => {
            return await Listings.findById(_id);
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { user, token };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            // console.log(user)
            if (!user) {
                throw new AuthenticationError("Email or Password does not match");
            }

            const correctPassword = await user.isCorrectPassword(password);
            // console.log(correctPassword);

            if (!correctPassword) {
                throw new AuthenticationError("Email or Password does not match");
            }

            const token = signToken(user);
            return { user, token }
        },

        deleteUser: async (parent, args, context) => {
            return await User.findByIdAndDelete(context.user._id);
        },

        updateUserName: async (parent, { firstName, lastName }, context) => {
            return await User.findByIdAndUpdate(context.user._id, {
                $set: { firstName: firstName, lastName: lastName }
            }, { new: true });
        },

        updateUserEmail: async (parent, { email }, context) => {
            return await User.findByIdAndUpdate(context.user._id, { $set: { email: email } }, { new: true });
        },

        updateUserPassword: async (parent, { password }, context) => {
            const hashedPassword = await bcrypt.hash(password, 10);
            password = hashedPassword;

            return await User.findByIdAndUpdate(context.user._id, { $set: { password: password } }, { new: true });
        },

        updateHostStatus: async (parent, { isHost }, context) => {
            return await User.findByIdAndUpdate(context.user._id, { $set: { isHost: isHost } }, { new: true });
        },

        addListing: async (parent, args, context) => {
            if (context.user.isHost) {
                args.host = context.user._id;
                const newListing = await Listings.create(args);
                await User.findByIdAndUpdate(context.user._id, {
                    $push: { listings: newListing._id }
                });

                return newListing;
            }
        },

        deleteListing: async (parent, { _id }, context) => {
            if (context.user.isHost) {
                const deleteListing = await Listings.findByIdAndDelete({ _id });
                // console.log(deleteListing)
                await User.findByIdAndUpdate(context.user._id, {
                    $pull: { listings: _id }
                });

                return deleteListing;
            }
        },

        updateListingDescription: async (parent, { _id, description }, context) => {
            if (context.user.isHost) {
                return await Listings.findByIdAndUpdate(_id, {
                    $set: { description: description }
                }, { new: true })
            }
        },

        updateListingPricePerNight: async (parent, { _id, pricePerNight }, context) => {
            if (context.user.isHost) {
                const updatePrice = await Listings.findByIdAndUpdate(_id, {
                    $set: { pricePerNight: pricePerNight }
                }, { new: true });

                // console.log(updatePrice);
                return updatePrice;
            }
        },

        updateListingAmenities: async (parent, { _id, amenities }, context) => {
            if (context.user.isHost) {
                return await Listings.findByIdAndUpdate(_id, {
                    $set: { amenities: amenities }
                }, { new: true })
            }
        },

        updateListingImage: async (parent, { _id, images }, context) => {
            if (context.user.isHost) {
                return await Listings.findByIdAndUpdate(_id, {
                    $set: { images: images }
                }, { new: true })
            }
        },

        addListingImage: async (parent, { _id, images }, context) => {
            if (context.user.isHost) {
                return await Listings.findByIdAndUpdate(_id, {
                    $push: { images: images }
                }, { new: true })
            }
        }
    }
}

module.exports = resolvers;