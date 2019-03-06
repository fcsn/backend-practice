'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserProject = sequelize.define('UserProject', {
    userId: DataTypes.STRING,
    projectId: DataTypes.STRING
  }, {});
  UserProject.associate = function(models) {
    // associations can be defined here
  };
  return UserProject;
};