const { ObjectId } = require("mongodb");
const { User } = require("../models");
const { AuthenticationError } = require('apollo-server-express');
const {signToken} = require("../utils/auth");

const bcrypt = require('bcrypt');

const resolvers = {
    Query: {
        users: async (parent, args) => {
            return await User.find({});
        },

        user: async (parent, args, context) => {
            if(context.user){
                return await User.findById(context.user._id);
            }
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return {user, token};
        },

        login: async (parent, {email, password})=>{
            const user = await User.findOne({email});
            // console.log(user)
            if(!user){
                throw new AuthenticationError("Email or Password does not match");
            }

            const correctPassword = await user.isCorrectPassword(password);
            // console.log(correctPassword);

            if(!correctPassword){
                throw new AuthenticationError("Email or Password does not match");
            }

            const token = signToken(user);
            return {user, token}
        },

        deleteUser: async (parent, args, context) => {
            return await User.findByIdAndDelete(context.user._id);
        },

        updateUserName: async (parent, { firstName, lastName }, context) => {
            return await User.findByIdAndUpdate( context.user._id , { 
                $set:{firstName:firstName, lastName:lastName}
             }, { new: true });
        },

        updateUserEmail: async (parent, args, context) => {
            return await User.findByIdAndUpdate( context.user._id , args , { new: true });
        },

        updateUserPassword: async (parent, { password }, context) => {
            const hashedPassword = await bcrypt.hash(password, 10);
            password = hashedPassword;

            return await User.findByIdAndUpdate(context.user._id, {$set:{password:password}}, { new: true });
        }
    }
}

module.exports =resolvers;