const path = require('path');

const posts = require(path.join(__dirname,'posts.js'));
const comments = require(path.join(__dirname,'comments.js'));

module.exports = {
    posts,comments
};