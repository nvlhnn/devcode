"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Item, {
        foreignKey: "activity_group_id",
        as: "todo_items",
        onDelete: "cascade",
        hooks: true,
      });
      // define association here
    }
  }
  Activity.init(
    {
      title: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Activity",
    }
  );
  return Activity;
};
