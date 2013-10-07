var assert = require("assert");

var addRoutes = require('../index.js');

var sinon = require('sinon');



describe('app', function(){
    describe('get', function(){


        var app = {
            get: sinon.spy(),
            post: sinon.spy(),
            put: sinon.spy(),
            delete: sinon.spy()
        };

        var route = {
            admin: {
                login: {
                    get: function () {
                    }
                }
            }
        };

        addRoutes(route, app);

        it('app.get should be called once', function(){
            assert.equal(app.get.callCount, 1);
        })
        it('app.get called with correct params', function(){
            assert(app.get.calledWith('/admin/login',route.admin.login.get), true);
        })
        it('app.post should not be called', function(){
            assert.equal(app.post.called, false);
        })
        it('app.put should not be called', function(){
            assert.equal(app.put.called, false);
        })
        it('app.delete should not be called', function(){
            assert.equal(app.delete.called, false);
        })
    })
    describe('post', function(){


        var app = {
            get: sinon.spy(),
            post: sinon.spy(),
            put: sinon.spy(),
            delete: sinon.spy()
        };

        var route = {
            admin: {
                login: {
                    post: function () {
                    }
                }
            }
        };

        addRoutes(route, app);

        it('app.get should not be called', function(){
            assert.equal(app.get.called, false);
        })

        it('app.post should be called once', function(){
            assert.equal(app.post.callCount, 1);
        })
        it('app.post called with correct params', function(){
            assert(app.post.calledWith('/admin/login',route.admin.login.post), true);
        })
        it('app.put should not be called', function(){
            assert.equal(app.put.called, false);
        })
        it('app.delete should not be called', function(){
            assert.equal(app.delete.called, false);
        })
    })
    describe('put', function(){


        var app = {
            get: sinon.spy(),
            post: sinon.spy(),
            put: sinon.spy(),
            delete: sinon.spy()
        };

        var route = {
            admin: {
                login: {
                    put: function () {
                    }
                }
            }
        };

        addRoutes(route, app);

        it('app.get should not be called', function(){
            assert.equal(app.get.called, false);
        })
        it('app.post should not be called', function(){
            assert.equal(app.post.called, false);
        })
        it('app.put should be called once', function(){
            assert.equal(app.put.callCount, 1);
        })
        it('app.put called with correct params', function(){
            assert(app.put.calledWith('/admin/login',route.admin.login.put), true);
        })
        it('app.delete should not be called', function(){
            assert.equal(app.delete.called, false);
        })
    })

    describe('delete', function(){


        var app = {
            get: sinon.spy(),
            post: sinon.spy(),
            put: sinon.spy(),
            delete: sinon.spy()
        };

        var route = {
            admin: {
                login: {
                    delete: function () {
                    }
                }
            }
        };

        addRoutes(route, app);

        it('app.get should not be called', function(){
            assert.equal(app.get.called, false);
        })
        it('app.post should not be called', function(){
            assert.equal(app.post.called, false);
        })
        it('app.put should not be called', function(){
            assert.equal(app.put.called, false);
        })
        it('app.delete should be called once', function(){
            assert.equal(app.delete.callCount, 1);
        })
        it('app.delete called with correct params', function(){
            assert(app.delete.calledWith('/admin/login',route.admin.login.delete), true);
        })

    })
})
