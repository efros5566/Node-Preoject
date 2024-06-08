import LinksModel from "../Models/Link.js";
import UsersModel from "../Models/User.js";

const LinksController = {
  getList: async (req, res) => {
    try {
      const links = await LinksModel.find();
      res.json(links);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  getById: async (req, res) => {
    try {
      const link = await LinksModel.findById(req.params.id);
      if (!link) {
        return res.status(404).json({ message: "Link not found" });
      }
      res.json(link);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  post: async (req, res) => {
    const { originalUrl, userId, targetValues, targetParamName } = req.body;
    try {
      const newLink = new LinksModel({
        originalUrl,
        targetValues,
        targetParamName,
      });
      await newLink.save();

      await UsersModel.findByIdAndUpdate(userId, {
        $push: { links: newLink._id },
      });

      res.json(newLink);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  put: async (req, res) => {
    const { id } = req.params;
    try {
      const updatedLink = await LinksModel.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updatedLink) {
        return res.status(404).json({ message: "Link not found" });
      }
      res.json(updatedLink);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const deletedLink = await LinksModel.findByIdAndDelete(id);
      if (!deletedLink) {
        return res.status(404).json({ message: "Link not found" });
      }
      await UsersModel.updateMany({ links: id }, { $pull: { links: id } });

      res.json(deletedLink);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  redirect: async (req, res) => {
    try {
      const linkId = req.params.id;
      const link = await LinksModel.findById(linkId);

      if (!link) {
        return res.status(404).json({ message: "Link not found" });
      }

      const targetParamValue = req.query[link.targetParamName] || "";
      link.clicks.push({
        insertedAt: new Date(),
        ipAddress: req.ip,
        targetParamValue,
      });
      await link.save();

      res.redirect(link.originalUrl);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },

  getClickData: async (req, res) => {
    try {
      const linkId = req.params.id;
      const link = await LinksModel.findById(linkId);

      if (!link) {
        return res.status(404).json({ message: "Link not found" });
      }

      const segmentedClicks = link.clicks.reduce((acc, click) => {
        const value = click.targetParamValue || "unknown";
        if (!acc[value]) {
          acc[value] = [];
        }
        acc[value].push(click);
        return acc;
      }, {});

      res.json(segmentedClicks);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },
};

export default LinksController;
