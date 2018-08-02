const bcrypt = require("bcryptjs");
const user = require("../models/user");

module.exports = function(req, res, next) {
  let username = req.body.username;
  let password = req.body.password;
  user
    .findOne({ username: username })
    .then(user => {
      if (user) {
        let isPasswordTrue = bcrypt.compareSync(password, user.password);
        // console.log(isPasswordTrue);

        if (isPasswordTrue) {
          req.body.userId = user._id;
          next();
        } else {
          res.json({
            err: { message: "username / password is incorrect" }
          });
        }
      } else {
        res.json({
          err: { message: "username / password is incorrect" }
        });
      }
    })
    .catch(err => {
      if (err) {
        res.status(400).json({ err });
      }
    });
};
