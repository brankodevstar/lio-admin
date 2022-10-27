const Gallery = require("../models/Gallerys");

module.exports = {
    findAll: function (req, res) {
        Gallery.find(req.query)
            .then((gallerys) => res.json(gallerys))
            .catch((err) => res.status(422).json(err));
    },
    findById: function (req, res) {
        Gallery.findById(req.params.id)
            .then((gallery) => res.json(gallery))
            .catch((err) => res.status(422).json(err));
    },
    create: function (req, res) {
        Gallery.create(req.body)
            .then((newGallery) => res.json(newGallery))
            .catch((err) => res.status(422).json(err));
    },
    update: function (req, res) {
        Gallery.findOneAndUpdate({ _id: req.params.id }, req.body)
            .then((gallery) => res.json(gallery))
            .catch((err) => res.status(422).json(err));
    },
    remove: function (req, res) {
        Gallery.findById({ _id: req.params.id })
            .then((gallery) => gallery.remove())
            .then((allGallerys) => res.json(allGallerys))
            .catch((err) => res.status(422).json(err));
    },
};
