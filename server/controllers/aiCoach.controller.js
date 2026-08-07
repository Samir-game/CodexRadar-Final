const Codeforces = require("../models/codeforces.model.js");
const { getAICoach } = require("../services/aiCoach.service.js");

const getCoachInsights = async (req, res) => {
  try {
    const profile = await Codeforces.findOne({ user: req.user._id });
    if (!profile) return res.status(404).json({ message: "Codeforces data not found for this user." });
    return res.status(200).json(await getAICoach(profile));
  } catch (error) {
    console.error("Error creating coach insights:", error.message);
    return res.status(500).json({ message: "Unable to create coaching insights." });
  }
};

module.exports = { getCoachInsights };
