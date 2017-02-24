/*jslint browser:true, white: true, debug: true */
"use strict";
var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CHANGE_EVENT = 'change';
var _ = require('lodash');
var _authors = [];

var AuthoreStore = assign({}, EventEmitter.prototype, {
	addChangeListener: function(callback){
		this.on(CHANGE_EVENT, callback);

	},
	removeChangeListener: function(callback){
		this.removeListener(CHANGE_EVENT, callback);
	},
	emitChange: function(){
		this.emit(CHANGE_EVENT);
	},
	getAllAuthors: function(){
		return _authors;
	},
	getAuthorById: function(id){
		return _.find(_authors, {id: id});
	}

});

Dispatcher.register(function(action){
	switch(action.actionType){
		case ActionTypes.INITIALIZE:
			_authors = action.initialData.authors;
			AuthoreStore.emitChange();
			break;
		case ActionTypes.CREATE_AUTHOR: 
			_authors.push(action.author);
			AuthoreStore.emitChange();
			break;
		case ActionTypes.UPDATE_AUTHOR: 
			var existingAuthor = _.find(_authors, {id: action.author.id});
			var existingAuthorIndex = _.indexOf(_authors, existingAuthor);
			_authors.splice(existingAuthor, 1, action.author);
			AuthoreStore.emitChange();
			break;			
		case ActionTypes.DELETE_AUTHOR: 
			_.remove(_authors, { id: action.authorId});			
			AuthoreStore.emitChange();
			break;		
		default:
			//no op
	}

});

module.exports = AuthoreStore;