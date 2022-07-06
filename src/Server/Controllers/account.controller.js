const accountService = require("../services/account.service");

module.exports.login = async (req, res, next) => {
  try {
    const user = await accountService.login(
      req.params.email,
      req.params.password
    );
    res.send(user);
  } catch (err) {
    next(err);
  }
};
