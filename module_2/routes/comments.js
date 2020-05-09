const getComments = (req,res) =>{
    res.status(200).send(req.store.posts[req.params.postId].comments);
};
const addComments = (req,res) => {
    req.store.posts[req.params.postId].comments.push(req.body);
    res.status(201).send(req.body);
};
const updateComments = (req,res) => {
    req.store.posts[req.params.postId].comments[req.params.commentId] = req.body;
    res.status(202).send(req.body);
};
const removeComments = (req,res) => {
    req.store.posts[req.params.postId].comments.splice(req.params.commentId,1);
    res.status(204).send();
};


module.exports = {
    getComments, addComments, updateComments, removeComments
}