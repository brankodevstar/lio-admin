const Announcement = require("../models/Announcements");

module.exports = {
    findAll: function (req, res) {
        Announcement.find(req.query)
            .then((announcements) => res.json(announcements))
            .catch((err) => res.status(422).json(err));
    },
    findById: function (req, res) {
        Announcement.findById(req.params.id)
            .then((announcement) => res.json(announcement))
            .catch((err) => res.status(422).json(err));
    },
    create: function (req, res) {
        Announcement.create(req.body)
            .then((newAnnouncement) => res.json(newAnnouncement))
            .catch((err) => res.status(422).json(err));
    },
    update: function (req, res) {
        Announcement.findOneAndUpdate({ _id: req.params.id }, req.body)
            .then((announcement) => res.json(announcement))
            .catch((err) => res.status(422).json(err));
    },
    remove: function (req, res) {
        Announcement.findById({ _id: req.params.id })
            .then((announcement) => announcement.remove())
            .then((allAnnouncements) => res.json(allAnnouncements))
            .catch((err) => res.status(422).json(err));
    },
    increaseLike: function (req, res) {
        Announcement.findById({ _id: req.params.id })
            .then((announcement) => {
                announcement.clickCount++;
                announcement.save();
            })
            .then(() => {
                res.json({ success: true });
            })
            .catch((err) => res.status(422).json(err));
    },
};
