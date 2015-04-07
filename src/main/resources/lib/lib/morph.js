'use strict';

var React      = require('../vendor/reactjs.js'),
    SearchPage = require('../page/search.js');

function morph(model) {

    var Page = React.createElement(SearchPage, model);

    return { uuid: model.uuid, html: React.renderToString(Page) };
}

module.exports = { morph: morph };