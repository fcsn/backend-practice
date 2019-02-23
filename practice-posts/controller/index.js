const models = require('../models');

const getUsers = async (req, res) => {
    const users = await models.User.findAll();
    // res.body = users;
    return res.json(users)
}

const getUser = async (req, res) => {
    const { id } = req.params;

    const user = await models.User.findOne({ where: { id } });
    // res.body = user;
    return res.json(user)
};

const getPosts = async (req, res) => {
    const posts = await models.Post.findAll();
    return res.json(posts)
}

const getPost = async (req, res) => {
    const { id } = req.params;
    const user = await models.Post.findOne({ where: { id } });
    return res.json(user)
}

const makePost = (req, res, next) => {
    models.Post.create({
        title: req.body.title,
    })
        .then((result) => {
            console.log(result);
            res.status(201).json(result);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
}

const getComments = async (req, res) => {
    const postId = req.params.postId;
    const comments = await models.Comment.findAll({ where: { postId } });
    return res.json(comments)
}

const getComment = async (req, res) => {
    const { id } = req.params;
    const comment = await models.Comment.findOne({ where: { id } });
    return res.json(comment)
}

const makeComment = (req, res, next) => {
    models.Comment.create({
        content: req.body.content,
        postId: req.params.id,
    })
        .then((result) => {
            console.log(result);
            res.status(201).json(result);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
}

module.exports = {
    getUsers,
    getUser,
    getPosts,
    getPost,
    getComments,
    getComment,
    makeComment,
    makePost
}
