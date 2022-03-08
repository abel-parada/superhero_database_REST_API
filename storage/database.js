'use strict';

const mariadb = require('mariadb');

module.exports = class Database{
    constructor(options){
        this.options = options;
        this.options.allowPublicKeyRetrieval=true; // for mysql users
    }

    //now I create the method to do queries

    doQuery(sql,parameters){
        return new Promise (async (resolve,reject) => {
            let connection;
            try{
                connection = await mariadb.createConnection(this.options);
                let queryResult = await connection.query(sql,parameters);
                if(typeof queryResult === 'undefined'){
                    reject('QueryError');
                }
                else if (typeof queryResult.affectedRows === 'undefined'){
                    delete queryResult.meta;
                    resolve({queryResult,resulSet:true})
                }
                else {
                    resolve({
                        queryResult:{
                            rowsChanged:queryResult.affectedRows,
                            insertId: queryResult.insertId,
                            status: queryResult.warningStatus
                        },
                        resulSet: false
                    });
                }
            }
            catch(error){
                reject('SQL-error'+error);
            }
            finally{
                if(connection) connection.end()
            }
        });
    };
};