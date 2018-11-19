const log4js = require('log4js');
const cmdLog4jConfig = require('./log4js.config');

const cmdLog4js = log4js.configure(cmdLog4jConfig);

let date = new Date();
let fileName = `${date.getDate()}_${date.getMonth()+1}_${date.getFullYear()}_${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}`;

const statusLogger = cmdLog4js.getLogger(`statusLog_${fileName}`);

module.exports = {
    statusLogger
}