const mongoose = require("mongoose");

const policySchema = new mongoose.Schema({
  Policy_id: {
    type: String,
    required: [true, "Policy_id is required"],
    index: true, //Creating index for fast retrievals
    unique: true,
  },
  Date_of_Purchase: {
    type: Date,
    required: true,
    immutable: true,
  },
  Customer_id: {
    type: String,
    required: [true, "Customer_id is required"],
    index: true, //Creating index for fast retrievals
  },
  Fuel: {
    type: String,
    required: true,
  },
  VEHICLE_SEGMENT: {
    type: String,
    required: true,
  },
  Premium: {
    type: Number,
    required: true,
    max: [1000000, "Premium should not be more than 1000000"],
  },
  bodily_injury_liability: {
    type: String,
    required: true,
  },
  personal_injury_protection: {
    type: String,
    required: true,
  },
  property_damage_liability: {
    type: String,
    required: true,
  },
  collision: {
    type: String,
    required: true,
  },
  comprehensive: {
    type: String,
    required: true,
  },
  Customer_Gender: {
    type: String,
    required: true,
  },
  Customer_Income_group: {
    type: String,
    required: true,
  },
  Customer_Region: {
    type: String,
    required: true,
  },
  Customer_Marital_status: {
    type: String,
    required: true,
  },
});

const Policy = mongoose.model("Policy", policySchema);

module.exports = Policy;
