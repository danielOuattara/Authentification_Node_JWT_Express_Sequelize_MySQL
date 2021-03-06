/*
Create Middleware functions
---------------------------

To verify a Signup action, we need 2 functions:
– check if username or email is duplicate or not
– check if roles in the request is existed or not
*/

const db = require("./../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    where: { username: req.body.username }
  })
  .then(user => {
    if (user) {
      return res.status(400).send({ message: "Failed! Username is already in use!" });
    }

    // Email
    User.findOne({
      where: {email: req.body.email }
    })
    .then(user => {
      if (user) {
        return res.status(400).send({ message: "Failed! Email is already in use!" });
      }
      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
         return res.status(400).send({ message: "Failed! Role does not exist = " + req.body.roles[i] });
      }
    }
  }
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};

module.exports = verifySignUp;
