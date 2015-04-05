"use strict";

var React  = require('../vendor/reactjs.js');

module.exports = React.createClass({
    displayName: 'SearchResult',
    render: function() {
        return (
            React.createElement("div", null,
                React.createElement("div", null,
                    React.createElement("a", { href: 'http://www.google.co.uk?q=cheese', target: '_blank' },
                        React.createElement("img", { src: 'http://baconmockup.com/300/200' })
                    ),
                    React.createElement("a", { href: 'http://www.google.co.uk?q=cheese', target: '_blank' },
                        React.createElement("h2", null, 'Ham snack: ', this.props.details.id)
                    ),
                    React.createElement("i", null, 'Price: ', this.props.details.price),
                    React.createElement("p", null, 'Summary: ', this.props.details.summary)
                )
            )
        );
    }
});