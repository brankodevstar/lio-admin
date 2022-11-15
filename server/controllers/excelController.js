const userModel = require('../models/Users');
const xlsxToJson = require('xlsx-to-json');

const importExcel = async (req, res) => {
    try {
        xlsxToJson({
            input: req.file.path,
            output: 'output.json',
            lowerCaseHeaders: true
        }, function(err, result) {
            if (err) {
                console.log(err);
            } else {
                for (let index = 0; index < result.length; index++) {
                    const element = result[index];
                    let user = new userModel();
                    user.firstName = element.firstName;
                    user.lastName = element.lastName;
                    user.email = element.email;
                    user.phone = element.phone;
                    user.city = element.city;
                    user.gender = element.gender;
                    user.birthday = element.birthday;
                    user.caption = element.caption;
                    user.company = element.company;
                    user.avatarUrl = 'default_avatar.png';
                    userModel.create(user);
                }
                res.send({
                    success: true,
                    message: "Successfully Imported!",
                });
            }
        });
    } catch (error) {
        return res.send({
            message: `Error when trying upload image: ${error}`,
        });
    }
};

module.exports = { importExcel };
