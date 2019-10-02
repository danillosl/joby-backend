const express = require("express");
const JobModel = require("./JobModel");
const wrapperMiddleware = require("./wrapperMiddleware");
const queryMiddle = require("./queryMiddleware");
const router = express.Router();

router.get("/", queryMiddle, wrapperMiddleware, async (req, res) => {
  const { pageSize, currentPage, fields, query, total } = req.query;
  let { wrapper } = req;

  try {
    const jobs = await JobModel.find(query)
      .limit(Number(pageSize))
      .skip(currentPage * pageSize)
      .sort({ date: -1 })
      .select(fields.split(","));

    wrapper = { ...wrapper, data: jobs, total };

    res.send(wrapper);
  } catch (err) {
    res.status(404).send(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const job = await JobModel.findById(req.params.id);
    res.send(job);
  } catch (err) {
    res.status(404).send(err);
  }
});

router.post("/", async (req, res) => {
  const oneMonthOld = new Date();
  oneMonthOld.setMonth(oneMonthOld.getMonth() - 1);

  const body = {
    title: req.body.title,
    logo: req.body.logo,
    link: req.body.link,
    tags: [...new Set(req.body.tags)],
    company: req.body.company,
    description: req.body.description,
    hash: req.body.hash
  };

  if (body.tags.length > 5) {
    res.status(400).send("Too many tags!");
  }

  const job = new JobModel(body);

  JobModel.findOne({ hash: body.hash, date: { $gt: oneMonthOld } }, async (err, item) => {
    if (err) {
      res.status(404).send(err);
    }
    try {
      if (!item) {
        const savedJob = await job.save();
        res.json(savedJob);
      } else {
        res.status(400).send("Job already posted!");
      }
    } catch (err) {
      console.log(err);
      res.status(404).send(err);
    }
  });
});

module.exports = router;
