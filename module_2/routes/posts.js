const getPosts = (req,res) => {
    res.status(200).send(req.store.posts);
};
const addPost = (req,res) => {
    let pid = req.store.posts.length;
    req.store.posts.push(req.body);
    res.status(201).send(req.body);
};
const updatePost = (req,res) => {
    req.store.posts[req.params.postId] = req.body;
    res.status(202).send(req.body);
};
const deletePost = (req,res) => {
    req.store.posts.splice(req.params.postId,1);
    res.status(204).send();
};


module.exports = {
    getPosts, addPost, updatePost, deletePost
};
