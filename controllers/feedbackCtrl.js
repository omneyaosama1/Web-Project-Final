const Feedback = require("../Schema/feedbackSchema");

const addFeedback = async (req, res) => {
  try {
    const newFeedback = new Feedback({
      feedback: req.body.feedback,
    });
    const savedFeedback = await newFeedback.save();
    res.status(201).json(savedFeedback);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const displayFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.render("feedback", { feedbacks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addFeedback,
  getFeedbacks,
  displayFeedback
};
