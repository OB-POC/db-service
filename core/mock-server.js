const jsonServer = require('json-server')
const server = jsonServer.create()
const middlewares = jsonServer.defaults()

server.use(middlewares);
jsonServer.rewriter({'/dbService': '/*'});

var _ = require("underscore")
var path = require('path')
var fs = require('fs')
var mockDir = './mock/'
var base = {};

var searchRecursive = (dir, done) => {
  var results = [];
  fs.readdir(dir, (err, list) => {
    if (err) return done(err);
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) return done(null, results);
      file = dir + '/' + file;
      fs.stat(file, (err, stat) => {
        if (stat && stat.isDirectory()) {
          searchRecursive(file, (err, res) => {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
}

const mockServer = () => {
    searchRecursive(mockDir, (err, files) => {
        if (err) throw err;
        files.forEach(file => {
          if (path.extname(file) === '.json'){
            _.extend(base, require(path.resolve(file)))
          }
        });
      
        server.use(jsonServer.router(base));
        server.listen(5000, () => {
          console.log('Mock JSON Server is running')
        })
    });
}

module.exports = mockServer;