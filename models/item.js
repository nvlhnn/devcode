"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Activity, {
        foreignKey: "activity_group_id",
        as: "activity",
      });
      // define association here
    }
  }
  Item.init(
    {
      title: DataTypes.STRING,
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      priority: {
        type: DataTypes.ENUM("very-high", "high", "normal", "low", "very-low"),
        defaultValue: "very-high",
      },
      activity_group_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Item",
    }
  );
  return Item;
};
