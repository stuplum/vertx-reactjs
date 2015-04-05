"use strict";

var React  = require('../vendor/reactjs.js'),
    Result = require('../component/searchResult.js');

module.exports =  React.createClass({
    displayName: 'SearchResults',
    render: function() {

        function renderSearchResult(searchResult) {
            return React.createElement(Result, {
                key: 'result-' + searchResult.id,
                details: searchResult
            });
        }

        return (
            React.createElement("div", null,
                this.props.results.map(renderSearchResult)
            )
        );
    }
});