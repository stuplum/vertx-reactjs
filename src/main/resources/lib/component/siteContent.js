"use strict";

var React         = require('../vendor/reactjs.js'),
    SearchResults = require('../component/searchResults.js');

module.exports = React.createClass({
    displayName: 'SiteContent',
    render: function() {
        return (
            React.createElement("div", null,
                React.createElement("h1", null, this.props.title),
                React.createElement(SearchResults, {results: this.props.results})
            )
        );
    }
});