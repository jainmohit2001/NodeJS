const express = require('express');

const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const path = require('path');
const app = express();
const { posts, comments } = require(path.join(__dirname,'routes'));

let store = {
    posts: [{
        name: "",
        url: "",
        text: "",
        comments: [{
            text: ""
        }]
    }]
};
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(errorHandler());
app.use((req,res,next) => {
    req.store = store;
    next()
});

//posts
app.get('/posts', (req,res) => {
    posts.getPosts(req,res)
});
app.post('/posts', (req,res) => {
    posts.addPost(req,res)
});
app.put('/posts/:postId', (req,res) => {
    posts.updatePost(req,res)
});
app.delete('/posts/:postId', (req,res) => {
    posts.deletePost(req,res)
});

//comments

app.get('/posts/:postId/comments', (req,res) => {
    comments.getComments(req,res)
});
app.post('/posts/:postId/comments', (req,res) => {
    comments.addComments(req,res)
});
app.put('/posts/:postId/comments/:commentId', (req,res) => {
    comments.updateComments(req,res)
});
app.delete('/posts/:postId/comments/:commentId', (req,res) => {
    comments.removeComments(req,res)
});

app.listen(3000);