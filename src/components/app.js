/*eslint-disable strict */ //Disabling chek because we can't run strict mode. Need global vars/



var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Header = require('./common/header');
$ = jQuery = require('jquery');              

var App = React.createClass({
	render: function(){
		return (
			<div>
				<Header/>
				<div className="container-fluid">
					<RouteHandler/>				
				</div>
				
			</div>
		);
	}
});

module.exports = App;