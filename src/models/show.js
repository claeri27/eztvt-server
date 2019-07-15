'use strict'
module.exports = (sequelize, DataTypes) => {
  const Show = sequelize.define(
    'Show',
    {
      databaseId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      startDate: DataTypes.STRING,
      endDate: DataTypes.STRING,
      country: DataTypes.STRING,
      network: DataTypes.STRING,
      status: DataTypes.STRING,
      imageThumbnailPath: DataTypes.STRING,
    },
    {},
  )
  Show.associate = function(models) {
    // associations can be defined here
  }
  return Show
}
