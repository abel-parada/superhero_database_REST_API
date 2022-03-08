'use strict';

const {MESSAGES,CODES} = require('./statusCodes');

const Database = require('./database');

const options = require('./databaseOptions.json');

const sql = require('./sqlStatements.json');

const {toArrayInsert, toArrayUpdate} = require('./parameters');

const getAllSql = sql.getAll.join(',');
const getSql = sql.get.join(' ');
const insertSql = sql.insert.join(' ');
const updateSql = sql.update.join(' ');
const removeSql = sql.remove.join(' ');
const PRIMARY_KEY = sql.primaryKey;

class Datastorage {
    constructor(){
        this.db = new Database(options);
    }

    get CODES(){
        return CODES;
    }

    getAll(){
        return new Promise ( async (resolve, reject) =>{
            try{
                const result = await this.db.doQuery(getAllSql)
                resolve(result.queryResult)
            }
            catch(error){
                console.log(error);
                reject(MESSAGES.PROGRAM_ERROR());
            };
        });
    }; //ends getAll()

    get(key) {
        return new Promise( async (resolve,reject)=>{
            try{
                const result = await this.db.doQuery(getSql, [key]);
                if(result.queryResult.length>0){
                    resolve(result.queryResult[0]);
                }
                else{
                    resolve(MESSAGES.NOT_FOUND(PRIMARY_KEY, key));
                }
            }
            catch(err){
                reject(MESSAGES.PROGRAM_ERROR())
            }
        })
    }

    insert(resource){
        return new Promise( async (resolve,reject)=>{
            try{
                await this.db.doQuery(insertSql,toArrayInsert(resource));
                resolve(MESSAGES.INSERT_OK(PRIMARY_KEY, resource[PRIMARY_KEY]));
            }
            catch(err){
                console.log(err);
                reject(MESSAGES.NOT_INSERTED());
            }
        });
    } //end of insert
}

const variable = new Datastorage();

const newSuperHero = {
    heroID: 3,
    name:'IronMan',
    strength: 'none',
    superproperty: 'rahaa',
    yearOfBirth: 1965

}

variable.getAll().then(console.log).catch(console.log);
// variable.insert(newSuperHero).then(console.log).catch(console.log);