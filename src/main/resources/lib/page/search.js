"use strict";

var React       = require('../vendor/reactjs.js'),
    SiteNav     = require('../component/siteNav.js'),
    SiteContent = require('../component/siteContent.js');

module.exports = React.createClass({
    displayName: "SearchPage",
    render: function() {
        return (
            React.createElement("div", null,
                React.createElement(SiteNav, {navItems: this.props.navItems}),
                React.createElement(SiteContent, {title: this.props.title, results: this.props.results})
            )
        );
    }
});