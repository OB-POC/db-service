const path = require('path');
const fs = require('fs');
const {
  statusLogger
} = require('./loggers');

const mockServer = require('./core');

let welcome = () => {
    let motdFile = path.resolve(__dirname, '.db-service.motd');
    const fs = require('fs');
    if (fs.existsSync(motdFile)) {
        let msg = fs.readFileSync(motdFile, 'utf-8');
        process.stdout.write('\n' + msg + '\n');
    } else {
        process.stdout.write('\n=========== Mock DB service ===========\n');
    }
}



let initLog = () => {
    let logDirectory = path.join(__dirname, './', 'log');

    // ensure log directory exists
    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
}

let startServer = () => {
    try {
        welcome();
        initLog();
        mockServer();
    } catch (err) {
        statusLogger.error(`Caught error in running DB service: ${err}`);
    }
};

startServer();

process.on('uncaughtException', function(err) {
    console.log('!!!!!!!!!!!!!!!!!!!!!! uncaughtException !!!!!!!!!!!!!!!!!!!');
    console.log(err);
});