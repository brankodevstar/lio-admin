const Investment = require("../models/Investments");

module.exports = {
    findAll: function (req, res) {
        Investment.find(req.query)
            .then((investments) => res.json(investments))
            .catch((err) => res.status(422).json(err));
    },
    findFeatured: function (req, res) {
        Investment.find({ featured: true })
            .then((investments) => res.json(investments))
            .catch((err) => res.status(422).json(err));
    },
    findById: function (req, res) {
        Investment.findById(req.params.id)
            .then((investment) => res.json(investment))
            .catch((err) => res.status(422).json(err));
    },
    create: function (req, res) {
        Investment.create(req.body)
            .then((newInvestment) => res.json(newInvestment))
            .catch((err) => res.status(422).json(err));
    },
    update: function (req, res) {
        Investment.findOneAndUpdate({ _id: req.params.id }, req.body)
            .then((investment) => res.json(investment))
            .catch((err) => res.status(422).json(err));
    },
    remove: function (req, res) {
        Investment.findById({ _id: req.params.id })
            .then((investment) => investment.remove())
            .then((allInvestments) => res.json(allInvestments))
            .catch((err) => res.status(422).json(err));
    },
};
