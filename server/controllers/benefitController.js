const Benefit = require("../models/Benefits");

module.exports = {
    findAll: function (req, res) {
        Benefit.find(req.query)
            .then((benefits) => res.json(benefits))
            .catch((err) => res.status(422).json(err));
    },
    findById: function (req, res) {
        Benefit.findById(req.params.id)
            .then((benefit) => res.json(benefit))
            .catch((err) => res.status(422).json(err));
    },
    create: function (req, res) {
        Benefit.create(req.body)
            .then((newBenefit) => res.json(newBenefit))
            .catch((err) => res.status(422).json(err));
    },
    update: function (req, res) {
        Benefit.findOneAndUpdate({ _id: req.params.id }, req.body)
            .then((benefit) => res.json(benefit))
            .catch((err) => res.status(422).json(err));
    },
    remove: function (req, res) {
        Benefit.findById({ _id: req.params.id })
            .then((benefit) => benefit.remove())
            .then((allBenefits) => res.json(allBenefits))
            .catch((err) => res.status(422).json(err));
    },
};
