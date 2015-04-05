var log = require('vertx/console').log,
    eb  = require('vertx/event_bus');

var _          = require('./lib/vendor/lodash.js'),
    React      = require('./lib/vendor/reactjs.js'),
    SearchPage = require('./lib/page/search.js');

function marshallMessage(message) {

    var parsedMessage = JSON.parse(message);

    return {
        uuid: parsedMessage.uuid,
        title: parsedMessage.title,
        navItems: parsedMessage.navItems,
        results: parsedMessage.results
    };
}


eb.registerHandler('compile-template', function(message, replier) {

    var model      = marshallMessage(message),
        Page       = React.createElement(SearchPage, model),
        staticHTML = React.renderToString(Page);

    log('[' + model.uuid + '] Incoming message');

    replier(JSON.stringify({ uuid: model.uuid, html: staticHTML }));
});

log('React template compiler loaded and running.....');
