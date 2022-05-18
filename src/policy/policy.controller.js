const { sanitizeErrorPayload } = require("../handleErrors/errors");
const {
  getAggregatedMonthPolicy,
  getAggregatedRegionPolicy,
} = require("./policy.backend");
const Policy = require("./policy.schema");

const getPolicyAggregation = async (req, res) => {
  try {
    // Policy Aggregation For Chart Data
    const policy = await Promise.allSettled([
      getAggregatedMonthPolicy(),
      getAggregatedRegionPolicy(),
    ]);
    res.send({ month: policy[0], region: policy[1] });
  } catch (err) {
    res.send(err);
  }
};

const getPolicyById = async (req, res) => {
  try {
    const { limit, page, id } = req.query;
    const query = {
      $or: [
        { Policy_id: { $regex: id, $options: "i" } },
        { Customer_id: { $regex: id, $options: "i" } },
      ],
    };
    const count = await Policy.find(query).count();
    const policy = await Policy.aggregate([
      {
        $match: query,
      },
      {
        $sort: {
          Policy_id: -1,
        },
      },
      { $skip: page ? (+page - 1) * 10 : 0 },
      { $limit: limit ? +limit : 3 },
    ]);
    res.send({ policy, count });
  } catch (err) {
    res.send(err);
  }
};
const updatePolicy = async (req, res) => {
  try {
    const updatedPolicy = await Policy.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.send(updatedPolicy);
  } catch (err) {
    const error = sanitizeErrorPayload(err);
    res.status(400).send(error);
  }
};

module.exports = {
  getPolicyAggregation,
  getPolicyById,
  updatePolicy,
};
