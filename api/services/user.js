const User = require( "../models/user" );

const getUsers = async ( req, res ) => {
    try {

        const users = await User.find({});

        if ( users.length > 0 ) {
            return res.status( 200 ).json({
                "message": "users fetched successfully",
                "data": users
            });
        }

        return res.status( 404 ).json({
            "code": "BAD_REQUEST_ERROR",
            "description": "No users found in the system"
        });
    } catch ( error ) {
        return res.status( 500 ).json({
            "code": "SERVER_ERROR",
            "description": "something went wrong, Please try again"
        });
    }
};

const getUserById = async ( req, res ) => {
    try {
        const user = await User.findById( req.params.id );
        if ( user ) {
            return res.status( 200 ).json({
                "message": `user with id ${ req.params.id } fetched successfully`,
                "data": user
            });
        }

        return res.status( 404 ).json({
            "code": "BAD_REQUEST_ERROR",
            "description": "No users found in the system"
        });

    } catch ( error ) {

        return res.status( 500 ).json({
            "code": "SERVER_ERROR",
            "description": "something went wrong, Please try again"
        });
    }
};

const createUser = async ( req, res ) => {
    try {
        const info = req.body;
        const newUser = await User.create( info );

        if ( newUser ) {
            return res.status( 201 ).json({
                "message": "user created successfully",
                "data": newUser
            });
        }

        throw new Error( "something went worng" );

    } catch ( error ) {
        if ( error.message ) {
            return res.status( 422 ).json({
                "code": "SERVER_ERROR",
                "description": error.message
            });
        }
        return res.status( 500 ).json({
            "code": "SERVER_ERROR",
            "description": "something went wrong, Please try again"
        });
    }
};

const updateUser = async ( req, res ) => {
    try {
        const userId = req.params.id;

        const info = req.body;

        const user = await User.findById( userId );

        if ( !user ) {
            return res.status( 404 ).json({
                "code": "BAD_REQUEST_ERROR",
                "description": "No user found in the system"
            });
        }

        const completeInfo = { info: { ...user.info, ...info.info } };

        const updateUser = await User.findByIdAndUpdate( userId, { $set: completeInfo }, {
            new: true
        });

        if ( updateUser ) {
            return res.status( 200 ).json({
                "message": "user updated successfully",
                "data": updateUser
            });
        }
        throw new Error( "something went worng" );

    } catch ( error ) {
        if ( error.message ) {
            return res.status( 422 ).json({
                "code": "SERVER_ERROR",
                "description": error.message
            });
        }
        return res.status( 500 ).json({
            "code": "SERVER_ERROR",
            "description": "something went wrong, Please try again"
        });
    }
};

const deleteUser = async ( req, res ) => {
    try {
        const user = await User.findByIdAndRemove( req.params.id );
        if ( user ) {
            return res.status( 204 ).json({
                "message": `user with id ${ req.params.id } deleted successfully`
            });
        }

        return res.status( 404 ).json({
            "code": "BAD_REQUEST_ERROR",
            "description": "No users found in the system"
        });

    } catch ( error ) {
        return res.status( 500 ).json({
            "code": "SERVER_ERROR",
            "description": "something went wrong, Please try again"
        });
    }
};

module.exports = {
    getUsers: getUsers,
    getUserById: getUserById,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser
};