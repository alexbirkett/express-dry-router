# express-dry-router

[![build status](https://secure.travis-ci.org/alexbirkett/express-dry-router.png)](http://travis-ci.org/alexbirkett/express-dry-router)

An express router for people who hate repeating themselves.

If we consider a typical route in an express app:

    // app.js
    var routes = require('./app/routes');
    
    app.get('/admin/login', routes.admin.login);
    
    // routes/index.js
    exports.admin =  {
      login: function (req, res) {
        res.render('login', { pageTitle: 'Login'});
    };
    
The name of the route is repeated three times - twice in app.js (```/admin/login``` and ```routes.admin.login```) and as part of the object hirearchy in in routes/index.js

Expess-dry-router allows you to describe routes with a single source of truth, the object hierarchy. The above example could be re-written like this:
    
    // app.js
    var routes = require('./app/routes');
    var configureDryRoutes = require('express-dry-router');
     
    configureDryRoutes(routes, app);
         
    // routes/index.js
    module.exports = {
        admin: {
            login: {
                get: function (req, res) {
                        res.render('login', { title: 'Login'});
                }
            }
        }
    };

## Example

This example demonstrates setting up routes with GET, PUT, POST and DELETE HTTP methods.
    
    
    var express = require('express');
    var http = require('http');
    var configureDryRoutes = require('express-dry-router');
    
    var app = express();
    
    // all environments
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));
    app.use(app.router);
    
    var routes = {
        myapp: {
            resources: {
                ":id": {
                    get: function (req, res) {
                       res.send("Retrieve a representation of " + req.params.id);
                    },
                    put: function (req, res) {
                        res.send("Replace " + req.params.id + ", or if it doesn't exist, create it.");
                    },
                    post: function (req, res) {
                        res.send("Not generally used.");
                    },
                    delete: function (req, res) {
                        res.send("Delete " + req.params.id);
                    }
                },
                get: function (req, res) {
                    res.send("List the URIs and perhaps other details of the collection's members.");
                },
                put: function (req, res) {
                    res.send("Replace the entire collection with another collection.");
                },
                post: function (req, res) {
                    res.send("Create a new entry in the collection. The new entry's URI is assigned automatically and is usually returned by the operation.");
                },
                delete: function (req, res) {
                    res.send("Delete the entire collection.");
                }
            }
        }
    };
    configureDryRoutes(routes, app);
    
    http.createServer(app).listen(app.get('port'), function(){
      console.log('Express server listening on port ' + app.get('port'));
    });
    
Opening [http://localhost:3000/myapp/resources](http://localhost:3000/myapp/resources) in a browser will cause a HTTP GET request to be sent to the server. The handler defined in ```rotues.myapp.resources.get``` will be called and "List the URIs and perhaps other details of the collection's members." will be returned in the HTTP response to the browser.

Opening [http://localhost:3000/myapp/resources/item1](http://localhost:3000/myapp/resources/item1) in a browser will cause a HTTP GET request to being sent to the server. The handler defined in ```rotues.myapp.resources.":id".get``` will be called and "Retrieve a representation of item1" will be returned in the HTTP response to the browser.

Creating a HTTP request with one of the other HTTP methods (PUT, POST and DELETE) will cause the corresponding handlers in the ```rotues``` object hierarchy to be called. This can be tested using the [Dev HTTP Client](https://chrome.google.com/webstore/detail/dev-http-client/aejoelaoggembcahagimdiliamlcdmfm) in Chrome, for example.
