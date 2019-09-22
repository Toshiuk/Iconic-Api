const userController = require( "../../controllers/user" );

const express = require( "express" );
const router = express.Router();
router.use( "/users", userController );
module.exports = router;