'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    postId: DataTypes.STRING,
    title: DataTypes.STRING,
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
    Post.hasMany(models.Comment, { foreignKey: 'commentId' });
  };
  return Post;
};
