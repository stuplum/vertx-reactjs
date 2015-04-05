"use strict";

var React = require('../vendor/reactjs.js');

module.exports = React.createClass({
    displayName: 'SiteNav',
    render: function() {
        function renderNavItem(navItem, i) {
            return React.createElement("li", { key: 'nav-' + i }, navItem);
        }

        return (
            React.createElement("div", null,
                React.createElement("ul", null,
                    this.props.navItems.map(renderNavItem)
                )
            )
        );
    }
});