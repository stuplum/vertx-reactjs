var log = require('vertx/console').log,
    eb  = require('vertx/event_bus');

var morph = require('./lib/lib/morph.js').morph;

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

    var morphed = morph(marshallMessage(message));

    log('[' + morphed.uuid + '] Incoming message');

    replier(JSON.stringify({ uuid: morphed.uuid, html: morphed.html }));
});

log('React template compiler loaded and running.....');
