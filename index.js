var addRoutes = function(routeObject, app, path, functionsToCallOnAppObject) {

    functionsToCallOnAppObject = functionsToCallOnAppObject || ['get', 'post', 'put', 'delete'];

    path = path || '';

    for(var property in routeObject){
        var routesAdded = false;
        for (var functionIndex in functionsToCallOnAppObject) {
            var functionToCallOnAppObject = functionsToCallOnAppObject[functionIndex];
            var completePath, handler;
            if (property === functionToCallOnAppObject) {
                if (typeof(routeObject[functionToCallOnAppObject]) === 'function') {
                    handler = routeObject[functionToCallOnAppObject];
                    completePath = path;
                } else {
                    handler = routeObject[functionToCallOnAppObject].handler;
                    completePath = path + (routeObject[functionToCallOnAppObject].params || '');
                }
                app[functionToCallOnAppObject](completePath, handler);
                routesAdded = true;
            }
        }
        if (!routesAdded) {
            addRoutes(routeObject[property], app, path + '/' + property, functionsToCallOnAppObject);
        }
    }
    return app;
};

module.exports = addRoutes;
