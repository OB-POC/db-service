module.exports = {
    "appenders": {
        "logFile": {
            "type": "multiFile",
            "base": 'log/',
            "property": 'categoryName',
            "extension": '.log',
            "keepFileExt": true,
            "maxLogSize": 1048576000,
            "backups": 100,
            "compress": true
        },
        "out": {
            "type": "stdout",
            "layout": {
                "type": "colored"
            }
        }
    },
    "categories": {
        "default": { "appenders": ['logFile', "out"], "level": "trace" },
    }
};