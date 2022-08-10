const { Activity, Item } = require("../models");

class ActivityController {
  static findAll = async (req, res, next) => {
    try {
      let limit = 1000;
      let skip = 0;
      const filter = {};

      if (req.query.email) filter.email = req.query.email;
      if (req.query.limit) limit = +req.query.limit;
      if (req.query.skip) skip = +req.query.skip;

      const data = await Activity.findAll({
        attributes: ["id", "title", "created_at"],
        where: filter,
        limit: limit,
        offset: skip,
      });

      const total = await Activity.count({
        limit: limit,
        offset: skip,
        where: filter,
      });

      res.status(200).json({ total, limit, skip, data });
    } catch (error) {
      next(error);
    }
  };

  static find = async (req, res, next) => {
    try {
      const data = await Activity.findOne({
        where: { id: req.params.id },
        attributes: { exclude: ["email", "updated_at"] },
        include: [
          {
            model: Item,
            as: "todo_items",
            attributes: { exclude: ["created_at", "updated_at"] },
          },
        ],
      });

      if (!data) {
        throw {
          status: 404,
          message: "Activity not found",
        };
      }

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  static create = async (req, res, next) => {
    try {
      const data = await Activity.create(req.body);
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  };

  static update = async (req, res, next) => {
    try {
      const data = await Activity.findOne({ where: { id: req.params.id } });

      if (!data) {
        throw {
          status: 404,
          message: "Activity not found",
        };
      }

      await data.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });

      await data.save();

      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  static destroy = async (req, res, next) => {
    try {
      await Activity.destroy({ where: { id: req.params.id } });
      res.status(200).json({ message: "Activity deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = ActivityController;
