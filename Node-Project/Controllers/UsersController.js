import UsersModel from "../Models/User.js";
import LinksModel from "../Models/Link.js";

const UsersController = {
  getList: async (req, res) => {
    try {
      const users = await UsersModel.find().populate("links");
      res.json(users);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  getById: async (req, res) => {
    try {
      const user = await UsersModel.findById(req.params.id).populate("links");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  post: async (req, res) => {
    const { name, email, password, links } = req.body;
    try {
      const newUser = new UsersModel({
        name,
        email,
        password,
        links,
      });
      await newUser.save();
      res.json(newUser);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  put: async (req, res) => {
    const { id } = req.params;
    try {
      const updatedUser = await UsersModel.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(updatedUser);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const deletedUser = await UsersModel.findByIdAndDelete(id);
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      await LinksModel.deleteMany({ _id: { $in: deletedUser.links } });

      res.json(deletedUser);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },
};

export default UsersController;
