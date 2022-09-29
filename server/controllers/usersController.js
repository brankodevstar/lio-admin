const User = require('../models/Users');

module.exports = {
    findAll: function (req, res) {
        console.log('query -', req.query);
        User.find(req.query)
            .then(users => {
                console.log('users ---------> ', users);
                res.json(users)
            })
            .catch(err => res.status(422).json(err));
    },
    findById: function (req, res) {
        console.log(req.params);
        User.findById(req.params.id)
            .then(user => res.json(user))
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        User.create(req.body)
            .then(newUser => res.json(newUser))
            .catch(err => res.status(422).json(err));
    },
    update: function (req, res) {
        User.findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(user => res.json(user))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        console.log(req.params.id);
        User.findById({ _id: req.params.id })
            .then(user => user.remove())
            .then(allUsers => res.json(allUsers))
            .catch(err => res.status(422).json(err));
    }
}