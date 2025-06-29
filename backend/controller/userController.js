const User = require("../model/User");

const userController = {
  getAllUser: async (req, res) => {
    try {
      const user = await User.find();
      res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  updateUser: async (req, res) => {
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true, runValidators: true }
      );
      res.status(200).json(updateUser);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

module.exports = userController;
