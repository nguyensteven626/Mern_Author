const mongoose = require('mongoose');
 
const AuthorSchema = new mongoose.Schema({
    title: {
    type: String,
    required: [true, "Author is required"],
    minlength: [3, "Author must be at least 3 characters long"]
}

}, {timestamps: true});
 
const Author = mongoose.model('Author', AuthorSchema);
 
module.exports = Author;