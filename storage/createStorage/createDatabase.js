'use strict';

const Database = require('../database')

const database = require('mime-db');
let createStatementFile = require('./createStatemens.json')

//helper functions for later
const printMessage = message => console.log(message);
const printStatement = statement => printMessage(`${statement}`);
const printError = message => {
    printMessage(`\n${'#'.repeat(20)} Error ${'#'.repeat(20)}\n${message}\n${'#'.repeat(47)}`);
}
// this is unnecesary for our project. Try erasing it.
// if(process.argv.length>2){
//     createStatementFile = `./${process.argv[2]}`;
// }

try{
    createDb(createStatementFile)
}
catch(error){
    printError(error.message);
}

async function createDb(createStatements){
//    console.log(JSON.stringify(createStatements,null,2))
    
    const options = {
        host:createStatements.host,
        port:createStatements.port,
        user:createStatements.admin,
        password:createStatements.adminpassword
    };

    const DEBUG = createStatements.debug;
    const db = new Database(options);

    //for simplicity I allocate the 'user'@'localhost' to a constant
    const user = `'${createStatements.user}'@'${createStatements.host}'`;

    //now I allocate the sql commands to constants
    const dropDatabaseSql = `drop database if exists ${createStatements.database}`;
    const createDatabaseSql = `create database ${createStatements.database}`;
    const dropUserSql = `drop user if exists ${createStatements.user}`;
    const createUser = `create user ${user} identified by '${createStatements.userpassword}'`;
    const grantPrivilegesSql = `grant all privileges on ${createStatements.database}.* to ${user}`;

}

createDb(createStatementFile);