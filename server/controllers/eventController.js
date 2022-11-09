const Event = require("../models/Events");

module.exports = {
    findAll: function (req, res) {
        Event.find(req.query)
            .then((events) => res.json(events))
            .catch((err) => res.status(422).json(err));
    },
    findFeatured: function (req, res) {
        Event.find({ featured: true })
            .then((events) => res.json(events))
            .catch((err) => res.status(422).json(err));
    },
    findById: function (req, res) {
        Event.findById(req.params.id)
            .then((event) => {
                res.json(event);
            })
            .catch((err) => res.status(422).json(err));
    },
    create: function (req, res) {
        Event.create(req.body)
            .then((newEvent) => res.json(newEvent))
            .catch((err) => res.status(422).json(err));
    },
    update: function (req, res) {
        Event.findOneAndUpdate({ _id: req.params.id }, req.body)
            .then((event) => res.json(event))
            .catch((err) => res.status(422).json(err));
    },
    remove: function (req, res) {
        Event.findById({ _id: req.params.id })
            .then((event) => event.remove())
            .then((allEvents) => res.json(allEvents))
            .catch((err) => res.status(422).json(err));
    },
};
