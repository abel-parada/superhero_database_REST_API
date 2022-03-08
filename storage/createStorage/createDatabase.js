'use strict';

const Database = require('../database')

const database = require('mime-db');
let createStatementFile = require('./createStatemens.json');
const { table } = require('console');

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

    const DEBUG = createStatements.debug; // why?
    const db = new Database(options);

    //for simplicity I allocate the 'user'@'localhost' to a constant
    const user = `'${createStatements.user}'@'${createStatements.host}'`;

    //now I allocate the sql commands to constants
    const dropDatabaseSql = `drop database if exists ${createStatements.database}`;
    const createDatabaseSql = `create database ${createStatements.database}`;
    const dropUserSql = `drop user if exists ${user}`;
    const createUserSql = `create user ${user} identified by '${createStatements.userpassword}'`;
    const grantPrivilegesSql = `grant all privileges on ${createStatements.database}.* to ${user}`;

    try{
        await db.doQuery(dropDatabaseSql);
        if(DEBUG) {printStatement(dropDatabaseSql);}

        await db.doQuery(createDatabaseSql);
        if(DEBUG){printStatement(createDatabaseSql);}

        await db.doQuery(dropUserSql);
        if(DEBUG) {printStatement(dropUserSql)}

        await db.doQuery(createUserSql);
        if(DEBUG) {printStatement(createUserSql)};

        await db.doQuery(grantPrivilegesSql);
        if(DEBUG){printStatement(grantPrivilegesSql)};
        //now we create the tables in the createStatemetns.json, in this case 1 (superhero)
        for(let table of createStatements.tables){
            if(table.columns && table.columns.length > 0){
                const createTableSql=
                `create table ${createStatements.database}.${table.tableName}(`+
                `\n\t${table.columns.join(',\n\t')}`+
                ')';

                await db.doQuery(createTableSql);
                if(DEBUG) printStatement(createTableSql)

                if(table.data && table.data.length>0){
                    const rows=[];
                    for(let datum of table.data){
                        const insertSql = `insert into ${createStatements.database}.${table.tableName} `+`
                        values(${Array(datum.length).fill('?').join(',')})`;
                        rows.push(db.doQuery(insertSql,datum))
                    }
                    await Promise.all(rows);
                    if(DEBUG) printMessage('data added');
                }
                else {
                    if(DEBUG) printMessage('data missing');
                }
            }
            else {
                if (DEBUG) printMessage('Table columns missing. Table was not created');
            }
        }
    }
    catch(error){
        printError(error.message);
    }

}