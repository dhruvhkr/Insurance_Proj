const Policy = require("./policy.schema");

module.exports = {
  getAggregatedMonthPolicy: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const policy = await Policy.aggregate([
          {
            $group: {
              _id: { month: { $month: "$Date_of_Purchase" } },
              total: {
                $sum: 1,
              },
            },
          },
          {
            $addFields: {
              month: "$_id.month",
            },
          },
          {
            $project: {
              _id: 0,
            },
          },
          {
            $sort: {
              month: 1,
            },
          },
        ]);
        resolve(policy);
      } catch (err) {
        reject(err);
      }
    });
  },
  getAggregatedRegionPolicy: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const policy = await Policy.aggregate([
          {
            $group: {
              _id: "$Customer_Region",
              total: {
                $sum: 1,
              },
            },
          },
        ]);
        resolve(policy);
      } catch (err) {
        reject(err);
      }
    });
  },
};
