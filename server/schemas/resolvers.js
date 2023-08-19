const { ObjectId } = require("mongodb");
const {User} = require("../models");

const bcrypt = require('bcrypt');

const resolvers = {
    Query:{
        user: async (parent, args )=>{
            return await User.find();
        }
    },

    Muatation:{
        addUser: async (parent, args)=>{
            const user = await User.create(args);
            return user;
        },

        deleteUser: async (parent, {_id}) => {
            return await User.findByIdAndDelete(_id);
        },

        updateUserName: async (parent, {_id, firstName, lastName})=>{
            return await User.findByIdAndUpdate({_id},{firstName,lastName},{new:true});
        },
    }
}