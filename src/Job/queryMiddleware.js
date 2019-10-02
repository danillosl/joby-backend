const JobModel = require("./JobModel");

module.exports = async (req, res, next) => {
  const { pageSize = 10, page = 1, fields = "", query = "{}" } = req.query;

  const currentPage = page > 0 ? page - 1 : 0;
  try {
    const total = await JobModel.find(JSON.parse(query)).countDocuments();

    req.query = { ...req.query, ...{ query: JSON.parse(query), page: parseInt(page), currentPage, total, pageSize: parseInt(pageSize), fields } };
    next();
  } catch (err) {
    res.status(404).send(err);
  }
};
