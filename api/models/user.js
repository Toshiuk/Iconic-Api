const mongoose = require( "mongoose" );
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const User = new Schema({
    info: {
        username: {
            type: String,
            required: [ true, "username is required" ],
            unique: true,
            sparse: true
        },
        address: { type: String },
        birthdate: { type: Date },
        document: {
            type: String,
            required: [ true, "document is required" ],
            unique: true,
            sparse: true
        },
        email: {
            type: String,
            required: [ true, "email is required" ],
            unique: true,
            sparse: true
        },
        firstname: {
            type: String,
            required: [ true, "firstname is required" ]
        },
        lastname: {
            type: String,
            required: [ true, "lastname is required" ]
        },
        phone: {
            type: String,
            required: [ true, "phone is required" ],
            unique: true,
            sparse: true
        },
    }
}, {
    timestamps: true
});

User.plugin( uniqueValidator );

module.exports = mongoose.model( "User", User );