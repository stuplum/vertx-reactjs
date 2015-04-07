'use strict';

var log = require('vertx/console').log;

var guid   = require('./lib/lib/guid.js').guid,
    morph  = require('./lib/lib/morph.js').morph,
    Engine = require('./lib/lib/TemplateEngine.js').ejs;

var Yoke           = require('yoke/Yoke');

var Favicon        = require('yoke/middleware/Favicon');
var Logger         = require('yoke/middleware/Logger');
var BodyParser     = require('yoke/middleware/BodyParser');
var MethodOverride = require('yoke/middleware/MethodOverride');
var Router         = require('yoke/middleware/Router');
var Static         = require('yoke/middleware/Static');
var ErrorHandler   = require('yoke/middleware/ErrorHandler');

// Create a new Yoke Application
var app = new Yoke();

// define engines
app.engine(new Engine());

// define middleware
app.use(new Favicon());
app.use(new Logger());
app.use(new BodyParser());
app.use(new MethodOverride());
app.use(new ErrorHandler(true));

// Create a new Router
var router = new Router();
app.use(router);

// static file server
app.use(new Static('public'));

// define routes
router

    .get('/', function(req) {

        req['title'] =  'My Yoke Application';
        req['engineName'] = 'EJS';

        req.response.render('views/index.ejs');
    })

    .get('/react', function(req) {

        var uuid = guid();

        var title    = 'Isomorphic ReactJS',
            navItems = ['Home', 'Contact', 'About'],
            results  = [];

        for (var i = 0; i < 10; i++) {
            results.push({
                id: Date.now() + i,
                price: i * 100000,
                summary: "This is one tasty treat....."
            });
        }

        var morphed = morph({
            uuid: uuid,
            title: title,
            navItems: navItems,
            results: results
        });

        log('[' + uuid + '] Incoming request');

        req['body'] = morphed.html;
        req.response.render('views/react.ejs');
    });

app.listen(8080);

log('Yoke server listening on port 8080');