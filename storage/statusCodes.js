'use strict';

const CODES = {
    PROGRAM_ERROR:0,
    NOT_FOUND:1,
    INSERT_OK:2,
    NOT_INSERTED:3,
    ALREADY_IN_USE:4,
    DELETE_OK:5,
    NOT_DELETED:6,
    UPDATE_OK:7,
    NOT_UPDATED:8,
    KEYS_DO_NOT_MATCH:9
};

const TYPES = {
    ERROR: 'error',
    INFO: 'info'
}

const MESSAGES = {
    PROGRAM_ERROR: ()=>({
        message: 'Opps, it is not you, it is me. Error in the program',
        code: CODES.PROGRAM_ERROR,
        type: TYPES.ERROR
    }),
    NOT_FOUND:(key,value)=>({
        message:`Not resource found with ${key} ${value}`,
        code: CODES.NOT_FOUND,
        type:TYPES.INFO
    }),
    INSERT_OK:(key,value)=>({
        message:`Resource with ${key}${value} properly inserted`,
        code:CODES.INSERT_OK,
        type:TYPES.INFO
    }),
    NOT_INSERTED: ()=>({
        message:'Resource not inserted',
        code:CODES.NOT_INSERTED,
        type:TYPES.ERROR
    }),
    ALREADY_IN_USE: (key,value) =>({
        message: `Resource with ${key} ${value} already in use`,
        code:CODES.ALREADY_IN_USE,
        type:TYPES.ERROR
    }),
    DELETE_OK:(key,value)=>({
        message:`Resource with ${key}${value} deleted`,
        code:CODES.DELETE_OK,
        type:TYPES.INFO
    }),
    NOT_DELETED:(key,value)=>({
        message:`Resource with ${key}${value} not deleted`,
        code:CODES.NOT_DELETED,
        type:TYPES.INFO
    }),
    UPDATE_OK:(key,value)=>({
        message:`Resource with ${key}${value} updated`,
        code:CODES.UPDATE_OK,
        type:TYPES.INFO
    }),
    NOT_UPDATED:()=>({
        message:`Resource not updated`,
        code:CODES.NOT_UPDATED,
        type:TYPES.INFO
    }),
    KEYS_DO_NOT_MATCH:(keyValue,KeyValueInResource)=>({
        message:`The key ${keyValueInResource} of given resource `+
        `is not the same as the given key ${keyValue}`,
        code:CODES.KEYS_DO_NOT_MATCH,
        type:TYPES.ERROR
    })
};

module.exports = {MESSAGES,CODES};