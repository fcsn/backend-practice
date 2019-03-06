'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userId: DataTypes.STRING,
    name: DataTypes.STRING,
    engName: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Project, {as: 'project', through: 'UserProject'})
  };
  return User;
};
