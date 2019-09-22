const server = require( "./configs/app" )();
const config = require( "./configs/config" );
const db = require( "./configs/db" );

server.create( config, db );

server.start();