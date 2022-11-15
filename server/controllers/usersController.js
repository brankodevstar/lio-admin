const User = require("../models/Users");

module.exports = {
    findAll: function (req, res) {
        if (req.query.username) {
            User.find({
                $or: [
                    { firstName: { $regex: req.query.username } },
                    { lastName: { $regex: req.query.username } },
                ],
            })
                .then((users) => {
                    res.json(users);
                })
                .catch((err) => res.status(422).json(err));
        } else {
            User.find(req.query)
                .then((users) => {
                    res.json(users);
                })
                .catch((err) => res.status(422).json(err));
        }
    },
    findById: function (req, res) {
        User.findById(req.params.id)
            .then((user) => res.json(user))
            .catch((err) => res.status(422).json(err));
    },
    create: function (req, res) {
        User.create(req.body)
            .then((newUser) => res.json(newUser))
            .catch((err) => res.status(422).json(err));
    },
    update: function (req, res) {
        User.findOneAndUpdate({ _id: req.params.id }, req.body)
            .then((user) => {
                User.findById(req.params.id)
                    .then((newUser) => {
                        console.log("new user ===> ", newUser);
                        res.json(newUser);
                    })
                    .catch((err) => res.status(422).json(err));
            })
            .catch((err) => res.status(422).json(err));
    },
    remove: function (req, res) {
        User.findById({ _id: req.params.id })
            .then((user) => user.remove())
            .then((allUsers) => res.json(allUsers))
            .catch((err) => res.status(422).json(err));
    },
};
