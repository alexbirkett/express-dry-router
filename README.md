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
