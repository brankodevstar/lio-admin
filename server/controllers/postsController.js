const Post = require("../models/Posts");

module.exports = {
    findAll: function (req, res) {
        Post.find(req.query)
            .then((posts) => res.json(posts))
            .catch((err) => res.status(422).json(err));
    },
    findById: function (req, res) {
        Post.findById(req.params.id)
            .then((post) => res.json(post))
            .catch((err) => res.status(422).json(err));
    },
    create: function (req, res) {
        Post.create(req.body)
            .then((newPost) => res.json(newPost))
            .catch((err) => res.status(422).json(err));
    },
    update: function (req, res) {
        Post.findOneAndUpdate({ _id: req.params.id }, req.body)
            .then((post) => res.json(post))
            .catch((err) => res.status(422).json(err));
    },
    remove: function (req, res) {
        Post.findById({ _id: req.params.id })
            .then((post) => post.remove())
            .then((allPosts) => res.json(allPosts))
            .catch((err) => res.status(422).json(err));
    },
};
