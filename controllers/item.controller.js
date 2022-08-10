const { Item, Activity } = require("../models");

class ItemController {
  static findAll = async (req, res, next) => {
    try {
      let limit = 1000;
      let skip = 0;
      const filter = {};

      if (req.query.activity_group_id)
        filter.activity_group_id = req.query.activity_group_id;
      if (req.query.limit) limit = +req.query.limit;
      if (req.query.skip) skip = +req.query.skip;

      const data = await Item.findAll({
        attributes: [
          "id",
          "title",
          "activity_group_id",
          "is_active",
          "priority",
        ],
        where: filter,
        limit: limit,
        offset: skip,
      });

      const total = await Item.count({
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
      const data = await Item.findOne({
        where: { id: req.params.id },
        attributes: {
          exclude: ["created_at", "updated_at", "activity_group_id"],
        },
      });

      if (!data) {
        throw {
          status: 404,
          message: "Item not found",
        };
      }

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  static create = async (req, res, next) => {
    try {
      const data = await Item.create(req.body);

      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  };

  static update = async (req, res, next) => {
    try {
      const data = await Item.findOne({ where: { id: req.params.id } });

      if (!data) {
        throw {
          status: 404,
          message: "Item not found",
        };
      }

      await data.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });

      await data.save();

      // console.log(data);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  static destroy = async (req, res, next) => {
    try {
      await Item.destroy({ where: { id: req.params.id } });
      res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = ItemController;
