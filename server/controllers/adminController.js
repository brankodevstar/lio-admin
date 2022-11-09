const Admin = require("../models/Admin");

module.exports = {
    login: function (req, res) {
        Admin.find(req.body)
            .then((admin) => res.json(admin))
            .catch((err) => res.status(422).json(err));
    },
    create: function (req, res) {
        Admin.create(req.body)
            .then((admin) => res.json(admin))
            .catch((err) => res.status(422).json(err));
    },
    changePassword: function (req, res) {
        Admin.find({ email: req.body.email })
            .then((admins) => {
                if (admins.length > 0) {
                    let admin = admins[0]
                    if (admin.password === req.body.currentPassword) {
                        admin.password = req.body.newPassword
                        Admin.findByIdAndUpdate({ _id: admin._id }, admin)
                            .then((newAdmin) => res.json({
                                success: true
                            }))
                            .catch((err) => res.status(422).json(err));
                    } else {
                        res.json({
                            success: false,
                            msg: 'Password is incorrect'
                        });
                    }
                } else {
                    res.json({
                        success: false,
                        msg: 'Email not existed!'
                    });
                }
            })
            .catch((err) => res.status(422).json(err));
    }
};
