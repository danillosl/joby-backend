const JobModel = require("./JobModel");

module.exports = (req, res, next) => {
  const { page, pageSize, total } = req.query;

  try {
    req.wrapper = {
      total,
      pageSize,
      page
    };

    next();
  } catch (err) {
    res.status(404).send(err);
  }
};
