const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
	userId: String,
	description: String,
	date: String,
	listArray: Array
});

const List = mongoose.model('List', listSchema);
module.exports = List;